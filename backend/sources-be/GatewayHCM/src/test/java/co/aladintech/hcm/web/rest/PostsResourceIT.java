package co.aladintech.hcm.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import co.aladintech.hcm.IntegrationTest;
import co.aladintech.hcm.domain.Posts;
import co.aladintech.hcm.repository.EntityManager;
import co.aladintech.hcm.repository.PostsRepository;
import co.aladintech.hcm.service.dto.PostsDTO;
import co.aladintech.hcm.service.mapper.PostsMapper;
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
 * Integration tests for the {@link PostsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class PostsResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_KO = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_KO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_KO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_KO = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_OUTSTANDING = false;
    private static final Boolean UPDATED_OUTSTANDING = true;

    private static final String ENTITY_API_URL = "/api/posts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private PostsMapper postsMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Posts posts;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Posts createEntity(EntityManager em) {
        Posts posts = new Posts()
            .title(DEFAULT_TITLE)
            .titleKo(DEFAULT_TITLE_KO)
            .description(DEFAULT_DESCRIPTION)
            .descriptionKo(DEFAULT_DESCRIPTION_KO)
            .image(DEFAULT_IMAGE)
            .link(DEFAULT_LINK)
            .outstanding(DEFAULT_OUTSTANDING);
        return posts;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Posts createUpdatedEntity(EntityManager em) {
        Posts posts = new Posts()
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .image(UPDATED_IMAGE)
            .link(UPDATED_LINK)
            .outstanding(UPDATED_OUTSTANDING);
        return posts;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Posts.class).block();
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
        posts = createEntity(em);
    }

    @Test
    void createPosts() throws Exception {
        int databaseSizeBeforeCreate = postsRepository.findAll().collectList().block().size();
        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeCreate + 1);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPosts.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testPosts.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPosts.getDescriptionKo()).isEqualTo(DEFAULT_DESCRIPTION_KO);
        assertThat(testPosts.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPosts.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testPosts.getOutstanding()).isEqualTo(DEFAULT_OUTSTANDING);
    }

    @Test
    void createPostsWithExistingId() throws Exception {
        // Create the Posts with an existing ID
        posts.setId(1L);
        PostsDTO postsDTO = postsMapper.toDto(posts);

        int databaseSizeBeforeCreate = postsRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setTitle(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkTitleKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setTitleKo(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setDescription(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionKoIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setDescriptionKo(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setImage(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().collectList().block().size();
        // set the field null
        posts.setLink(null);

        // Create the Posts, which fails.
        PostsDTO postsDTO = postsMapper.toDto(posts);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllPosts() {
        // Initialize the database
        postsRepository.save(posts).block();

        // Get all the postsList
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
            .value(hasItem(posts.getId().intValue()))
            .jsonPath("$.[*].title")
            .value(hasItem(DEFAULT_TITLE))
            .jsonPath("$.[*].titleKo")
            .value(hasItem(DEFAULT_TITLE_KO))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION))
            .jsonPath("$.[*].descriptionKo")
            .value(hasItem(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.[*].image")
            .value(hasItem(DEFAULT_IMAGE))
            .jsonPath("$.[*].link")
            .value(hasItem(DEFAULT_LINK))
            .jsonPath("$.[*].outstanding")
            .value(hasItem(DEFAULT_OUTSTANDING.booleanValue()));
    }

    @Test
    void getPosts() {
        // Initialize the database
        postsRepository.save(posts).block();

        // Get the posts
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, posts.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(posts.getId().intValue()))
            .jsonPath("$.title")
            .value(is(DEFAULT_TITLE))
            .jsonPath("$.titleKo")
            .value(is(DEFAULT_TITLE_KO))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION))
            .jsonPath("$.descriptionKo")
            .value(is(DEFAULT_DESCRIPTION_KO))
            .jsonPath("$.image")
            .value(is(DEFAULT_IMAGE))
            .jsonPath("$.link")
            .value(is(DEFAULT_LINK))
            .jsonPath("$.outstanding")
            .value(is(DEFAULT_OUTSTANDING.booleanValue()));
    }

    @Test
    void getNonExistingPosts() {
        // Get the posts
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingPosts() throws Exception {
        // Initialize the database
        postsRepository.save(posts).block();

        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();

        // Update the posts
        Posts updatedPosts = postsRepository.findById(posts.getId()).block();
        updatedPosts
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .image(UPDATED_IMAGE)
            .link(UPDATED_LINK)
            .outstanding(UPDATED_OUTSTANDING);
        PostsDTO postsDTO = postsMapper.toDto(updatedPosts);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, postsDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPosts.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testPosts.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPosts.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testPosts.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPosts.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testPosts.getOutstanding()).isEqualTo(UPDATED_OUTSTANDING);
    }

    @Test
    void putNonExistingPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, postsDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePostsWithPatch() throws Exception {
        // Initialize the database
        postsRepository.save(posts).block();

        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();

        // Update the posts using partial update
        Posts partialUpdatedPosts = new Posts();
        partialUpdatedPosts.setId(posts.getId());

        partialUpdatedPosts
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .outstanding(UPDATED_OUTSTANDING);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPosts.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPosts))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPosts.getTitleKo()).isEqualTo(DEFAULT_TITLE_KO);
        assertThat(testPosts.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPosts.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testPosts.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPosts.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testPosts.getOutstanding()).isEqualTo(UPDATED_OUTSTANDING);
    }

    @Test
    void fullUpdatePostsWithPatch() throws Exception {
        // Initialize the database
        postsRepository.save(posts).block();

        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();

        // Update the posts using partial update
        Posts partialUpdatedPosts = new Posts();
        partialUpdatedPosts.setId(posts.getId());

        partialUpdatedPosts
            .title(UPDATED_TITLE)
            .titleKo(UPDATED_TITLE_KO)
            .description(UPDATED_DESCRIPTION)
            .descriptionKo(UPDATED_DESCRIPTION_KO)
            .image(UPDATED_IMAGE)
            .link(UPDATED_LINK)
            .outstanding(UPDATED_OUTSTANDING);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPosts.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPosts))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPosts.getTitleKo()).isEqualTo(UPDATED_TITLE_KO);
        assertThat(testPosts.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPosts.getDescriptionKo()).isEqualTo(UPDATED_DESCRIPTION_KO);
        assertThat(testPosts.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPosts.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testPosts.getOutstanding()).isEqualTo(UPDATED_OUTSTANDING);
    }

    @Test
    void patchNonExistingPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, postsDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, count.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().collectList().block().size();
        posts.setId(count.incrementAndGet());

        // Create the Posts
        PostsDTO postsDTO = postsMapper.toDto(posts);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(postsDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePosts() {
        // Initialize the database
        postsRepository.save(posts).block();

        int databaseSizeBeforeDelete = postsRepository.findAll().collectList().block().size();

        // Delete the posts
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, posts.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Posts> postsList = postsRepository.findAll().collectList().block();
        assertThat(postsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
