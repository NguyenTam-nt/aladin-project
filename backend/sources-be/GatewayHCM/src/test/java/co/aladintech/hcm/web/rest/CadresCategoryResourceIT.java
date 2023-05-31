package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.repository.CadresCategoryRepository;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import co.aladintech.hcm.service.mapper.CadresCategoryMapper;
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
 * Integration tests for the {@link CadresCategoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class CadresCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cadres-categories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CadresCategoryRepository cadresCategoryRepository;

    @Autowired
    private CadresCategoryMapper cadresCategoryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private CadresCategory cadresCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CadresCategory createEntity(EntityManager em) {
        CadresCategory cadresCategory = new CadresCategory().name(DEFAULT_NAME).nameKo(DEFAULT_NAME_KO);
        return cadresCategory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CadresCategory createUpdatedEntity(EntityManager em) {
        CadresCategory cadresCategory = new CadresCategory().name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);
        return cadresCategory;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(CadresCategory.class).block();
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
        cadresCategory = createEntity(em);
    }

    @Test
    void createCadresCategory() throws Exception {
        int databaseSizeBeforeCreate = cadresCategoryRepository.findAll().collectList().block().size();
        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        CadresCategory testCadresCategory = cadresCategoryList.get(cadresCategoryList.size() - 1);
        assertThat(testCadresCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCadresCategory.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
    }

    @Test
    void createCadresCategoryWithExistingId() throws Exception {
        // Create the CadresCategory with an existing ID
        cadresCategory.setId(1L);
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        int databaseSizeBeforeCreate = cadresCategoryRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresCategoryRepository.findAll().collectList().block().size();
        // set the field null
        cadresCategory.setName(null);

        // Create the CadresCategory, which fails.
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkNameKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresCategoryRepository.findAll().collectList().block().size();
        // set the field null
        cadresCategory.setNameKo(null);

        // Create the CadresCategory, which fails.
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllCadresCategories() {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        // Get all the cadresCategoryList
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
            .value(hasItem(cadresCategory.getId().intValue()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].nameKo")
            .value(hasItem(DEFAULT_NAME_KO));
    }

    @Test
    void getCadresCategory() {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        // Get the cadresCategory
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, cadresCategory.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(cadresCategory.getId().intValue()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.nameKo")
            .value(is(DEFAULT_NAME_KO));
    }

    @Test
    void getNonExistingCadresCategory() {
        // Get the cadresCategory
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingCadresCategory() throws Exception {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();

        // Update the cadresCategory
        CadresCategory updatedCadresCategory = cadresCategoryRepository.findById(cadresCategory.getId()).block();
        updatedCadresCategory.name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(updatedCadresCategory);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cadresCategoryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
        CadresCategory testCadresCategory = cadresCategoryList.get(cadresCategoryList.size() - 1);
        assertThat(testCadresCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCadresCategory.getNameKo()).isEqualTo(UPDATED_NAME_KO);
    }

    @Test
    void putNonExistingCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cadresCategoryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCadresCategoryWithPatch() throws Exception {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();

        // Update the cadresCategory using partial update
        CadresCategory partialUpdatedCadresCategory = new CadresCategory();
        partialUpdatedCadresCategory.setId(cadresCategory.getId());

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCadresCategory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCadresCategory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
        CadresCategory testCadresCategory = cadresCategoryList.get(cadresCategoryList.size() - 1);
        assertThat(testCadresCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCadresCategory.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
    }

    @Test
    void fullUpdateCadresCategoryWithPatch() throws Exception {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();

        // Update the cadresCategory using partial update
        CadresCategory partialUpdatedCadresCategory = new CadresCategory();
        partialUpdatedCadresCategory.setId(cadresCategory.getId());

        partialUpdatedCadresCategory.name(UPDATED_NAME).nameKo(UPDATED_NAME_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCadresCategory.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCadresCategory))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
        CadresCategory testCadresCategory = cadresCategoryList.get(cadresCategoryList.size() - 1);
        assertThat(testCadresCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCadresCategory.getNameKo()).isEqualTo(UPDATED_NAME_KO);
    }

    @Test
    void patchNonExistingCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, cadresCategoryDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCadresCategory() throws Exception {
        int databaseSizeBeforeUpdate = cadresCategoryRepository.findAll().collectList().block().size();
        cadresCategory.setId(count.incrementAndGet());

        // Create the CadresCategory
        CadresCategoryDTO cadresCategoryDTO = cadresCategoryMapper.toDto(cadresCategory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresCategoryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the CadresCategory in the database
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCadresCategory() {
        // Initialize the database
        cadresCategoryRepository.save(cadresCategory).block();

        int databaseSizeBeforeDelete = cadresCategoryRepository.findAll().collectList().block().size();

        // Delete the cadresCategory
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, cadresCategory.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<CadresCategory> cadresCategoryList = cadresCategoryRepository.findAll().collectList().block();
        assertThat(cadresCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
