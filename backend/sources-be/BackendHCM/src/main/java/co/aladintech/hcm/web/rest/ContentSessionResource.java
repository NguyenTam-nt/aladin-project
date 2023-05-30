package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.ContentSessionRepository;
import co.aladintech.hcm.service.ContentSessionService;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.ContentSession}.
 */
@RestController
@RequestMapping("/api")
public class ContentSessionResource {

    private final Logger log = LoggerFactory.getLogger(ContentSessionResource.class);

    private static final String ENTITY_NAME = "backendHcmContentSession";

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
    public ResponseEntity<ContentSessionDTO> createContentSession(@Valid @RequestBody ContentSessionDTO contentSessionDTO)
        throws URISyntaxException {
        log.debug("REST request to save ContentSession : {}", contentSessionDTO);
        if (contentSessionDTO.getId() != null) {
            throw new BadRequestAlertException("A new contentSession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContentSessionDTO result = contentSessionService.save(contentSessionDTO);
        return ResponseEntity
            .created(new URI("/api/content-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
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
    public ResponseEntity<ContentSessionDTO> updateContentSession(
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

        if (!contentSessionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ContentSessionDTO result = contentSessionService.update(contentSessionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contentSessionDTO.getId().toString()))
            .body(result);
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
    public ResponseEntity<ContentSessionDTO> partialUpdateContentSession(
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

        if (!contentSessionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ContentSessionDTO> result = contentSessionService.partialUpdate(contentSessionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contentSessionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /content-sessions} : get all the contentSessions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contentSessions in body.
     */
    @GetMapping("/content-sessions")
    public ResponseEntity<List<ContentSessionDTO>> getAllContentSessions(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ContentSessions");
        Page<ContentSessionDTO> page = contentSessionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/content-sessions/category")
    public ResponseEntity<List<ContentSessionDTO>> getAllContentSessionsByCategory(@RequestParam String category, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ContentSessions by category");
        Page<ContentSessionDTO> page = contentSessionService.findAllByCategory(category, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /content-sessions/:id} : get the "id" contentSession.
     *
     * @param id the id of the contentSessionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contentSessionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/content-sessions/{id}")
    public ResponseEntity<ContentSessionDTO> getContentSession(@PathVariable Long id) {
        log.debug("REST request to get ContentSession : {}", id);
        Optional<ContentSessionDTO> contentSessionDTO = contentSessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contentSessionDTO);
    }

    /**
     * {@code DELETE  /content-sessions/:id} : delete the "id" contentSession.
     *
     * @param id the id of the contentSessionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/content-sessions/{id}")
    public ResponseEntity<Void> deleteContentSession(@PathVariable Long id) {
        log.debug("REST request to delete ContentSession : {}", id);
        contentSessionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
