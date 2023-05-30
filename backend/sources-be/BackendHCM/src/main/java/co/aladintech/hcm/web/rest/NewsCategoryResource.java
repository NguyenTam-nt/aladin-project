package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.NewsCategoryRepository;
import co.aladintech.hcm.service.NewsCategoryService;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.dto.NewsCategoryListChildrenDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.NewsCategory}.
 */
@RestController
@RequestMapping("/api")
public class NewsCategoryResource {

    private final Logger log = LoggerFactory.getLogger(NewsCategoryResource.class);

    private static final String ENTITY_NAME = "backendHcmNewsCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsCategoryService newsCategoryService;

    private final NewsCategoryRepository newsCategoryRepository;

    public NewsCategoryResource(NewsCategoryService newsCategoryService, NewsCategoryRepository newsCategoryRepository) {
        this.newsCategoryService = newsCategoryService;
        this.newsCategoryRepository = newsCategoryRepository;
    }

    /**
     * {@code POST  /news-categories} : Create a new newsCategory.
     *
     * @param newsCategoryDTO the newsCategoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new newsCategoryDTO, or with status {@code 400 (Bad Request)} if the newsCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news-categories")
    public ResponseEntity<NewsCategoryDTO> createNewsCategory(@RequestBody NewsCategoryDTO newsCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save NewsCategory : {}", newsCategoryDTO);
        if (newsCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new newsCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NewsCategoryDTO result = newsCategoryService.save(newsCategoryDTO);
        return ResponseEntity
            .created(new URI("/api/news-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/news-categories/list-children")
    public ResponseEntity<NewsCategoryListChildrenDTO> createNewsCategoryListChildren(@RequestBody NewsCategoryListChildrenDTO newsCategoryListChildrenDTO) throws URISyntaxException {
        log.debug("REST request to save NewsCategory : {}", newsCategoryListChildrenDTO);
        if (newsCategoryListChildrenDTO.getId() != null) {
            throw new BadRequestAlertException("A new newsCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NewsCategoryListChildrenDTO result = newsCategoryService.saveWithChildren(newsCategoryListChildrenDTO);
        return ResponseEntity
            .created(new URI("/api/news-categories/" + result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /news-categories/:id} : Updates an existing newsCategory.
     *
     * @param id the id of the newsCategoryDTO to save.
     * @param newsCategoryDTO the newsCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the newsCategoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the newsCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news-categories/{id}")
    public ResponseEntity<NewsCategoryDTO> updateNewsCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NewsCategoryDTO newsCategoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update NewsCategory : {}, {}", id, newsCategoryDTO);
        if (newsCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsCategoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!newsCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NewsCategoryDTO result = newsCategoryService.update(newsCategoryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, newsCategoryDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/news-categories/with-children/{id}")
    public ResponseEntity<NewsCategoryListChildrenDTO> updateNewsCategoryWithChildren(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NewsCategoryListChildrenDTO newsCategoryListChildrenDTO
    ) throws URISyntaxException {
        log.debug("REST request to update NewsCategory : {}, {}", id, newsCategoryListChildrenDTO);
        if (newsCategoryListChildrenDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsCategoryListChildrenDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!newsCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NewsCategoryListChildrenDTO result = newsCategoryService.updateWithChildren(newsCategoryListChildrenDTO);
        return ResponseEntity
            .ok().body(result);
    }

    /**
     * {@code PATCH  /news-categories/:id} : Partial updates given fields of an existing newsCategory, field will ignore if it is null
     *
     * @param id the id of the newsCategoryDTO to save.
     * @param newsCategoryDTO the newsCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the newsCategoryDTO is not valid,
     * or with status {@code 404 (Not Found)} if the newsCategoryDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the newsCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/news-categories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NewsCategoryDTO> partialUpdateNewsCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NewsCategoryDTO newsCategoryDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update NewsCategory partially : {}, {}", id, newsCategoryDTO);
        if (newsCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsCategoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!newsCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NewsCategoryDTO> result = newsCategoryService.partialUpdate(newsCategoryDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, newsCategoryDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /news-categories} : get all the newsCategories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of newsCategories in body.
     */
    @GetMapping("/news-categories")
    public ResponseEntity<List<NewsCategoryListChildrenDTO>> getAllNewsCategories(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of NewsCategories");
        Page<NewsCategoryListChildrenDTO> page = newsCategoryService.findAllWithChildren(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/news-categories/parent")
    public ResponseEntity<List<NewsCategoryListChildrenDTO>> getAllNewsCategoriesParent(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of NewsCategories");
        Page<NewsCategoryListChildrenDTO> page = newsCategoryService.findAllParent(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /news-categories/:id} : get the "id" newsCategory.
     *
     * @param id the id of the newsCategoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the newsCategoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news-categories/{id}")
    public ResponseEntity<NewsCategoryListChildrenDTO> getNewsCategory(@PathVariable Long id) {
        log.debug("REST request to get NewsCategory : {}", id);
        Optional<NewsCategoryListChildrenDTO> newsCategoryDTO = newsCategoryService.findOneWithChildren(id);
        return ResponseUtil.wrapOrNotFound(newsCategoryDTO);
    }

    /**
     * {@code DELETE  /news-categories/:id} : delete the "id" newsCategory.
     *
     * @param id the id of the newsCategoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news-categories/{id}")
    public ResponseEntity<Void> deleteNewsCategory(@PathVariable Long id) {
        log.debug("REST request to delete NewsCategory : {}", id);
        newsCategoryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

}
