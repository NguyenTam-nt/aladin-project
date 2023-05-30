package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Banner;
import co.aladintech.hcm.repository.BannerRepository;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.service.mapper.BannerMapper;
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
 * Integration tests for the {@link BannerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class BannerResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/banners";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private BannerMapper bannerMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Banner banner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Banner createEntity(EntityManager em) {
        Banner banner = new Banner().type(DEFAULT_TYPE).link(DEFAULT_LINK);
        return banner;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Banner createUpdatedEntity(EntityManager em) {
        Banner banner = new Banner().type(UPDATED_TYPE).link(UPDATED_LINK);
        return banner;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Banner.class).block();
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
        banner = createEntity(em);
    }

    @Test
    void createBanner() throws Exception {
        int databaseSizeBeforeCreate = bannerRepository.findAll().collectList().block().size();
        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeCreate + 1);
        Banner testBanner = bannerList.get(bannerList.size() - 1);
        assertThat(testBanner.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBanner.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    void createBannerWithExistingId() throws Exception {
        // Create the Banner with an existing ID
        banner.setId(1L);
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        int databaseSizeBeforeCreate = bannerRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerRepository.findAll().collectList().block().size();
        // set the field null
        banner.setType(null);

        // Create the Banner, which fails.
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = bannerRepository.findAll().collectList().block().size();
        // set the field null
        banner.setLink(null);

        // Create the Banner, which fails.
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllBanners() {
        // Initialize the database
        bannerRepository.save(banner).block();

        // Get all the bannerList
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
            .value(hasItem(banner.getId().intValue()))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE))
            .jsonPath("$.[*].link")
            .value(hasItem(DEFAULT_LINK));
    }

    @Test
    void getBanner() {
        // Initialize the database
        bannerRepository.save(banner).block();

        // Get the banner
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, banner.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(banner.getId().intValue()))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE))
            .jsonPath("$.link")
            .value(is(DEFAULT_LINK));
    }

    @Test
    void getNonExistingBanner() {
        // Get the banner
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingBanner() throws Exception {
        // Initialize the database
        bannerRepository.save(banner).block();

        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();

        // Update the banner
        Banner updatedBanner = bannerRepository.findById(banner.getId()).block();
        updatedBanner.type(UPDATED_TYPE).link(UPDATED_LINK);
        BannerDTO bannerDTO = bannerMapper.toDto(updatedBanner);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, bannerDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
        Banner testBanner = bannerList.get(bannerList.size() - 1);
        assertThat(testBanner.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBanner.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    void putNonExistingBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, bannerDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBannerWithPatch() throws Exception {
        // Initialize the database
        bannerRepository.save(banner).block();

        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();

        // Update the banner using partial update
        Banner partialUpdatedBanner = new Banner();
        partialUpdatedBanner.setId(banner.getId());

        partialUpdatedBanner.type(UPDATED_TYPE).link(UPDATED_LINK);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedBanner.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedBanner))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
        Banner testBanner = bannerList.get(bannerList.size() - 1);
        assertThat(testBanner.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBanner.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    void fullUpdateBannerWithPatch() throws Exception {
        // Initialize the database
        bannerRepository.save(banner).block();

        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();

        // Update the banner using partial update
        Banner partialUpdatedBanner = new Banner();
        partialUpdatedBanner.setId(banner.getId());

        partialUpdatedBanner.type(UPDATED_TYPE).link(UPDATED_LINK);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedBanner.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedBanner))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
        Banner testBanner = bannerList.get(bannerList.size() - 1);
        assertThat(testBanner.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBanner.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    void patchNonExistingBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, bannerDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBanner() throws Exception {
        int databaseSizeBeforeUpdate = bannerRepository.findAll().collectList().block().size();
        banner.setId(count.incrementAndGet());

        // Create the Banner
        BannerDTO bannerDTO = bannerMapper.toDto(banner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(bannerDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Banner in the database
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBanner() {
        // Initialize the database
        bannerRepository.save(banner).block();

        int databaseSizeBeforeDelete = bannerRepository.findAll().collectList().block().size();

        // Delete the banner
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, banner.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Banner> bannerList = bannerRepository.findAll().collectList().block();
        assertThat(bannerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
