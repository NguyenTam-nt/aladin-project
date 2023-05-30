package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.domain.enumeration.GalleryType;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.GalleryRepository;
import co.aladintech.hcm.service.dto.GalleryDTO;
import co.aladintech.hcm.service.mapper.GalleryMapper;
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
 * Integration tests for the {@link GalleryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class GalleryResourceIT {

    private static final String DEFAULT_NAME_KO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_KO = "BBBBBBBBBB";

    private static final GalleryType DEFAULT_TYPE = GalleryType.IMAGE;
    private static final GalleryType UPDATED_TYPE = GalleryType.VIDEO;

    private static final String ENTITY_API_URL = "/api/galleries";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private GalleryMapper galleryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Gallery gallery;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gallery createEntity(EntityManager em) {
        Gallery gallery = new Gallery().nameKo(DEFAULT_NAME_KO).type(DEFAULT_TYPE);
        return gallery;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gallery createUpdatedEntity(EntityManager em) {
        Gallery gallery = new Gallery().nameKo(UPDATED_NAME_KO).type(UPDATED_TYPE);
        return gallery;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Gallery.class).block();
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
        gallery = createEntity(em);
    }

    @Test
    void createGallery() throws Exception {
        int databaseSizeBeforeCreate = galleryRepository.findAll().collectList().block().size();
        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeCreate + 1);
        Gallery testGallery = galleryList.get(galleryList.size() - 1);
        assertThat(testGallery.getNameKo()).isEqualTo(DEFAULT_NAME_KO);
        assertThat(testGallery.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    void createGalleryWithExistingId() throws Exception {
        // Create the Gallery with an existing ID
        gallery.setId(1L);
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        int databaseSizeBeforeCreate = galleryRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = galleryRepository.findAll().collectList().block().size();
        // set the field null
        gallery.setNameKo(null);

        // Create the Gallery, which fails.
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllGalleries() {
        // Initialize the database
        galleryRepository.save(gallery).block();

        // Get all the galleryList
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
            .value(hasItem(gallery.getId().intValue()))
            .jsonPath("$.[*].nameKo")
            .value(hasItem(DEFAULT_NAME_KO))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE.toString()));
    }

    @Test
    void getGallery() {
        // Initialize the database
        galleryRepository.save(gallery).block();

        // Get the gallery
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, gallery.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(gallery.getId().intValue()))
            .jsonPath("$.nameKo")
            .value(is(DEFAULT_NAME_KO))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE.toString()));
    }

    @Test
    void getNonExistingGallery() {
        // Get the gallery
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingGallery() throws Exception {
        // Initialize the database
        galleryRepository.save(gallery).block();

        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();

        // Update the gallery
        Gallery updatedGallery = galleryRepository.findById(gallery.getId()).block();
        updatedGallery.nameKo(UPDATED_NAME_KO).type(UPDATED_TYPE);
        GalleryDTO galleryDTO = galleryMapper.toDto(updatedGallery);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, galleryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
        Gallery testGallery = galleryList.get(galleryList.size() - 1);
        assertThat(testGallery.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testGallery.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    void putNonExistingGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, galleryDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateGalleryWithPatch() throws Exception {
        // Initialize the database
        galleryRepository.save(gallery).block();

        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();

        // Update the gallery using partial update
        Gallery partialUpdatedGallery = new Gallery();
        partialUpdatedGallery.setId(gallery.getId());

        partialUpdatedGallery.nameKo(UPDATED_NAME_KO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedGallery.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedGallery))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
        Gallery testGallery = galleryList.get(galleryList.size() - 1);
        assertThat(testGallery.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testGallery.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    void fullUpdateGalleryWithPatch() throws Exception {
        // Initialize the database
        galleryRepository.save(gallery).block();

        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();

        // Update the gallery using partial update
        Gallery partialUpdatedGallery = new Gallery();
        partialUpdatedGallery.setId(gallery.getId());

        partialUpdatedGallery.nameKo(UPDATED_NAME_KO).type(UPDATED_TYPE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedGallery.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedGallery))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
        Gallery testGallery = galleryList.get(galleryList.size() - 1);
        assertThat(testGallery.getNameKo()).isEqualTo(UPDATED_NAME_KO);
        assertThat(testGallery.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    void patchNonExistingGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, galleryDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamGallery() throws Exception {
        int databaseSizeBeforeUpdate = galleryRepository.findAll().collectList().block().size();
        gallery.setId(count.incrementAndGet());

        // Create the Gallery
        GalleryDTO galleryDTO = galleryMapper.toDto(gallery);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(galleryDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Gallery in the database
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteGallery() {
        // Initialize the database
        galleryRepository.save(gallery).block();

        int databaseSizeBeforeDelete = galleryRepository.findAll().collectList().block().size();

        // Delete the gallery
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, gallery.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Gallery> galleryList = galleryRepository.findAll().collectList().block();
        assertThat(galleryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
