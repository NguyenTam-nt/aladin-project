package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.HeaderNavbar;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.HeaderNavbarRepository;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import co.aladintech.hcm.service.mapper.HeaderNavbarMapper;
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
 * Integration tests for the {@link HeaderNavbarResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class HeaderNavbarResourceIT {

    private static final Integer DEFAULT_INDEX = 1;
    private static final Integer UPDATED_INDEX = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_KO = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT = 1L;
    private static final Long UPDATED_PARENT = 2L;

    private static final String ENTITY_API_URL = "/api/header-navbars";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HeaderNavbarRepository headerNavbarRepository;

    @Autowired
    private HeaderNavbarMapper headerNavbarMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private HeaderNavbar headerNavbar;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HeaderNavbar createEntity(EntityManager em) {
        HeaderNavbar headerNavbar = new HeaderNavbar()
            .index(DEFAULT_INDEX)
            .name(DEFAULT_NAME)
            .nameKo(DEFAULT_NAME_KO)
            .link(DEFAULT_LINK)
            .parent(DEFAULT_PARENT);
        return headerNavbar;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HeaderNavbar createUpdatedEntity(EntityManager em) {
        HeaderNavbar headerNavbar = new HeaderNavbar()
            .index(UPDATED_INDEX)
            .name(UPDATED_NAME)
            .nameKo(UPDATED_NAME_KO)
            .link(UPDATED_LINK)
            .parent(UPDATED_PARENT);
        return headerNavbar;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(HeaderNavbar.class).block();
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
        headerNavbar = createEntity(em);
    }

    @Test
    void createHeaderNavbar() throws Exception {
        int databaseSizeBeforeCreate = headerNavbarRepository.findAll().collectList().block().size();
        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeCreate + 1);
        HeaderNavbar testHeaderNavbar = headerNavbarList.get(headerNavbarList.size() - 1);
        assertThat(testHeaderNavbar.getIndex()).isEqualTo(DEFAULT_INDEX);
        assertThat(testHeaderNavbar.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testHeaderNavbar.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
        assertThat(testHeaderNavbar.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testHeaderNavbar.getParent()).isEqualTo(DEFAULT_PARENT);
    }

    @Test
    void createHeaderNavbarWithExistingId() throws Exception {
        // Create the HeaderNavbar with an existing ID
        headerNavbar.setId(1L);
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        int databaseSizeBeforeCreate = headerNavbarRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllHeaderNavbars() {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        // Get all the headerNavbarList
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
            .value(hasItem(headerNavbar.getId().intValue()))
            .jsonPath("$.[*].index")
            .value(hasItem(DEFAULT_INDEX))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].nameKo")
            .value(hasItem(DEFAULT_NAME_KO))
            .jsonPath("$.[*].link")
            .value(hasItem(DEFAULT_LINK))
            .jsonPath("$.[*].parent")
            .value(hasItem(DEFAULT_PARENT.intValue()));
    }

    @Test
    void getHeaderNavbar() {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        // Get the headerNavbar
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, headerNavbar.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(headerNavbar.getId().intValue()))
            .jsonPath("$.index")
            .value(is(DEFAULT_INDEX))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.nameKo")
            .value(is(DEFAULT_NAME_KO))
            .jsonPath("$.link")
            .value(is(DEFAULT_LINK))
            .jsonPath("$.parent")
            .value(is(DEFAULT_PARENT.intValue()));
    }

    @Test
    void getNonExistingHeaderNavbar() {
        // Get the headerNavbar
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingHeaderNavbar() throws Exception {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();

        // Update the headerNavbar
        HeaderNavbar updatedHeaderNavbar = headerNavbarRepository.findById(headerNavbar.getId()).block();
        updatedHeaderNavbar.index(UPDATED_INDEX).name(UPDATED_NAME).nameKo(UPDATED_NAME_KO).link(UPDATED_LINK).parent(UPDATED_PARENT);
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(updatedHeaderNavbar);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, headerNavbarDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
        HeaderNavbar testHeaderNavbar = headerNavbarList.get(headerNavbarList.size() - 1);
        assertThat(testHeaderNavbar.getIndex()).isEqualTo(UPDATED_INDEX);
        assertThat(testHeaderNavbar.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testHeaderNavbar.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testHeaderNavbar.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testHeaderNavbar.getParent()).isEqualTo(UPDATED_PARENT);
    }

    @Test
    void putNonExistingHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, headerNavbarDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateHeaderNavbarWithPatch() throws Exception {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();

        // Update the headerNavbar using partial update
        HeaderNavbar partialUpdatedHeaderNavbar = new HeaderNavbar();
        partialUpdatedHeaderNavbar.setId(headerNavbar.getId());

        partialUpdatedHeaderNavbar.index(UPDATED_INDEX).nameKo(UPDATED_NAME_KO).link(UPDATED_LINK).parent(UPDATED_PARENT);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedHeaderNavbar.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedHeaderNavbar))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
        HeaderNavbar testHeaderNavbar = headerNavbarList.get(headerNavbarList.size() - 1);
        assertThat(testHeaderNavbar.getIndex()).isEqualTo(UPDATED_INDEX);
        assertThat(testHeaderNavbar.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testHeaderNavbar.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testHeaderNavbar.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testHeaderNavbar.getParent()).isEqualTo(UPDATED_PARENT);
    }

    @Test
    void fullUpdateHeaderNavbarWithPatch() throws Exception {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();

        // Update the headerNavbar using partial update
        HeaderNavbar partialUpdatedHeaderNavbar = new HeaderNavbar();
        partialUpdatedHeaderNavbar.setId(headerNavbar.getId());

        partialUpdatedHeaderNavbar
            .index(UPDATED_INDEX)
            .name(UPDATED_NAME)
            .nameKo(UPDATED_NAME_KO)
            .link(UPDATED_LINK)
            .parent(UPDATED_PARENT);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedHeaderNavbar.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedHeaderNavbar))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
        HeaderNavbar testHeaderNavbar = headerNavbarList.get(headerNavbarList.size() - 1);
        assertThat(testHeaderNavbar.getIndex()).isEqualTo(UPDATED_INDEX);
        assertThat(testHeaderNavbar.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testHeaderNavbar.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testHeaderNavbar.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testHeaderNavbar.getParent()).isEqualTo(UPDATED_PARENT);
    }

    @Test
    void patchNonExistingHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, headerNavbarDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamHeaderNavbar() throws Exception {
        int databaseSizeBeforeUpdate = headerNavbarRepository.findAll().collectList().block().size();
        headerNavbar.setId(count.incrementAndGet());

        // Create the HeaderNavbar
        HeaderNavbarDTO headerNavbarDTO = headerNavbarMapper.toDto(headerNavbar);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(headerNavbarDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the HeaderNavbar in the database
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteHeaderNavbar() {
        // Initialize the database
        headerNavbarRepository.save(headerNavbar).block();

        int databaseSizeBeforeDelete = headerNavbarRepository.findAll().collectList().block().size();

        // Delete the headerNavbar
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, headerNavbar.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<HeaderNavbar> headerNavbarList = headerNavbarRepository.findAll().collectList().block();
        assertThat(headerNavbarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
