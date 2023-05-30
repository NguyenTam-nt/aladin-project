package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.SubjectRepository;
import co.aladintech.hcm.service.SubjectService;
import co.aladintech.hcm.service.dto.SubjectDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.Subject}.
 */
@RestController
@RequestMapping("/api")
public class SubjectResource {

    private final Logger log = LoggerFactory.getLogger(SubjectResource.class);

    private static final String ENTITY_NAME = "subject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectService subjectService;

    private final SubjectRepository subjectRepository;

    public SubjectResource(SubjectService subjectService, SubjectRepository subjectRepository) {
        this.subjectService = subjectService;
        this.subjectRepository = subjectRepository;
    }

    /**
     * {@code POST  /subjects} : Create a new subject.
     *
     * @param subjectDTO the subjectDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subjectDTO, or with status {@code 400 (Bad Request)} if the subject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subjects")
    public Mono<ResponseEntity<SubjectDTO>> createSubject(@Valid @RequestBody SubjectDTO subjectDTO) throws URISyntaxException {
        log.debug("REST request to save Subject : {}", subjectDTO);
        if (subjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new subject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return subjectService
            .save(subjectDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/subjects/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /subjects/:id} : Updates an existing subject.
     *
     * @param id the id of the subjectDTO to save.
     * @param subjectDTO the subjectDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectDTO,
     * or with status {@code 400 (Bad Request)} if the subjectDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subjectDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subjects/{id}")
    public Mono<ResponseEntity<SubjectDTO>> updateSubject(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SubjectDTO subjectDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Subject : {}, {}", id, subjectDTO);
        if (subjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subjectDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return subjectRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return subjectService
                    .update(subjectDTO)
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
     * {@code PATCH  /subjects/:id} : Partial updates given fields of an existing subject, field will ignore if it is null
     *
     * @param id the id of the subjectDTO to save.
     * @param subjectDTO the subjectDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectDTO,
     * or with status {@code 400 (Bad Request)} if the subjectDTO is not valid,
     * or with status {@code 404 (Not Found)} if the subjectDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the subjectDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/subjects/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<SubjectDTO>> partialUpdateSubject(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SubjectDTO subjectDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Subject partially : {}, {}", id, subjectDTO);
        if (subjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subjectDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return subjectRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<SubjectDTO> result = subjectService.partialUpdate(subjectDTO);

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
     * {@code GET  /subjects} : get all the subjects.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjects in body.
     */
    @GetMapping("/subjects")
    public Mono<ResponseEntity<List<SubjectDTO>>> getAllSubjects(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Subjects");
        return subjectService
            .countAll()
            .zipWith(subjectService.findAll(pageable).collectList())
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
     * {@code GET  /subjects/:id} : get the "id" subject.
     *
     * @param id the id of the subjectDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subjectDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subjects/{id}")
    public Mono<ResponseEntity<SubjectDTO>> getSubject(@PathVariable Long id) {
        log.debug("REST request to get Subject : {}", id);
        Mono<SubjectDTO> subjectDTO = subjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subjectDTO);
    }

    /**
     * {@code DELETE  /subjects/:id} : delete the "id" subject.
     *
     * @param id the id of the subjectDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subjects/{id}")
    public Mono<ResponseEntity<Void>> deleteSubject(@PathVariable Long id) {
        log.debug("REST request to delete Subject : {}", id);
        return subjectService
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
