package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.domain.FooterInfo;
import co.aladintech.hcm.repository.FooterInfoRepository;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class FooterInfoResource {

    private final Logger log = LoggerFactory.getLogger(FooterInfoResource.class);

    private static final String ENTITY_NAME = "backendHcmBanner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private FooterInfoRepository footerInfoRepository;

    @GetMapping("/footer-info")
    public ResponseEntity<List<FooterInfo>> getAll(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of gooter-info");
        Page<FooterInfo> page = footerInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @PostMapping("/footer-info")
    public ResponseEntity<FooterInfo> footerInfo(@Valid @RequestBody FooterInfo footerInfo) throws URISyntaxException {
        log.debug("REST request to save footerInfo : {}", footerInfo);
        if (footerInfo.getId() != null) {
            throw new BadRequestAlertException("A new footerInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FooterInfo result = footerInfoRepository.save(footerInfo);
        return ResponseEntity
            .created(new URI("/api/footer-info/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/footer-info/{id}")
    public ResponseEntity<FooterInfo> putFooterInfo(

        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FooterInfo footerInfo) throws URISyntaxException {
        log.debug("REST request to update footerInfo : {}, {}", id, footerInfo);
        if (footerInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, footerInfo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!footerInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        FooterInfo result = footerInfoRepository.save(footerInfo);
        return ResponseEntity
            .ok().body(result);
    }


}
