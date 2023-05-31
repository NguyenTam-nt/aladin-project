package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.domain.HeaderNavbar;
import co.aladintech.hcm.repository.HeaderNavbarRepository;
import co.aladintech.hcm.service.HeaderNavbarService;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import co.aladintech.hcm.service.dto.HeaderNavbarIndexDTO;
import co.aladintech.hcm.service.mapper.HeaderNavbarMapper;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
 * REST controller for managing {@link co.aladintech.hcm.domain.HeaderNavbar}.
 */
@RestController
@RequestMapping("/api")
public class HeaderNavbarResource {

    private final Logger log = LoggerFactory.getLogger(HeaderNavbarResource.class);

    private static final String ENTITY_NAME = "backendHcmHeaderNavbar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HeaderNavbarService headerNavbarService;

    private final HeaderNavbarRepository headerNavbarRepository;

    private final HeaderNavbarMapper headerNavbarMapper;

    public HeaderNavbarResource(HeaderNavbarMapper headerNavbarMapper, HeaderNavbarService headerNavbarService, HeaderNavbarRepository headerNavbarRepository) {
        this.headerNavbarMapper = headerNavbarMapper;
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
    public ResponseEntity<HeaderNavbarDTO> createHeaderNavbar(@RequestBody HeaderNavbarDTO headerNavbarDTO) throws URISyntaxException {
        log.debug("REST request to save HeaderNavbar : {}", headerNavbarDTO);
        if (headerNavbarDTO.getId() != null) {
            throw new BadRequestAlertException("A new headerNavbar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HeaderNavbarDTO result = headerNavbarService.save(headerNavbarDTO);
        return ResponseEntity
            .created(new URI("/api/header-navbars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/header-navbars/index")
    public ResponseEntity<HeaderNavbarIndexDTO> createHeaderNavbarIndex(@RequestBody HeaderNavbarIndexDTO headerNavbarIndexDTO) throws URISyntaxException {
        log.debug("REST request to save HeaderNavbar : {}", headerNavbarIndexDTO);
        HeaderNavbarDTO headerNavbarDTO = new HeaderNavbarDTO();
        headerNavbarDTO.setId(headerNavbarIndexDTO.getId());
        headerNavbarDTO.setIndex(headerNavbarIndexDTO.getIndex());
        headerNavbarDTO.setName(headerNavbarIndexDTO.getName());
        headerNavbarDTO.setNameKo(headerNavbarIndexDTO.getNameKo());
        headerNavbarDTO.setLink(headerNavbarIndexDTO.getLink());
        headerNavbarDTO.setStatus(headerNavbarIndexDTO.getStatus());

        HeaderNavbarDTO result = headerNavbarService.save(headerNavbarDTO);

        List<HeaderNavbar> headerNavbars = headerNavbarIndexDTO.getItems().stream().map(e -> {
            e.setParent(result.getId());
            return headerNavbarMapper.toEntity(e);
        }).collect(Collectors.toList());

        headerNavbarRepository.deleteAllByParent(result.getId());
        headerNavbars = headerNavbarRepository.saveAll(headerNavbars);
        headerNavbarIndexDTO.setItems(headerNavbars.stream().map(e -> headerNavbarMapper.toDto(e)).collect(Collectors.toList()));

        return ResponseEntity.ok().body(headerNavbarIndexDTO);
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
    public ResponseEntity<HeaderNavbarDTO> updateHeaderNavbar(
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

        if (!headerNavbarRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HeaderNavbarDTO result = headerNavbarService.update(headerNavbarDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, headerNavbarDTO.getId().toString()))
            .body(result);
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
    public ResponseEntity<HeaderNavbarDTO> partialUpdateHeaderNavbar(
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

        if (!headerNavbarRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HeaderNavbarDTO> result = headerNavbarService.partialUpdate(headerNavbarDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, headerNavbarDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /header-navbars} : get all the headerNavbars.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of headerNavbars in body.
     */
    @GetMapping("/header-navbars")
    public ResponseEntity<List<HeaderNavbarDTO>> getAllHeaderNavbars(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of HeaderNavbars");
        Page<HeaderNavbarDTO> page = headerNavbarService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /header-navbars/:id} : get the "id" headerNavbar.
     *
     * @param id the id of the headerNavbarDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the headerNavbarDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/header-navbars/{id}")
    public ResponseEntity<HeaderNavbarDTO> getHeaderNavbar(@PathVariable Long id) {
        log.debug("REST request to get HeaderNavbar : {}", id);
        Optional<HeaderNavbarDTO> headerNavbarDTO = headerNavbarService.findOne(id);
        return ResponseUtil.wrapOrNotFound(headerNavbarDTO);
    }

    @GetMapping("/header-navbars/index")
    public ResponseEntity<List<HeaderNavbarIndexDTO>> getAllHeaderNavbarsIndex() {
        log.debug("REST request to get a page of HeaderNavbarIndexDTO");
        List<HeaderNavbarIndexDTO> res = headerNavbarRepository.findAllByParent(null).stream().map(e -> {
            HeaderNavbarIndexDTO  headerNavbarIndexDTO = new HeaderNavbarIndexDTO();
            headerNavbarIndexDTO.setId(e.getId());
            headerNavbarIndexDTO.setIndex(e.getIndex());
            headerNavbarIndexDTO.setName(e.getName());
            headerNavbarIndexDTO.setNameKo(e.getNameKo());
            headerNavbarIndexDTO.setLink(e.getLink());
            headerNavbarIndexDTO.setStatus(e.getStatus());

            List<HeaderNavbarDTO> headerNavbarDTOS = headerNavbarRepository.findAllByParent(e.getId()).stream().map(
                headerNavbarMapper::toDto
            ).collect(Collectors.toList());
            headerNavbarDTOS.sort(Comparator.comparing(HeaderNavbarDTO::getIndex));
            headerNavbarIndexDTO.setItems(headerNavbarDTOS);

            return headerNavbarIndexDTO;
        }).collect(Collectors.toList());
        res.sort(Comparator.comparing(HeaderNavbarIndexDTO::getIndex));
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/header-navbars/item")
    public ResponseEntity<List<HeaderNavbarIndexDTO>> getHeaderNavbarsIndexItem(@RequestParam String link) {
        log.debug("REST request to get a page of HeaderNavbarIndexDTO");
        List<HeaderNavbarIndexDTO> res = headerNavbarRepository.findAllByLink(link).stream().map(e -> {
            HeaderNavbarIndexDTO  headerNavbarIndexDTO = new HeaderNavbarIndexDTO();
            headerNavbarIndexDTO.setId(e.getId());
            headerNavbarIndexDTO.setIndex(e.getIndex());
            headerNavbarIndexDTO.setName(e.getName());
            headerNavbarIndexDTO.setNameKo(e.getNameKo());
            headerNavbarIndexDTO.setLink(e.getLink());
            headerNavbarIndexDTO.setStatus(e.getStatus());

            List<HeaderNavbarDTO> headerNavbarDTOS = headerNavbarRepository.findAllByParent(e.getId()).stream().map(
                headerNavbarMapper::toDto
            ).collect(Collectors.toList());
            headerNavbarDTOS.sort(Comparator.comparing(HeaderNavbarDTO::getIndex));
            headerNavbarIndexDTO.setItems(headerNavbarDTOS);

            return headerNavbarIndexDTO;
        }).collect(Collectors.toList());
        res.sort(Comparator.comparing(HeaderNavbarIndexDTO::getIndex));
        return ResponseEntity.ok().body(res);
    }

    /**
     * {@code DELETE  /header-navbars/:id} : delete the "id" headerNavbar.
     *
     * @param id the id of the headerNavbarDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/header-navbars/{id}")
    public ResponseEntity<Void> deleteHeaderNavbar(@PathVariable Long id) {
        log.debug("REST request to delete HeaderNavbar : {}", id);
        headerNavbarService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
