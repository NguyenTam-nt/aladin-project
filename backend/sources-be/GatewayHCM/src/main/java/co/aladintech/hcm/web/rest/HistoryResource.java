package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.HistoryRepository;
import co.aladintech.hcm.service.HistoryService;
import co.aladintech.hcm.service.dto.HistoryDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.History}.
 */
@RestController
@RequestMapping("/api")
public class HistoryResource {

    private final Logger log = LoggerFactory.getLogger(HistoryResource.class);

    private static final String ENTITY_NAME = "history";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoryService historyService;

    private final HistoryRepository historyRepository;

    public HistoryResource(HistoryService historyService, HistoryRepository historyRepository) {
        this.historyService = historyService;
        this.historyRepository = historyRepository;
    }

    /**
     * {@code POST  /histories} : Create a new history.
     *
     * @param historyDTO the historyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historyDTO, or with status {@code 400 (Bad Request)} if the history has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/histories")
    public Mono<ResponseEntity<HistoryDTO>> createHistory(@Valid @RequestBody HistoryDTO historyDTO) throws URISyntaxException {
        log.debug("REST request to save History : {}", historyDTO);
        if (historyDTO.getId() != null) {
            throw new BadRequestAlertException("A new history cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return historyService
            .save(historyDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/histories/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /histories/:id} : Updates an existing history.
     *
     * @param id the id of the historyDTO to save.
     * @param historyDTO the historyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historyDTO,
     * or with status {@code 400 (Bad Request)} if the historyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/histories/{id}")
    public Mono<ResponseEntity<HistoryDTO>> updateHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HistoryDTO historyDTO
    ) throws URISyntaxException {
        log.debug("REST request to update History : {}, {}", id, historyDTO);
        if (historyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return historyRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return historyService
                    .update(historyDTO)
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
     * {@code PATCH  /histories/:id} : Partial updates given fields of an existing history, field will ignore if it is null
     *
     * @param id the id of the historyDTO to save.
     * @param historyDTO the historyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historyDTO,
     * or with status {@code 400 (Bad Request)} if the historyDTO is not valid,
     * or with status {@code 404 (Not Found)} if the historyDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the historyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<HistoryDTO>> partialUpdateHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HistoryDTO historyDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update History partially : {}, {}", id, historyDTO);
        if (historyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return historyRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<HistoryDTO> result = historyService.partialUpdate(historyDTO);

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
     * {@code GET  /histories} : get all the histories.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of histories in body.
     */
    @GetMapping("/histories")
    public Mono<ResponseEntity<List<HistoryDTO>>> getAllHistories(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Histories");
        return historyService
            .countAll()
            .zipWith(historyService.findAll(pageable).collectList())
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
     * {@code GET  /histories/:id} : get the "id" history.
     *
     * @param id the id of the historyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/histories/{id}")
    public Mono<ResponseEntity<HistoryDTO>> getHistory(@PathVariable Long id) {
        log.debug("REST request to get History : {}", id);
        Mono<HistoryDTO> historyDTO = historyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(historyDTO);
    }

    /**
     * {@code DELETE  /histories/:id} : delete the "id" history.
     *
     * @param id the id of the historyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/histories/{id}")
    public Mono<ResponseEntity<Void>> deleteHistory(@PathVariable Long id) {
        log.debug("REST request to delete History : {}", id);
        return historyService
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
