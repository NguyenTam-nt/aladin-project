package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.PostsRepository;
import co.aladintech.hcm.service.PostsService;
import co.aladintech.hcm.service.dto.PostsDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link co.aladintech.hcm.domain.Posts}.
 */
@RestController
@RequestMapping("/api")
public class PostsResource {

    private final Logger log = LoggerFactory.getLogger(PostsResource.class);

    private static final String ENTITY_NAME = "backendHcmPosts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PostsService postsService;

    private final PostsRepository postsRepository;

    public PostsResource(PostsService postsService, PostsRepository postsRepository) {
        this.postsService = postsService;
        this.postsRepository = postsRepository;
    }

    /**
     * {@code POST  /posts} : Create a new posts.
     *
     * @param postsDTO the postsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new postsDTO, or with status {@code 400 (Bad Request)} if the posts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/posts")
    public ResponseEntity<PostsDTO> createPosts(@Valid @RequestBody PostsDTO postsDTO) throws URISyntaxException {
        log.debug("REST request to save Posts : {}", postsDTO);
        if (postsDTO.getId() != null) {
            throw new BadRequestAlertException("A new posts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PostsDTO result = postsService.save(postsDTO);
        return ResponseEntity
            .created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /posts/:id} : Updates an existing posts.
     *
     * @param id the id of the postsDTO to save.
     * @param postsDTO the postsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated postsDTO,
     * or with status {@code 400 (Bad Request)} if the postsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the postsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/posts/{id}")
    public ResponseEntity<PostsDTO> updatePosts(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PostsDTO postsDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Posts : {}, {}", id, postsDTO);
        if (postsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, postsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!postsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PostsDTO result = postsService.update(postsDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, postsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /posts/:id} : Partial updates given fields of an existing posts, field will ignore if it is null
     *
     * @param id the id of the postsDTO to save.
     * @param postsDTO the postsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated postsDTO,
     * or with status {@code 400 (Bad Request)} if the postsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the postsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the postsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/posts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PostsDTO> partialUpdatePosts(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PostsDTO postsDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Posts partially : {}, {}", id, postsDTO);
        if (postsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, postsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!postsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PostsDTO> result = postsService.partialUpdate(postsDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, postsDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /posts} : get all the posts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of posts in body.
     */
    @GetMapping("/posts")
    public ResponseEntity<List<PostsDTO>> getAllPosts(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Posts");
        Page<PostsDTO> page = postsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/posts/type")
    public ResponseEntity<List<PostsDTO>> getAllPostsByType(@RequestParam String type, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Posts");
        Page<PostsDTO> page = postsService.findAllByType(type,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /posts/:id} : get the "id" posts.
     *
     * @param id the id of the postsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the postsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/posts/{id}")
    public ResponseEntity<PostsDTO> getPosts(@PathVariable Long id) {
        log.debug("REST request to get Posts : {}", id);
        Optional<PostsDTO> postsDTO = postsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(postsDTO);
    }

    /**
     * {@code DELETE  /posts/:id} : delete the "id" posts.
     *
     * @param id the id of the postsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePosts(@PathVariable Long id) {
        log.debug("REST request to delete Posts : {}", id);
        postsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @DeleteMapping("/posts/allid")
    public ResponseEntity<Void> deletePostsAll(@RequestParam List<Long> ids) {
        log.debug("REST request to delete Posts : {}", ids);
        postsService.deleteAll(ids);
        return ResponseEntity
            .noContent().build();
    }
}
