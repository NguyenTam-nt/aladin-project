package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.ContentSession;
import co.aladintech.hcm.repository.ContentSessionRepository;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
import co.aladintech.hcm.service.mapper.ContentSessionMapper;
import java.time.Duration;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link ContentSessionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ContentSessionResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY_KO = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_KO = "BBBBBBBBBB";

    private static final String DEFAULT_TILTE = "AAAAAAAAAA";
    private static final String UPDATED_TILTE = "BBBBBBBBBB";

    private static final String DEFAULT_TILTE_KO = "AAAAAAAAAA";
    private static final String UPDATED_TILTE_KO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_KO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/content-sessions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContentSessionRepository contentSessionRepository;

    @Autowired
    private ContentSessionMapper contentSessionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private ContentSession contentSession;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContentSession createEntity(EntityManager em) {
        ContentSession contentSession = new ContentSession()
            .type(DEFAULT_TYPE)
            .category(DEFAULT_CATEGORY)
            .categoryKo(DEFAULT_CATEGORY_KO)
            .tilte(DEFAULT_TILTE)
            .tilteKo(DEFAULT_TILTE_KO)
            .content(DEFAULT_CONTENT)
            .contentKo(DEFAULT_CONTENT_KO);
        return contentSession;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContentSession createUpdatedEntity(EntityManager em) {
        ContentSession contentSession = new ContentSession()
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .categoryKo(UPDATED_CATEGORY_KO)
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        return contentSession;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(ContentSession.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void setupCsrf() {
        webTestClient = webTestClient.mutateWith(csrf());
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        contentSession = createEntity(em);
    }

    @Test
    void createContentSession() throws Exception {
        int databaseSizeBeforeCreate = contentSessionRepository.findAll().collectList().block().size();
        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeCreate + 1);
        ContentSession testContentSession = contentSessionList.get(contentSessionList.size() - 1);
        assertThat(testContentSession.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testContentSession.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testContentSession.getCategoryKo()).isEqualTo(DEFAULT_CATEGORY_KO);
        assertThat(testContentSession.getTilte()).isEqualTo(DEFAULT_TILTE);
        assertThat(testContentSession.getTilteKo()).isEqualTo(DEFAULT_TILTE_KO);
        assertThat(testContentSession.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testContentSession.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void createContentSessionWithExistingId() throws Exception {
        // Create the ContentSession with an existing ID
        contentSession.setId(1L);
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        int databaseSizeBeforeCreate = contentSessionRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setType(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setCategory(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkCategoryKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setCategoryKo(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTilteIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setTilte(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTilteKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setTilteKo(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setContent(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentSessionRepository.findAll().collectList().block().size();
        // set the field null
        contentSession.setContentKo(null);

        // Create the ContentSession, which fails.
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllContentSessions() {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        // Get all the contentSessionList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(contentSession.getId().intValue()))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE))
            .jsonPath("$.[*].category")
            .value(hasItem(DEFAULT_CATEGORY))
            .jsonPath("$.[*].categoryKo")
            .value(hasItem(DEFAULT_CATEGORY_KO))
            .jsonPath("$.[*].tilte")
            .value(hasItem(DEFAULT_TILTE))
            .jsonPath("$.[*].tilteKo")
            .value(hasItem(DEFAULT_TILTE_KO))
            .jsonPath("$.[*].content")
            .value(hasItem(DEFAULT_CONTENT))
            .jsonPath("$.[*].contentKo")
            .value(hasItem(DEFAULT_CONTENT_KO));
    }

    @Test
    void getContentSession() {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        // Get the contentSession
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, contentSession.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(contentSession.getId().intValue()))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE))
            .jsonPath("$.category")
            .value(is(DEFAULT_CATEGORY))
            .jsonPath("$.categoryKo")
            .value(is(DEFAULT_CATEGORY_KO))
            .jsonPath("$.tilte")
            .value(is(DEFAULT_TILTE))
            .jsonPath("$.tilteKo")
            .value(is(DEFAULT_TILTE_KO))
            .jsonPath("$.content")
            .value(is(DEFAULT_CONTENT))
            .jsonPath("$.contentKo")
            .value(is(DEFAULT_CONTENT_KO));
    }

    @Test
    void getNonExistingContentSession() {
        // Get the contentSession
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingContentSession() throws Exception {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();

        // Update the contentSession
        ContentSession updatedContentSession = contentSessionRepository.findById(contentSession.getId()).block();
        updatedContentSession
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .categoryKo(UPDATED_CATEGORY_KO)
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(updatedContentSession);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, contentSessionDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
        ContentSession testContentSession = contentSessionList.get(contentSessionList.size() - 1);
        assertThat(testContentSession.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testContentSession.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testContentSession.getCategoryKo()).isEqualTo(UPDATED_CATEGORY_KO);
        assertThat(testContentSession.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testContentSession.getTilteKo()).isEqualTo(UPDATED_TILTE_KO);
        assertThat(testContentSession.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testContentSession.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void putNonExistingContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, contentSessionDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateContentSessionWithPatch() throws Exception {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();

        // Update the contentSession using partial update
        ContentSession partialUpdatedContentSession = new ContentSession();
        partialUpdatedContentSession.setId(contentSession.getId());

        partialUpdatedContentSession.category(UPDATED_CATEGORY).tilte(UPDATED_TILTE).tilteKo(UPDATED_TILTE_KO).content(UPDATED_CONTENT);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContentSession.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedContentSession))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
        ContentSession testContentSession = contentSessionList.get(contentSessionList.size() - 1);
        assertThat(testContentSession.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testContentSession.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testContentSession.getCategoryKo()).isEqualTo(DEFAULT_CATEGORY_KO);
        assertThat(testContentSession.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testContentSession.getTilteKo()).isEqualTo(UPDATED_TILTE_KO);
        assertThat(testContentSession.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testContentSession.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void fullUpdateContentSessionWithPatch() throws Exception {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();

        // Update the contentSession using partial update
        ContentSession partialUpdatedContentSession = new ContentSession();
        partialUpdatedContentSession.setId(contentSession.getId());

        partialUpdatedContentSession
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .categoryKo(UPDATED_CATEGORY_KO)
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContentSession.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedContentSession))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
        ContentSession testContentSession = contentSessionList.get(contentSessionList.size() - 1);
        assertThat(testContentSession.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testContentSession.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testContentSession.getCategoryKo()).isEqualTo(UPDATED_CATEGORY_KO);
        assertThat(testContentSession.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testContentSession.getTilteKo()).isEqualTo(UPDATED_TILTE_KO);
        assertThat(testContentSession.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testContentSession.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void patchNonExistingContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, contentSessionDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamContentSession() throws Exception {
        int databaseSizeBeforeUpdate = contentSessionRepository.findAll().collectList().block().size();
        contentSession.setId(count.incrementAndGet());

        // Create the ContentSession
        ContentSessionDTO contentSessionDTO = contentSessionMapper.toDto(contentSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contentSessionDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ContentSession in the database
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteContentSession() {
        // Initialize the database
        contentSessionRepository.save(contentSession).block();

        int databaseSizeBeforeDelete = contentSessionRepository.findAll().collectList().block().size();

        // Delete the contentSession
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, contentSession.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<ContentSession> contentSessionList = contentSessionRepository.findAll().collectList().block();
        assertThat(contentSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
