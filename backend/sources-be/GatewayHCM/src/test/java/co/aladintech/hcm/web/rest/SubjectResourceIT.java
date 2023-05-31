package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Subject;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.SubjectRepository;
import co.aladintech.hcm.service.dto.SubjectDTO;
import co.aladintech.hcm.service.mapper.SubjectMapper;
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
 * Integration tests for the {@link SubjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class SubjectResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_KO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_KO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_KO = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_KO = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_KO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_KO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/subjects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SubjectMapper subjectMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Subject subject;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subject createEntity(EntityManager em) {
        Subject subject = new Subject()
            .name(DEFAULT_NAME)
            .nameKo(DEFAULT_NAME_KO)
            .description(DEFAULT_DESCRIPTION)
            .descriptionKo(DEFAULT_DESCRIPTION_KO)
            .titleKo(DEFAULT_TITLE_KO)
            .contentKo(DEFAULT_CONTENT_KO);
        return subject;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subject createUpdatedEntity(EntityManager em) {
        Subject subject = new Subject()
            .name(UPDATED_NAME)
            .nameKo(UPDATED_NAME_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .titleKo(UPDATED_TITLE_KO)
            .contentKo(UPDATED_CONTENT_KO);
        return subject;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Subject.class).block();
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
        subject = createEntity(em);
    }

    @Test
    void createSubject() throws Exception {
        int databaseSizeBeforeCreate = subjectRepository.findAll().collectList().block().size();
        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate + 1);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubject.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
        assertThat(testSubject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSubject.getDescriptionKo()).isEqualTo(DEFAULT_DESCRIPTION_KO);
        assertThat(testSubject.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testSubject.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void createSubjectWithExistingId() throws Exception {
        // Create the Subject with an existing ID
        subject.setId(1L);
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        int databaseSizeBeforeCreate = subjectRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setName(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkNameKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setNameKo(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setDescription(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setDescriptionKo(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTitleKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setTitleKo(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = subjectRepository.findAll().collectList().block().size();
        // set the field null
        subject.setContentKo(null);

        // Create the Subject, which fails.
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllSubjects() {
        // Initialize the database
        subjectRepository.save(subject).block();

        // Get all the subjectList
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
            .value(hasItem(subject.getId().intValue()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].nameKo")
            .value(hasItem(DEFAULT_NAME_KO))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION))
            .jsonPath("$.[*].descriptionKo")
            .value(hasItem(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.[*].titleKo")
            .value(hasItem(DEFAULT_TITLE_KO))
            .jsonPath("$.[*].contentKo")
            .value(hasItem(DEFAULT_CONTENT_KO));
    }

    @Test
    void getSubject() {
        // Initialize the database
        subjectRepository.save(subject).block();

        // Get the subject
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, subject.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(subject.getId().intValue()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.nameKo")
            .value(is(DEFAULT_NAME_KO))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION))
            .jsonPath("$.descriptionKo")
            .value(is(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.titleKo")
            .value(is(DEFAULT_TITLE_KO))
            .jsonPath("$.contentKo")
            .value(is(DEFAULT_CONTENT_KO));
    }

    @Test
    void getNonExistingSubject() {
        // Get the subject
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingSubject() throws Exception {
        // Initialize the database
        subjectRepository.save(subject).block();

        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();

        // Update the subject
        Subject updatedSubject = subjectRepository.findById(subject.getId()).block();
        updatedSubject
            .name(UPDATED_NAME)
            .nameKo(UPDATED_NAME_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .titleKo(UPDATED_TITLE_KO)
            .contentKo(UPDATED_CONTENT_KO);
        SubjectDTO subjectDTO = subjectMapper.toDto(updatedSubject);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, subjectDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubject.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testSubject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSubject.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testSubject.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testSubject.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void putNonExistingSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, subjectDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateSubjectWithPatch() throws Exception {
        // Initialize the database
        subjectRepository.save(subject).block();

        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();

        // Update the subject using partial update
        Subject partialUpdatedSubject = new Subject();
        partialUpdatedSubject.setId(subject.getId());

        partialUpdatedSubject.name(UPDATED_NAME).descriptionKo(UPDATED_DESCRIPTION_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedSubject.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedSubject))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubject.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
        assertThat(testSubject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSubject.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testSubject.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testSubject.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void fullUpdateSubjectWithPatch() throws Exception {
        // Initialize the database
        subjectRepository.save(subject).block();

        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();

        // Update the subject using partial update
        Subject partialUpdatedSubject = new Subject();
        partialUpdatedSubject.setId(subject.getId());

        partialUpdatedSubject
            .name(UPDATED_NAME)
            .nameKo(UPDATED_NAME_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .titleKo(UPDATED_TITLE_KO)
            .contentKo(UPDATED_CONTENT_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedSubject.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedSubject))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
        Subject testSubject = subjectList.get(subjectList.size() - 1);
        assertThat(testSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubject.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testSubject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSubject.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testSubject.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testSubject.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void patchNonExistingSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, subjectDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamSubject() throws Exception {
        int databaseSizeBeforeUpdate = subjectRepository.findAll().collectList().block().size();
        subject.setId(count.incrementAndGet());

        // Create the Subject
        SubjectDTO subjectDTO = subjectMapper.toDto(subject);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(subjectDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Subject in the database
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteSubject() {
        // Initialize the database
        subjectRepository.save(subject).block();

        int databaseSizeBeforeDelete = subjectRepository.findAll().collectList().block().size();

        // Delete the subject
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, subject.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Subject> subjectList = subjectRepository.findAll().collectList().block();
        assertThat(subjectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
