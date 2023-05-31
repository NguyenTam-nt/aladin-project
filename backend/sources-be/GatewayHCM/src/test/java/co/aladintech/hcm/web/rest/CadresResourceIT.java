package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.repository.CadresRepository;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.service.dto.CadresDTO;
import co.aladintech.hcm.service.mapper.CadresMapper;
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
 * Integration tests for the {@link CadresResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class CadresResourceIT {

    private static final String DEFAULT_FULLNAME = "AAAAAAAAAA";
    private static final String UPDATED_FULLNAME = "BBBBBBBBBB";

    private static final String DEFAULT_FULLNAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_FULLNAME_KO = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION_KO = "AAAAAAAAAA";
    private static final String UPDATED_POSITION_KO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "Q43M-D@SO32\\FHKLX";
    private static final String UPDATED_EMAIL = "D7VQB+@FD.\\NMJLUSB";

    private static final String DEFAULT_MAJOR = "AAAAAAAAAA";
    private static final String UPDATED_MAJOR = "BBBBBBBBBB";

    private static final String DEFAULT_MAJOR_KO = "AAAAAAAAAA";
    private static final String UPDATED_MAJOR_KO = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_RESPONSIBILITY = "AAAAAAAAAA";
    private static final String UPDATED_WORK_RESPONSIBILITY = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_RESPONSIBILITY_KO = "AAAAAAAAAA";
    private static final String UPDATED_WORK_RESPONSIBILITY_KO = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_KO = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_KO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_KO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_KO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cadres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CadresRepository cadresRepository;

    @Autowired
    private CadresMapper cadresMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Cadres cadres;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cadres createEntity(EntityManager em) {
        Cadres cadres = new Cadres()
            .fullname(DEFAULT_FULLNAME)
            .fullnameKo(DEFAULT_FULLNAME_KO)
            .position(DEFAULT_POSITION)
            .positionKo(DEFAULT_POSITION_KO)
            .email(DEFAULT_EMAIL)
            .major(DEFAULT_MAJOR)
            .majorKo(DEFAULT_MAJOR_KO)
            .workResponsibility(DEFAULT_WORK_RESPONSIBILITY)
            .workResponsibilityKo(DEFAULT_WORK_RESPONSIBILITY_KO)
            .title(DEFAULT_TITLE)
            .titleKo(DEFAULT_TITLE_KO)
            .content(DEFAULT_CONTENT)
            .contentKo(DEFAULT_CONTENT_KO);
        return cadres;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cadres createUpdatedEntity(EntityManager em) {
        Cadres cadres = new Cadres()
            .fullname(UPDATED_FULLNAME)
            .fullnameKo(UPDATED_FULLNAME_KO)
            .position(UPDATED_POSITION)
            .positionKo(UPDATED_POSITION_KO)
            .email(UPDATED_EMAIL)
            .major(UPDATED_MAJOR)
            .majorKo(UPDATED_MAJOR_KO)
            .workResponsibility(UPDATED_WORK_RESPONSIBILITY)
            .workResponsibilityKo(UPDATED_WORK_RESPONSIBILITY_KO)
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        return cadres;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Cadres.class).block();
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
        cadres = createEntity(em);
    }

    @Test
    void createCadres() throws Exception {
        int databaseSizeBeforeCreate = cadresRepository.findAll().collectList().block().size();
        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeCreate + 1);
        Cadres testCadres = cadresList.get(cadresList.size() - 1);
        assertThat(testCadres.getFullname()).isEqualTo(DEFAULT_FULLNAME);
        assertThat(testCadres.getFullnameKo()).isEqualTo(DEFAULT_FULLNAME_KO);
        assertThat(testCadres.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testCadres.getPositionKo()).isEqualTo(DEFAULT_POSITION_KO);
        assertThat(testCadres.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCadres.getMajor()).isEqualTo(DEFAULT_MAJOR);
        assertThat(testCadres.getMajorKo()).isEqualTo(DEFAULT_MAJOR_KO);
        assertThat(testCadres.getWorkResponsibility()).isEqualTo(DEFAULT_WORK_RESPONSIBILITY);
        assertThat(testCadres.getWorkResponsibilityKo()).isEqualTo(DEFAULT_WORK_RESPONSIBILITY_KO);
        assertThat(testCadres.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCadres.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testCadres.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCadres.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void createCadresWithExistingId() throws Exception {
        // Create the Cadres with an existing ID
        cadres.setId(1L);
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        int databaseSizeBeforeCreate = cadresRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkFullnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setFullname(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkFullnameKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setFullnameKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setPosition(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkPositionKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setPositionKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setEmail(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkMajorIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setMajor(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkMajorKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setMajorKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkWorkResponsibilityIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setWorkResponsibility(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkWorkResponsibilityKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setWorkResponsibilityKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setTitle(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTitleKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setTitleKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setContent(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkContentKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadresRepository.findAll().collectList().block().size();
        // set the field null
        cadres.setContentKo(null);

        // Create the Cadres, which fails.
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllCadres() {
        // Initialize the database
        cadresRepository.save(cadres).block();

        // Get all the cadresList
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
            .value(hasItem(cadres.getId().intValue()))
            .jsonPath("$.[*].fullname")
            .value(hasItem(DEFAULT_FULLNAME))
            .jsonPath("$.[*].fullnameKo")
            .value(hasItem(DEFAULT_FULLNAME_KO))
            .jsonPath("$.[*].position")
            .value(hasItem(DEFAULT_POSITION))
            .jsonPath("$.[*].positionKo")
            .value(hasItem(DEFAULT_POSITION_KO))
            .jsonPath("$.[*].email")
            .value(hasItem(DEFAULT_EMAIL))
            .jsonPath("$.[*].major")
            .value(hasItem(DEFAULT_MAJOR))
            .jsonPath("$.[*].majorKo")
            .value(hasItem(DEFAULT_MAJOR_KO))
            .jsonPath("$.[*].workResponsibility")
            .value(hasItem(DEFAULT_WORK_RESPONSIBILITY))
            .jsonPath("$.[*].workResponsibilityKo")
            .value(hasItem(DEFAULT_WORK_RESPONSIBILITY_KO))
            .jsonPath("$.[*].title")
            .value(hasItem(DEFAULT_TITLE))
            .jsonPath("$.[*].titleKo")
            .value(hasItem(DEFAULT_TITLE_KO))
            .jsonPath("$.[*].content")
            .value(hasItem(DEFAULT_CONTENT))
            .jsonPath("$.[*].contentKo")
            .value(hasItem(DEFAULT_CONTENT_KO));
    }

    @Test
    void getCadres() {
        // Initialize the database
        cadresRepository.save(cadres).block();

        // Get the cadres
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, cadres.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(cadres.getId().intValue()))
            .jsonPath("$.fullname")
            .value(is(DEFAULT_FULLNAME))
            .jsonPath("$.fullnameKo")
            .value(is(DEFAULT_FULLNAME_KO))
            .jsonPath("$.position")
            .value(is(DEFAULT_POSITION))
            .jsonPath("$.positionKo")
            .value(is(DEFAULT_POSITION_KO))
            .jsonPath("$.email")
            .value(is(DEFAULT_EMAIL))
            .jsonPath("$.major")
            .value(is(DEFAULT_MAJOR))
            .jsonPath("$.majorKo")
            .value(is(DEFAULT_MAJOR_KO))
            .jsonPath("$.workResponsibility")
            .value(is(DEFAULT_WORK_RESPONSIBILITY))
            .jsonPath("$.workResponsibilityKo")
            .value(is(DEFAULT_WORK_RESPONSIBILITY_KO))
            .jsonPath("$.title")
            .value(is(DEFAULT_TITLE))
            .jsonPath("$.titleKo")
            .value(is(DEFAULT_TITLE_KO))
            .jsonPath("$.content")
            .value(is(DEFAULT_CONTENT))
            .jsonPath("$.contentKo")
            .value(is(DEFAULT_CONTENT_KO));
    }

    @Test
    void getNonExistingCadres() {
        // Get the cadres
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingCadres() throws Exception {
        // Initialize the database
        cadresRepository.save(cadres).block();

        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();

        // Update the cadres
        Cadres updatedCadres = cadresRepository.findById(cadres.getId()).block();
        updatedCadres
            .fullname(UPDATED_FULLNAME)
            .fullnameKo(UPDATED_FULLNAME_KO)
            .position(UPDATED_POSITION)
            .positionKo(UPDATED_POSITION_KO)
            .email(UPDATED_EMAIL)
            .major(UPDATED_MAJOR)
            .majorKo(UPDATED_MAJOR_KO)
            .workResponsibility(UPDATED_WORK_RESPONSIBILITY)
            .workResponsibilityKo(UPDATED_WORK_RESPONSIBILITY_KO)
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);
        CadresDTO cadresDTO = cadresMapper.toDto(updatedCadres);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cadresDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
        Cadres testCadres = cadresList.get(cadresList.size() - 1);
        assertThat(testCadres.getFullname()).isEqualTo(UPDATED_FULLNAME);
        assertThat(testCadres.getFullnameKo()).isEqualTo(UPDATED_FULLNAME_KO);
        assertThat(testCadres.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testCadres.getPositionKo()).isEqualTo(UPDATED_POSITION_KO);
        assertThat(testCadres.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCadres.getMajor()).isEqualTo(UPDATED_MAJOR);
        assertThat(testCadres.getMajorKo()).isEqualTo(UPDATED_MAJOR_KO);
        assertThat(testCadres.getWorkResponsibility()).isEqualTo(UPDATED_WORK_RESPONSIBILITY);
        assertThat(testCadres.getWorkResponsibilityKo()).isEqualTo(UPDATED_WORK_RESPONSIBILITY_KO);
        assertThat(testCadres.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCadres.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testCadres.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCadres.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void putNonExistingCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cadresDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCadresWithPatch() throws Exception {
        // Initialize the database
        cadresRepository.save(cadres).block();

        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();

        // Update the cadres using partial update
        Cadres partialUpdatedCadres = new Cadres();
        partialUpdatedCadres.setId(cadres.getId());

        partialUpdatedCadres
            .positionKo(UPDATED_POSITION_KO)
            .email(UPDATED_EMAIL)
            .major(UPDATED_MAJOR)
            .majorKo(UPDATED_MAJOR_KO)
            .workResponsibility(UPDATED_WORK_RESPONSIBILITY)
            .title(UPDATED_TITLE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCadres.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCadres))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
        Cadres testCadres = cadresList.get(cadresList.size() - 1);
        assertThat(testCadres.getFullname()).isEqualTo(DEFAULT_FULLNAME);
        assertThat(testCadres.getFullnameKo()).isEqualTo(DEFAULT_FULLNAME_KO);
        assertThat(testCadres.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testCadres.getPositionKo()).isEqualTo(UPDATED_POSITION_KO);
        assertThat(testCadres.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCadres.getMajor()).isEqualTo(UPDATED_MAJOR);
        assertThat(testCadres.getMajorKo()).isEqualTo(UPDATED_MAJOR_KO);
        assertThat(testCadres.getWorkResponsibility()).isEqualTo(UPDATED_WORK_RESPONSIBILITY);
        assertThat(testCadres.getWorkResponsibilityKo()).isEqualTo(DEFAULT_WORK_RESPONSIBILITY_KO);
        assertThat(testCadres.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCadres.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testCadres.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCadres.getContentKo()).isEqualTo(DEFAULT_CONTENT_KO);
    }

    @Test
    void fullUpdateCadresWithPatch() throws Exception {
        // Initialize the database
        cadresRepository.save(cadres).block();

        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();

        // Update the cadres using partial update
        Cadres partialUpdatedCadres = new Cadres();
        partialUpdatedCadres.setId(cadres.getId());

        partialUpdatedCadres
            .fullname(UPDATED_FULLNAME)
            .fullnameKo(UPDATED_FULLNAME_KO)
            .position(UPDATED_POSITION)
            .positionKo(UPDATED_POSITION_KO)
            .email(UPDATED_EMAIL)
            .major(UPDATED_MAJOR)
            .majorKo(UPDATED_MAJOR_KO)
            .workResponsibility(UPDATED_WORK_RESPONSIBILITY)
            .workResponsibilityKo(UPDATED_WORK_RESPONSIBILITY_KO)
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .content(UPDATED_CONTENT)
            .contentKo(UPDATED_CONTENT_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCadres.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCadres))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
        Cadres testCadres = cadresList.get(cadresList.size() - 1);
        assertThat(testCadres.getFullname()).isEqualTo(UPDATED_FULLNAME);
        assertThat(testCadres.getFullnameKo()).isEqualTo(UPDATED_FULLNAME_KO);
        assertThat(testCadres.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testCadres.getPositionKo()).isEqualTo(UPDATED_POSITION_KO);
        assertThat(testCadres.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCadres.getMajor()).isEqualTo(UPDATED_MAJOR);
        assertThat(testCadres.getMajorKo()).isEqualTo(UPDATED_MAJOR_KO);
        assertThat(testCadres.getWorkResponsibility()).isEqualTo(UPDATED_WORK_RESPONSIBILITY);
        assertThat(testCadres.getWorkResponsibilityKo()).isEqualTo(UPDATED_WORK_RESPONSIBILITY_KO);
        assertThat(testCadres.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCadres.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testCadres.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCadres.getContentKo()).isEqualTo(UPDATED_CONTENT_KO);
    }

    @Test
    void patchNonExistingCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, cadresDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCadres() throws Exception {
        int databaseSizeBeforeUpdate = cadresRepository.findAll().collectList().block().size();
        cadres.setId(count.incrementAndGet());

        // Create the Cadres
        CadresDTO cadresDTO = cadresMapper.toDto(cadres);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cadresDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Cadres in the database
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCadres() {
        // Initialize the database
        cadresRepository.save(cadres).block();

        int databaseSizeBeforeDelete = cadresRepository.findAll().collectList().block().size();

        // Delete the cadres
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, cadres.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Cadres> cadresList = cadresRepository.findAll().collectList().block();
        assertThat(cadresList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
