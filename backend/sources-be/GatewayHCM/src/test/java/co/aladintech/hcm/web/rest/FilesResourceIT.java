package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.service.dto.FilesDTO;
import co.aladintech.hcm.service.mapper.FilesMapper;
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
 * Integration tests for the {@link FilesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class FilesResourceIT {

    private static final Long DEFAULT_OBJECT_ID = 1L;
    private static final Long UPDATED_OBJECT_ID = 2L;

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/files";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    private FilesMapper filesMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Files files;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Files createEntity(EntityManager em) {
        Files files = new Files().objectId(DEFAULT_OBJECT_ID).type(DEFAULT_TYPE).link(DEFAULT_LINK).name(DEFAULT_NAME);
        return files;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Files createUpdatedEntity(EntityManager em) {
        Files files = new Files().objectId(UPDATED_OBJECT_ID).type(UPDATED_TYPE).link(UPDATED_LINK).name(UPDATED_NAME);
        return files;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Files.class).block();
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
        files = createEntity(em);
    }

    @Test
    void createFiles() throws Exception {
        int databaseSizeBeforeCreate = filesRepository.findAll().collectList().block().size();
        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeCreate + 1);
        Files testFiles = filesList.get(filesList.size() - 1);
        assertThat(testFiles.getObjectId()).isEqualTo(DEFAULT_OBJECT_ID);
        assertThat(testFiles.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testFiles.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testFiles.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    void createFilesWithExistingId() throws Exception {
        // Create the Files with an existing ID
        files.setId(1L);
        FilesDTO filesDTO = filesMapper.toDto(files);

        int databaseSizeBeforeCreate = filesRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkObjectIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = filesRepository.findAll().collectList().block().size();
        // set the field null
        files.setObjectId(null);

        // Create the Files, which fails.
        FilesDTO filesDTO = filesMapper.toDto(files);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = filesRepository.findAll().collectList().block().size();
        // set the field null
        files.setLink(null);

        // Create the Files, which fails.
        FilesDTO filesDTO = filesMapper.toDto(files);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllFiles() {
        // Initialize the database
        filesRepository.save(files).block();

        // Get all the filesList
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
            .value(hasItem(files.getId().intValue()))
            .jsonPath("$.[*].objectId")
            .value(hasItem(DEFAULT_OBJECT_ID.intValue()))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE))
            .jsonPath("$.[*].link")
            .value(hasItem(DEFAULT_LINK))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME));
    }

    @Test
    void getFiles() {
        // Initialize the database
        filesRepository.save(files).block();

        // Get the files
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, files.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(files.getId().intValue()))
            .jsonPath("$.objectId")
            .value(is(DEFAULT_OBJECT_ID.intValue()))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE))
            .jsonPath("$.link")
            .value(is(DEFAULT_LINK))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME));
    }

    @Test
    void getNonExistingFiles() {
        // Get the files
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingFiles() throws Exception {
        // Initialize the database
        filesRepository.save(files).block();

        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();

        // Update the files
        Files updatedFiles = filesRepository.findById(files.getId()).block();
        updatedFiles.objectId(UPDATED_OBJECT_ID).type(UPDATED_TYPE).link(UPDATED_LINK).name(UPDATED_NAME);
        FilesDTO filesDTO = filesMapper.toDto(updatedFiles);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, filesDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
        Files testFiles = filesList.get(filesList.size() - 1);
        assertThat(testFiles.getObjectId()).isEqualTo(UPDATED_OBJECT_ID);
        assertThat(testFiles.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testFiles.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testFiles.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void putNonExistingFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, filesDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFilesWithPatch() throws Exception {
        // Initialize the database
        filesRepository.save(files).block();

        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();

        // Update the files using partial update
        Files partialUpdatedFiles = new Files();
        partialUpdatedFiles.setId(files.getId());

        partialUpdatedFiles.objectId(UPDATED_OBJECT_ID).type(UPDATED_TYPE).name(UPDATED_NAME);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFiles.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFiles))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
        Files testFiles = filesList.get(filesList.size() - 1);
        assertThat(testFiles.getObjectId()).isEqualTo(UPDATED_OBJECT_ID);
        assertThat(testFiles.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testFiles.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testFiles.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void fullUpdateFilesWithPatch() throws Exception {
        // Initialize the database
        filesRepository.save(files).block();

        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();

        // Update the files using partial update
        Files partialUpdatedFiles = new Files();
        partialUpdatedFiles.setId(files.getId());

        partialUpdatedFiles.objectId(UPDATED_OBJECT_ID).type(UPDATED_TYPE).link(UPDATED_LINK).name(UPDATED_NAME);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFiles.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFiles))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
        Files testFiles = filesList.get(filesList.size() - 1);
        assertThat(testFiles.getObjectId()).isEqualTo(UPDATED_OBJECT_ID);
        assertThat(testFiles.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testFiles.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testFiles.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void patchNonExistingFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, filesDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFiles() throws Exception {
        int databaseSizeBeforeUpdate = filesRepository.findAll().collectList().block().size();
        files.setId(count.incrementAndGet());

        // Create the Files
        FilesDTO filesDTO = filesMapper.toDto(files);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(filesDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Files in the database
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFiles() {
        // Initialize the database
        filesRepository.save(files).block();

        int databaseSizeBeforeDelete = filesRepository.findAll().collectList().block().size();

        // Delete the files
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, files.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Files> filesList = filesRepository.findAll().collectList().block();
        assertThat(filesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
