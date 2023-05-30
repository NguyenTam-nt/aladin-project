package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.CadresCategoryRepository;
import co.aladintech.hcm.service.CadresCategoryService;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.CadresCategory}.
 */
@RestController
@RequestMapping("/api")
public class CadresCategoryResource {

    private final Logger log = LoggerFactory.getLogger(CadresCategoryResource.class);

    private static final String ENTITY_NAME = "backendHcmCadresCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CadresCategoryService cadresCategoryService;

    private final CadresCategoryRepository cadresCategoryRepository;

    public CadresCategoryResource(CadresCategoryService cadresCategoryService, CadresCategoryRepository cadresCategoryRepository) {
        this.cadresCategoryService = cadresCategoryService;
        this.cadresCategoryRepository = cadresCategoryRepository;
    }

    /**
     * {@code POST  /cadres-categories} : Create a new cadresCategory.
     *
     * @param cadresCategoryDTO the cadresCategoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cadresCategoryDTO, or with status {@code 400 (Bad Request)} if the cadresCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cadres-categories")
    public ResponseEntity<CadresCategoryDTO> createCadresCategory(@Valid @RequestBody CadresCategoryDTO cadresCategoryDTO)
        throws URISyntaxException {
        log.debug("REST request to save CadresCategory : {}", cadresCategoryDTO);
        if (cadresCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new cadresCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CadresCategoryDTO result = cadresCategoryService.save(cadresCategoryDTO);
        return ResponseEntity
            .created(new URI("/api/cadres-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cadres-categories/:id} : Updates an existing cadresCategory.
     *
     * @param id the id of the cadresCategoryDTO to save.
     * @param cadresCategoryDTO the cadresCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadresCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the cadresCategoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cadresCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cadres-categories/{id}")
    public ResponseEntity<CadresCategoryDTO> updateCadresCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CadresCategoryDTO cadresCategoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CadresCategory : {}, {}", id, cadresCategoryDTO);
        if (cadresCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadresCategoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadresCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CadresCategoryDTO result = cadresCategoryService.update(cadresCategoryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadresCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cadres-categories/:id} : Partial updates given fields of an existing cadresCategory, field will ignore if it is null
     *
     * @param id the id of the cadresCategoryDTO to save.
     * @param cadresCategoryDTO the cadresCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadresCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the cadresCategoryDTO is not valid,
     * or with status {@code 404 (Not Found)} if the cadresCategoryDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cadresCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cadres-categories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CadresCategoryDTO> partialUpdateCadresCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CadresCategoryDTO cadresCategoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CadresCategory partially : {}, {}", id, cadresCategoryDTO);
        if (cadresCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadresCategoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadresCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CadresCategoryDTO> result = cadresCategoryService.partialUpdate(cadresCategoryDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadresCategoryDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /cadres-categories} : get all the cadresCategories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cadresCategories in body.
     */
    @GetMapping("/cadres-categories")
    public ResponseEntity<List<CadresCategoryDTO>> getAllCadresCategories(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of CadresCategories");
        Page<CadresCategoryDTO> page = cadresCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cadres-categories/:id} : get the "id" cadresCategory.
     *
     * @param id the id of the cadresCategoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cadresCategoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cadres-categories/{id}")
    public ResponseEntity<CadresCategoryDTO> getCadresCategory(@PathVariable Long id) {
        log.debug("REST request to get CadresCategory : {}", id);
        Optional<CadresCategoryDTO> cadresCategoryDTO = cadresCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cadresCategoryDTO);
    }

    /**
     * {@code DELETE  /cadres-categories/:id} : delete the "id" cadresCategory.
     *
     * @param id the id of the cadresCategoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cadres-categories/{id}")
    public ResponseEntity<Void> deleteCadresCategory(@PathVariable Long id) {
        log.debug("REST request to delete CadresCategory : {}", id);
        cadresCategoryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
