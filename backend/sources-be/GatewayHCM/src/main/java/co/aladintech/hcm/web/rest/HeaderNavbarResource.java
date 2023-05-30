package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.HeaderNavbarRepository;
import co.aladintech.hcm.service.HeaderNavbarService;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.HeaderNavbar}.
 */
@RestController
@RequestMapping("/api")
public class HeaderNavbarResource {

    private final Logger log = LoggerFactory.getLogger(HeaderNavbarResource.class);

    private static final String ENTITY_NAME = "headerNavbar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HeaderNavbarService headerNavbarService;

    private final HeaderNavbarRepository headerNavbarRepository;

    public HeaderNavbarResource(HeaderNavbarService headerNavbarService, HeaderNavbarRepository headerNavbarRepository) {
        this.headerNavbarService = headerNavbarService;
        this.headerNavbarRepository = headerNavbarRepository;
    }

    /**
     * {@code POST  /header-navbars} : Create a new headerNavbar.
     *
     * @param headerNavbarDTO the headerNavbarDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new headerNavbarDTO, or with status {@code 400 (Bad Request)} if the headerNavbar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/header-navbars")
    public Mono<ResponseEntity<HeaderNavbarDTO>> createHeaderNavbar(@RequestBody HeaderNavbarDTO headerNavbarDTO)
        throws URISyntaxException {
        log.debug("REST request to save HeaderNavbar : {}", headerNavbarDTO);
        if (headerNavbarDTO.getId() != null) {
            throw new BadRequestAlertException("A new headerNavbar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return headerNavbarService
            .save(headerNavbarDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/header-navbars/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /header-navbars/:id} : Updates an existing headerNavbar.
     *
     * @param id the id of the headerNavbarDTO to save.
     * @param headerNavbarDTO the headerNavbarDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated headerNavbarDTO,
     * or with status {@code 400 (Bad Request)} if the headerNavbarDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the headerNavbarDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/header-navbars/{id}")
    public Mono<ResponseEntity<HeaderNavbarDTO>> updateHeaderNavbar(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HeaderNavbarDTO headerNavbarDTO
    ) throws URISyntaxException {
        log.debug("REST request to update HeaderNavbar : {}, {}", id, headerNavbarDTO);
        if (headerNavbarDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, headerNavbarDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return headerNavbarRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return headerNavbarService
                    .update(headerNavbarDTO)
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
     * {@code PATCH  /header-navbars/:id} : Partial updates given fields of an existing headerNavbar, field will ignore if it is null
     *
     * @param id the id of the headerNavbarDTO to save.
     * @param headerNavbarDTO the headerNavbarDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated headerNavbarDTO,
     * or with status {@code 400 (Bad Request)} if the headerNavbarDTO is not valid,
     * or with status {@code 404 (Not Found)} if the headerNavbarDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the headerNavbarDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/header-navbars/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<HeaderNavbarDTO>> partialUpdateHeaderNavbar(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HeaderNavbarDTO headerNavbarDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update HeaderNavbar partially : {}, {}", id, headerNavbarDTO);
        if (headerNavbarDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, headerNavbarDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return headerNavbarRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<HeaderNavbarDTO> result = headerNavbarService.partialUpdate(headerNavbarDTO);

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
     * {@code GET  /header-navbars} : get all the headerNavbars.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of headerNavbars in body.
     */
    @GetMapping("/header-navbars")
    public Mono<ResponseEntity<List<HeaderNavbarDTO>>> getAllHeaderNavbars(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of HeaderNavbars");
        return headerNavbarService
            .countAll()
            .zipWith(headerNavbarService.findAll(pageable).collectList())
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
     * {@code GET  /header-navbars/:id} : get the "id" headerNavbar.
     *
     * @param id the id of the headerNavbarDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the headerNavbarDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/header-navbars/{id}")
    public Mono<ResponseEntity<HeaderNavbarDTO>> getHeaderNavbar(@PathVariable Long id) {
        log.debug("REST request to get HeaderNavbar : {}", id);
        Mono<HeaderNavbarDTO> headerNavbarDTO = headerNavbarService.findOne(id);
        return ResponseUtil.wrapOrNotFound(headerNavbarDTO);
    }

    /**
     * {@code DELETE  /header-navbars/:id} : delete the "id" headerNavbar.
     *
     * @param id the id of the headerNavbarDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/header-navbars/{id}")
    public Mono<ResponseEntity<Void>> deleteHeaderNavbar(@PathVariable Long id) {
        log.debug("REST request to delete HeaderNavbar : {}", id);
        return headerNavbarService
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
