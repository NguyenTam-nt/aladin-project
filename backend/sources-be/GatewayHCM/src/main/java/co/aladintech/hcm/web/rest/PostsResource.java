package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.PostsRepository;
import co.aladintech.hcm.service.PostsService;
import co.aladintech.hcm.service.dto.PostsDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link co.aladintech.hcm.domain.Posts}.
 */
@RestController
@RequestMapping("/api")
public class PostsResource {

    private final Logger log = LoggerFactory.getLogger(PostsResource.class);

    private static final String ENTITY_NAME = "posts";

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
    public Mono<ResponseEntity<PostsDTO>> createPosts(@Valid @RequestBody PostsDTO postsDTO) throws URISyntaxException {
        log.debug("REST request to save Posts : {}", postsDTO);
        if (postsDTO.getId() != null) {
            throw new BadRequestAlertException("A new posts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return postsService
            .save(postsDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/posts/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
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
    public Mono<ResponseEntity<PostsDTO>> updatePosts(
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

        return postsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return postsService
                    .update(postsDTO)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
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
    public Mono<ResponseEntity<PostsDTO>> partialUpdatePosts(
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

        return postsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<PostsDTO> result = postsService.partialUpdate(postsDTO);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /posts} : get all the posts.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of posts in body.
     */
    @GetMapping("/posts")
    public Mono<ResponseEntity<List<PostsDTO>>> getAllPosts(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Posts");
        return postsService
            .countAll()
            .zipWith(postsService.findAll(pageable).collectList())
            .map(countWithEntities ->
                ResponseEntity
                    .ok()
                    .headers(
                        PaginationUtil.generatePaginationHttpHeaders(
                            UriComponentsBuilder.fromHttpRequest(request),
                            new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                        )
                    )
                    .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /posts/:id} : get the "id" posts.
     *
     * @param id the id of the postsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the postsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/posts/{id}")
    public Mono<ResponseEntity<PostsDTO>> getPosts(@PathVariable Long id) {
        log.debug("REST request to get Posts : {}", id);
        Mono<PostsDTO> postsDTO = postsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(postsDTO);
    }

    /**
     * {@code DELETE  /posts/:id} : delete the "id" posts.
     *
     * @param id the id of the postsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/posts/{id}")
    public Mono<ResponseEntity<Void>> deletePosts(@PathVariable Long id) {
        log.debug("REST request to delete Posts : {}", id);
        return postsService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity
                        .noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
