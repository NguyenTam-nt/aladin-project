package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.NewsCategoryRepository;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.mapper.NewsCategoryMapper;
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
 * Integration tests for the {@link NewsCategoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class NewsCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/news-categories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NewsCategoryRepository newsCategoryRepository;

    @Autowired
    private NewsCategoryMapper newsCategoryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private NewsCategory newsCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsCategory createEntity(EntityManager em) {
        NewsCategory newsCategory = new NewsCategory().name(DEFAULT_NAME).nameKo(DEFAULT_NAME_KO);
        return newsCategory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsCategory createUpdatedEntity(EntityManager em) {
        NewsCategory newsCategory = new NewsCategory().name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);
        return newsCategory;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(NewsCategory.class).block();
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
        newsCategory = createEntity(em);
    }

    @Test
    void createNewsCategory() throws Exception {
        int databaseSizeBeforeCreate = newsCategoryRepository.findAll().collectList().block().size();
        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        NewsCategory testNewsCategory = newsCategoryList.get(newsCategoryList.size() - 1);
        assertThat(testNewsCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNewsCategory.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
    }

    @Test
    void createNewsCategoryWithExistingId() throws Exception {
        // Create the NewsCategory with an existing ID
        newsCategory.setId(1L);
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        int databaseSizeBeforeCreate = newsCategoryRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllNewsCategories() {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        // Get all the newsCategoryList
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
            .value(hasItem(newsCategory.getId().intValue()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].nameKo")
            .value(hasItem(DEFAULT_NAME_KO));
    }

    @Test
    void getNewsCategory() {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        // Get the newsCategory
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, newsCategory.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(newsCategory.getId().intValue()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.nameKo")
            .value(is(DEFAULT_NAME_KO));
    }

    @Test
    void getNonExistingNewsCategory() {
        // Get the newsCategory
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingNewsCategory() throws Exception {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();

        // Update the newsCategory
        NewsCategory updatedNewsCategory = newsCategoryRepository.findById(newsCategory.getId()).block();
        updatedNewsCategory.name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(updatedNewsCategory);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, newsCategoryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
        NewsCategory testNewsCategory = newsCategoryList.get(newsCategoryList.size() - 1);
        assertThat(testNewsCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNewsCategory.getNameKo()).isEqualTo(UPDATED_NAME_KO);
    }

    @Test
    void putNonExistingNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, newsCategoryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateNewsCategoryWithPatch() throws Exception {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();

        // Update the newsCategory using partial update
        NewsCategory partialUpdatedNewsCategory = new NewsCategory();
        partialUpdatedNewsCategory.setId(newsCategory.getId());

        partialUpdatedNewsCategory.name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedNewsCategory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedNewsCategory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
        NewsCategory testNewsCategory = newsCategoryList.get(newsCategoryList.size() - 1);
        assertThat(testNewsCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNewsCategory.getNameKo()).isEqualTo(UPDATED_NAME_KO);
    }

    @Test
    void fullUpdateNewsCategoryWithPatch() throws Exception {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();

        // Update the newsCategory using partial update
        NewsCategory partialUpdatedNewsCategory = new NewsCategory();
        partialUpdatedNewsCategory.setId(newsCategory.getId());

        partialUpdatedNewsCategory.name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedNewsCategory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedNewsCategory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
        NewsCategory testNewsCategory = newsCategoryList.get(newsCategoryList.size() - 1);
        assertThat(testNewsCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNewsCategory.getNameKo()).isEqualTo(UPDATED_NAME_KO);
    }

    @Test
    void patchNonExistingNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, newsCategoryDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamNewsCategory() throws Exception {
        int databaseSizeBeforeUpdate = newsCategoryRepository.findAll().collectList().block().size();
        newsCategory.setId(count.incrementAndGet());

        // Create the NewsCategory
        NewsCategoryDTO newsCategoryDTO = newsCategoryMapper.toDto(newsCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsCategoryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the NewsCategory in the database
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteNewsCategory() {
        // Initialize the database
        newsCategoryRepository.save(newsCategory).block();

        int databaseSizeBeforeDelete = newsCategoryRepository.findAll().collectList().block().size();

        // Delete the newsCategory
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, newsCategory.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<NewsCategory> newsCategoryList = newsCategoryRepository.findAll().collectList().block();
        assertThat(newsCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
