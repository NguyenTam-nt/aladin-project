package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.ContentSessionRepository;
import co.aladintech.hcm.service.ContentSessionService;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.ContentSession}.
 */
@RestController
@RequestMapping("/api")
public class ContentSessionResource {

    private final Logger log = LoggerFactory.getLogger(ContentSessionResource.class);

    private static final String ENTITY_NAME = "contentSession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContentSessionService contentSessionService;

    private final ContentSessionRepository contentSessionRepository;

    public ContentSessionResource(ContentSessionService contentSessionService, ContentSessionRepository contentSessionRepository) {
        this.contentSessionService = contentSessionService;
        this.contentSessionRepository = contentSessionRepository;
    }

    /**
     * {@code POST  /content-sessions} : Create a new contentSession.
     *
     * @param contentSessionDTO the contentSessionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contentSessionDTO, or with status {@code 400 (Bad Request)} if the contentSession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/content-sessions")
    public Mono<ResponseEntity<ContentSessionDTO>> createContentSession(@Valid @RequestBody ContentSessionDTO contentSessionDTO)
        throws URISyntaxException {
        log.debug("REST request to save ContentSession : {}", contentSessionDTO);
        if (contentSessionDTO.getId() != null) {
            throw new BadRequestAlertException("A new contentSession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return contentSessionService
            .save(contentSessionDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/content-sessions/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /content-sessions/:id} : Updates an existing contentSession.
     *
     * @param id the id of the contentSessionDTO to save.
     * @param contentSessionDTO the contentSessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contentSessionDTO,
     * or with status {@code 400 (Bad Request)} if the contentSessionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contentSessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/content-sessions/{id}")
    public Mono<ResponseEntity<ContentSessionDTO>> updateContentSession(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ContentSessionDTO contentSessionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ContentSession : {}, {}", id, contentSessionDTO);
        if (contentSessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contentSessionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contentSessionRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return contentSessionService
                    .update(contentSessionDTO)
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
     * {@code PATCH  /content-sessions/:id} : Partial updates given fields of an existing contentSession, field will ignore if it is null
     *
     * @param id the id of the contentSessionDTO to save.
     * @param contentSessionDTO the contentSessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contentSessionDTO,
     * or with status {@code 400 (Bad Request)} if the contentSessionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the contentSessionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the contentSessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/content-sessions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ContentSessionDTO>> partialUpdateContentSession(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ContentSessionDTO contentSessionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ContentSession partially : {}, {}", id, contentSessionDTO);
        if (contentSessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contentSessionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contentSessionRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ContentSessionDTO> result = contentSessionService.partialUpdate(contentSessionDTO);

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
     * {@code GET  /content-sessions} : get all the contentSessions.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contentSessions in body.
     */
    @GetMapping("/content-sessions")
    public Mono<ResponseEntity<List<ContentSessionDTO>>> getAllContentSessions(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of ContentSessions");
        return contentSessionService
            .countAll()
            .zipWith(contentSessionService.findAll(pageable).collectList())
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
     * {@code GET  /content-sessions/:id} : get the "id" contentSession.
     *
     * @param id the id of the contentSessionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contentSessionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/content-sessions/{id}")
    public Mono<ResponseEntity<ContentSessionDTO>> getContentSession(@PathVariable Long id) {
        log.debug("REST request to get ContentSession : {}", id);
        Mono<ContentSessionDTO> contentSessionDTO = contentSessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contentSessionDTO);
    }

    /**
     * {@code DELETE  /content-sessions/:id} : delete the "id" contentSession.
     *
     * @param id the id of the contentSessionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/content-sessions/{id}")
    public Mono<ResponseEntity<Void>> deleteContentSession(@PathVariable Long id) {
        log.debug("REST request to delete ContentSession : {}", id);
        return contentSessionService
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
