package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.NewsRepository;
import co.aladintech.hcm.service.dto.NewsDTO;
import co.aladintech.hcm.service.mapper.NewsMapper;
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
 * Integration tests for the {@link NewsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class NewsResourceIT {

    private static final String DEFAULT_TILTE = "AAAAAAAAAA";
    private static final String UPDATED_TILTE = "BBBBBBBBBB";

    private static final String DEFAULT_TILTE_KO = "AAAAAAAAAA";
    private static final String UPDATED_TILTE_KO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_KO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_KO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_KO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/news";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private NewsMapper newsMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private News news;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static News createEntity(EntityManager em) {
        News news = new News()
            .tilte(DEFAULT_TILTE)
            .tilteKo(DEFAULT_TILTE_KO)
            .description(DEFAULT_DESCRIPTION)
            .descriptionKo(DEFAULT_DESCRIPTION_KO)
            .content(DEFAULT_CONTENT)
            .contentKo(DEFAULT_CONTENT_KO);
        return news;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static News createUpdatedEntity(EntityManager em) {
        News news = new News()
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        return news;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(News.class).block();
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
        news = createEntity(em);
    }

    @Test
    void createNews() throws Exception {
        int databaseSizeBeforeCreate = newsRepository.findAll().collectList().block().size();
        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeCreate + 1);
        News testNews = newsList.get(newsList.size() - 1);
        assertThat(testNews.getTilte()).isEqualTo(DEFAULT_TILTE);
        assertThat(testNews.getTilteKo()).isEqualTo(DEFAULT_TILTE_KO);
        assertThat(testNews.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNews.getDescriptionKo()).isEqualTo(DEFAULT_DESCRIPTION_KO);
        assertThat(testNews.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testNews.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void createNewsWithExistingId() throws Exception {
        // Create the News with an existing ID
        news.setId(1L);
        NewsDTO newsDTO = newsMapper.toDto(news);

        int databaseSizeBeforeCreate = newsRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkTilteIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setTilte(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTilteKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setTilteKo(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setDescription(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setDescriptionKo(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setContent(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsRepository.findAll().collectList().block().size();
        // set the field null
        news.setContentKo(null);

        // Create the News, which fails.
        NewsDTO newsDTO = newsMapper.toDto(news);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllNews() {
        // Initialize the database
        newsRepository.save(news).block();

        // Get all the newsList
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
            .value(hasItem(news.getId().intValue()))
            .jsonPath("$.[*].tilte")
            .value(hasItem(DEFAULT_TILTE))
            .jsonPath("$.[*].tilteKo")
            .value(hasItem(DEFAULT_TILTE_KO))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION))
            .jsonPath("$.[*].descriptionKo")
            .value(hasItem(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.[*].content")
            .value(hasItem(DEFAULT_CONTENT))
            .jsonPath("$.[*].contentKo")
            .value(hasItem(DEFAULT_CONTENT_KO));
    }

    @Test
    void getNews() {
        // Initialize the database
        newsRepository.save(news).block();

        // Get the news
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, news.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(news.getId().intValue()))
            .jsonPath("$.tilte")
            .value(is(DEFAULT_TILTE))
            .jsonPath("$.tilteKo")
            .value(is(DEFAULT_TILTE_KO))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION))
            .jsonPath("$.descriptionKo")
            .value(is(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.content")
            .value(is(DEFAULT_CONTENT))
            .jsonPath("$.contentKo")
            .value(is(DEFAULT_CONTENT_KO));
    }

    @Test
    void getNonExistingNews() {
        // Get the news
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingNews() throws Exception {
        // Initialize the database
        newsRepository.save(news).block();

        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();

        // Update the news
        News updatedNews = newsRepository.findById(news.getId()).block();
        updatedNews
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        NewsDTO newsDTO = newsMapper.toDto(updatedNews);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, newsDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
        News testNews = newsList.get(newsList.size() - 1);
        assertThat(testNews.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testNews.getTilteKo()).isEqualTo(UPDATED_TILTE_KO);
        assertThat(testNews.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNews.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testNews.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testNews.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void putNonExistingNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, newsDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateNewsWithPatch() throws Exception {
        // Initialize the database
        newsRepository.save(news).block();

        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();

        // Update the news using partial update
        News partialUpdatedNews = new News();
        partialUpdatedNews.setId(news.getId());

        partialUpdatedNews
            .tilte(UPDATED_TILTE)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedNews.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedNews))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
        News testNews = newsList.get(newsList.size() - 1);
        assertThat(testNews.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testNews.getTilteKo()).isEqualTo(DEFAULT_TILTE_KO);
        assertThat(testNews.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNews.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testNews.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testNews.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void fullUpdateNewsWithPatch() throws Exception {
        // Initialize the database
        newsRepository.save(news).block();

        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();

        // Update the news using partial update
        News partialUpdatedNews = new News();
        partialUpdatedNews.setId(news.getId());

        partialUpdatedNews
            .tilte(UPDATED_TILTE)
            .tilteKo(UPDATED_TILTE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedNews.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedNews))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
        News testNews = newsList.get(newsList.size() - 1);
        assertThat(testNews.getTilte()).isEqualTo(UPDATED_TILTE);
        assertThat(testNews.getTilteKo()).isEqualTo(UPDATED_TILTE_KO);
        assertThat(testNews.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNews.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testNews.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testNews.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void patchNonExistingNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, newsDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamNews() throws Exception {
        int databaseSizeBeforeUpdate = newsRepository.findAll().collectList().block().size();
        news.setId(count.incrementAndGet());

        // Create the News
        NewsDTO newsDTO = newsMapper.toDto(news);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(newsDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the News in the database
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteNews() {
        // Initialize the database
        newsRepository.save(news).block();

        int databaseSizeBeforeDelete = newsRepository.findAll().collectList().block().size();

        // Delete the news
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, news.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<News> newsList = newsRepository.findAll().collectList().block();
        assertThat(newsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
