package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.CadresRepository;
import co.aladintech.hcm.service.CadresService;
import co.aladintech.hcm.service.dto.CadresDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.Cadres}.
 */
@RestController
@RequestMapping("/api")
public class CadresResource {

    private final Logger log = LoggerFactory.getLogger(CadresResource.class);

    private static final String ENTITY_NAME = "cadres";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CadresService cadresService;

    private final CadresRepository cadresRepository;

    public CadresResource(CadresService cadresService, CadresRepository cadresRepository) {
        this.cadresService = cadresService;
        this.cadresRepository = cadresRepository;
    }

    /**
     * {@code POST  /cadres} : Create a new cadres.
     *
     * @param cadresDTO the cadresDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cadresDTO, or with status {@code 400 (Bad Request)} if the cadres has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cadres")
    public Mono<ResponseEntity<CadresDTO>> createCadres(@Valid @RequestBody CadresDTO cadresDTO) throws URISyntaxException {
        log.debug("REST request to save Cadres : {}", cadresDTO);
        if (cadresDTO.getId() != null) {
            throw new BadRequestAlertException("A new cadres cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return cadresService
            .save(cadresDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/cadres/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /cadres/:id} : Updates an existing cadres.
     *
     * @param id the id of the cadresDTO to save.
     * @param cadresDTO the cadresDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadresDTO,
     * or with status {@code 400 (Bad Request)} if the cadresDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cadresDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cadres/{id}")
    public Mono<ResponseEntity<CadresDTO>> updateCadres(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CadresDTO cadresDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Cadres : {}, {}", id, cadresDTO);
        if (cadresDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadresDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return cadresRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return cadresService
                    .update(cadresDTO)
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
     * {@code PATCH  /cadres/:id} : Partial updates given fields of an existing cadres, field will ignore if it is null
     *
     * @param id the id of the cadresDTO to save.
     * @param cadresDTO the cadresDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadresDTO,
     * or with status {@code 400 (Bad Request)} if the cadresDTO is not valid,
     * or with status {@code 404 (Not Found)} if the cadresDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cadresDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cadres/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<CadresDTO>> partialUpdateCadres(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CadresDTO cadresDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Cadres partially : {}, {}", id, cadresDTO);
        if (cadresDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadresDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return cadresRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<CadresDTO> result = cadresService.partialUpdate(cadresDTO);

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
     * {@code GET  /cadres} : get all the cadres.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cadres in body.
     */
    @GetMapping("/cadres")
    public Mono<ResponseEntity<List<CadresDTO>>> getAllCadres(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Cadres");
        return cadresService
            .countAll()
            .zipWith(cadresService.findAll(pageable).collectList())
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
     * {@code GET  /cadres/:id} : get the "id" cadres.
     *
     * @param id the id of the cadresDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cadresDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cadres/{id}")
    public Mono<ResponseEntity<CadresDTO>> getCadres(@PathVariable Long id) {
        log.debug("REST request to get Cadres : {}", id);
        Mono<CadresDTO> cadresDTO = cadresService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cadresDTO);
    }

    /**
     * {@code DELETE  /cadres/:id} : delete the "id" cadres.
     *
     * @param id the id of the cadresDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cadres/{id}")
    public Mono<ResponseEntity<Void>> deleteCadres(@PathVariable Long id) {
        log.debug("REST request to delete Cadres : {}", id);
        return cadresService
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
