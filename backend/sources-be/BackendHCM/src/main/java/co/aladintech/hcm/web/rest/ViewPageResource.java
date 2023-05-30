package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.domain.ViewPage;
import co.aladintech.hcm.repository.ViewPageRepository;
import co.aladintech.hcm.service.ViewPageService;
import co.aladintech.hcm.service.dto.ViewPageDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.ViewPage}.
 */
@RestController
@RequestMapping("/api")
public class ViewPageResource {

    private final Logger log = LoggerFactory.getLogger(ViewPageResource.class);

    private static final String ENTITY_NAME = "backendHcmViewPage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ViewPageService viewPageService;

    private final ViewPageRepository viewPageRepository;

    public ViewPageResource(ViewPageService viewPageService, ViewPageRepository viewPageRepository) {
        this.viewPageService = viewPageService;
        this.viewPageRepository = viewPageRepository;
    }

    /**
     * {@code POST  /view-pages} : Create a new viewPage.
     *
     * @param viewPageDTO the viewPageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new viewPageDTO, or with status {@code 400 (Bad Request)} if the viewPage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/view-pages")
    public ResponseEntity<ViewPageDTO> createViewPage(@RequestBody ViewPageDTO viewPageDTO) throws URISyntaxException {
        log.debug("REST request to save ViewPage : {}", viewPageDTO);
        if (viewPageDTO.getId() != null) {
            throw new BadRequestAlertException("A new viewPage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ViewPageDTO result = viewPageService.save(viewPageDTO);
        return ResponseEntity
            .created(new URI("/api/view-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /view-pages/:id} : Updates an existing viewPage.
     *
     * @param id the id of the viewPageDTO to save.
     * @param viewPageDTO the viewPageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated viewPageDTO,
     * or with status {@code 400 (Bad Request)} if the viewPageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the viewPageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/view-pages/{id}")
    public ResponseEntity<ViewPageDTO> updateViewPage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ViewPageDTO viewPageDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ViewPage : {}, {}", id, viewPageDTO);
        if (viewPageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, viewPageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!viewPageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ViewPageDTO result = viewPageService.update(viewPageDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, viewPageDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/view-pages/increment")
    public ResponseEntity<?>incrementViewPage() throws URISyntaxException {

        List<ViewPage> viewPages = viewPageRepository.findAll();
        ViewPage viewPage;
        if(viewPages != null && viewPages.size() > 0) {
            viewPage = viewPages.get(0);
            viewPage.setView(viewPage.getView() + 1);
        }  {
            viewPage = new ViewPage();
            viewPage.setView(1L);
        }
        viewPageRepository.save(viewPage);


        return ResponseEntity
            .ok().body(viewPage.getView());
    }

    /**
     * {@code PATCH  /view-pages/:id} : Partial updates given fields of an existing viewPage, field will ignore if it is null
     *
     * @param id the id of the viewPageDTO to save.
     * @param viewPageDTO the viewPageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated viewPageDTO,
     * or with status {@code 400 (Bad Request)} if the viewPageDTO is not valid,
     * or with status {@code 404 (Not Found)} if the viewPageDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the viewPageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/view-pages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ViewPageDTO> partialUpdateViewPage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ViewPageDTO viewPageDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ViewPage partially : {}, {}", id, viewPageDTO);
        if (viewPageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, viewPageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!viewPageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ViewPageDTO> result = viewPageService.partialUpdate(viewPageDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, viewPageDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /view-pages} : get all the viewPages.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of viewPages in body.
     */
    @GetMapping("/view-pages")
    public ResponseEntity<List<ViewPageDTO>> getAllViewPages(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ViewPages");
        Page<ViewPageDTO> page = viewPageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /view-pages/:id} : get the "id" viewPage.
     *
     * @param id the id of the viewPageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the viewPageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/view-pages/{id}")
    public ResponseEntity<ViewPageDTO> getViewPage(@PathVariable Long id) {
        log.debug("REST request to get ViewPage : {}", id);
        Optional<ViewPageDTO> viewPageDTO = viewPageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(viewPageDTO);
    }

    /**
     * {@code DELETE  /view-pages/:id} : delete the "id" viewPage.
     *
     * @param id the id of the viewPageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/view-pages/{id}")
    public ResponseEntity<Void> deleteViewPage(@PathVariable Long id) {
        log.debug("REST request to delete ViewPage : {}", id);
        viewPageService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

}
