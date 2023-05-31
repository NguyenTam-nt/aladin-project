package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.History;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.HistoryRepository;
import co.aladintech.hcm.service.dto.HistoryDTO;
import co.aladintech.hcm.service.mapper.HistoryMapper;
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
 * Integration tests for the {@link HistoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class HistoryResourceIT {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_KO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/histories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private HistoryMapper historyMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private History history;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static History createEntity(EntityManager em) {
        History history = new History()
            .year(DEFAULT_YEAR)
            .image(DEFAULT_IMAGE)
            .description(DEFAULT_DESCRIPTION)
            .descriptionKo(DEFAULT_DESCRIPTION_KO);
        return history;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static History createUpdatedEntity(EntityManager em) {
        History history = new History()
            .year(UPDATED_YEAR)
            .image(UPDATED_IMAGE)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO);
        return history;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(History.class).block();
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
        history = createEntity(em);
    }

    @Test
    void createHistory() throws Exception {
        int databaseSizeBeforeCreate = historyRepository.findAll().collectList().block().size();
        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeCreate + 1);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testHistory.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testHistory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHistory.getDescriptionKo()).isEqualTo(DEFAULT_DESCRIPTION_KO);
    }

    @Test
    void createHistoryWithExistingId() throws Exception {
        // Create the History with an existing ID
        history.setId(1L);
        HistoryDTO historyDTO = historyMapper.toDto(history);

        int databaseSizeBeforeCreate = historyRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyRepository.findAll().collectList().block().size();
        // set the field null
        history.setYear(null);

        // Create the History, which fails.
        HistoryDTO historyDTO = historyMapper.toDto(history);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyRepository.findAll().collectList().block().size();
        // set the field null
        history.setImage(null);

        // Create the History, which fails.
        HistoryDTO historyDTO = historyMapper.toDto(history);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyRepository.findAll().collectList().block().size();
        // set the field null
        history.setDescription(null);

        // Create the History, which fails.
        HistoryDTO historyDTO = historyMapper.toDto(history);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = historyRepository.findAll().collectList().block().size();
        // set the field null
        history.setDescriptionKo(null);

        // Create the History, which fails.
        HistoryDTO historyDTO = historyMapper.toDto(history);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllHistories() {
        // Initialize the database
        historyRepository.save(history).block();

        // Get all the historyList
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
            .value(hasItem(history.getId().intValue()))
            .jsonPath("$.[*].year")
            .value(hasItem(DEFAULT_YEAR))
            .jsonPath("$.[*].image")
            .value(hasItem(DEFAULT_IMAGE))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION))
            .jsonPath("$.[*].descriptionKo")
            .value(hasItem(DEFAULT_DESCRIPTION_KO));
    }

    @Test
    void getHistory() {
        // Initialize the database
        historyRepository.save(history).block();

        // Get the history
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, history.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(history.getId().intValue()))
            .jsonPath("$.year")
            .value(is(DEFAULT_YEAR))
            .jsonPath("$.image")
            .value(is(DEFAULT_IMAGE))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION))
            .jsonPath("$.descriptionKo")
            .value(is(DEFAULT_DESCRIPTION_KO));
    }

    @Test
    void getNonExistingHistory() {
        // Get the history
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingHistory() throws Exception {
        // Initialize the database
        historyRepository.save(history).block();

        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();

        // Update the history
        History updatedHistory = historyRepository.findById(history.getId()).block();
        updatedHistory.year(UPDATED_YEAR).image(UPDATED_IMAGE).description(UPDATED_DESCRIPTION).descriptionKo(UPDATED_DESCRIPTION_KO);
        HistoryDTO historyDTO = historyMapper.toDto(updatedHistory);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, historyDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testHistory.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testHistory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHistory.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
    }

    @Test
    void putNonExistingHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, historyDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateHistoryWithPatch() throws Exception {
        // Initialize the database
        historyRepository.save(history).block();

        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();

        // Update the history using partial update
        History partialUpdatedHistory = new History();
        partialUpdatedHistory.setId(history.getId());

        partialUpdatedHistory.descriptionKo(UPDATED_DESCRIPTION_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedHistory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedHistory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testHistory.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testHistory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHistory.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
    }

    @Test
    void fullUpdateHistoryWithPatch() throws Exception {
        // Initialize the database
        historyRepository.save(history).block();

        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();

        // Update the history using partial update
        History partialUpdatedHistory = new History();
        partialUpdatedHistory.setId(history.getId());

        partialUpdatedHistory
            .year(UPDATED_YEAR)
            .image(UPDATED_IMAGE)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedHistory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedHistory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testHistory.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testHistory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHistory.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
    }

    @Test
    void patchNonExistingHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, historyDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().collectList().block().size();
        history.setId(count.incrementAndGet());

        // Create the History
        HistoryDTO historyDTO = historyMapper.toDto(history);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(historyDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteHistory() {
        // Initialize the database
        historyRepository.save(history).block();

        int databaseSizeBeforeDelete = historyRepository.findAll().collectList().block().size();

        // Delete the history
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, history.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<History> historyList = historyRepository.findAll().collectList().block();
        assertThat(historyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
