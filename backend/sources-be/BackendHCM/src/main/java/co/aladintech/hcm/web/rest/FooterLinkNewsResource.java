package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.domain.FooterInfo;
import co.aladintech.hcm.domain.FooterLinkNews;
import co.aladintech.hcm.domain.FooterLinkNewsItem;
import co.aladintech.hcm.repository.FooterInfoRepository;
import co.aladintech.hcm.repository.FooterLinkNewsItemRepository;
import co.aladintech.hcm.repository.FooterLinkNewsRepository;
import co.aladintech.hcm.service.dto.FooterLinkNewsDTO;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FooterLinkNewsResource {

    private final Logger log = LoggerFactory.getLogger(FooterLinkNewsResource.class);

    private static final String ENTITY_NAME = "backendHcmBanner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private FooterLinkNewsRepository footerLinkNewsRepository;

    @Autowired
    private FooterLinkNewsItemRepository footerLinkNewsItemRepository;

    @GetMapping("/footer-link-news")
    public ResponseEntity<List<FooterLinkNewsDTO>> getAll() {
        log.debug("REST request to get a page of gooter-info");
        List<FooterLinkNewsDTO> res = footerLinkNewsRepository.findAll().stream().map(e -> {
            FooterLinkNewsDTO footerLinkNewsDTO = new FooterLinkNewsDTO();
            footerLinkNewsDTO.setId(e.getId());
            footerLinkNewsDTO.setName(e.getName());
            footerLinkNewsDTO.setNameKo(e.getNameKo());
            footerLinkNewsDTO.setStatus(e.getStatus());

            List<FooterLinkNewsItem> footerLinkNewsItems = footerLinkNewsItemRepository.findAllByParentId(e.getId());
            footerLinkNewsDTO.setItems(footerLinkNewsItems);
            return footerLinkNewsDTO;
        }).collect(Collectors.toList());
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/footer-link-news")
    public ResponseEntity<FooterLinkNews> footerInfo(@Valid @RequestBody FooterLinkNews footerLinkNews) throws URISyntaxException {
        log.debug("REST request to save footerLinkNews : {}", footerLinkNews);
        if (footerLinkNews.getId() != null) {
            throw new BadRequestAlertException("A new footerInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FooterLinkNews result = footerLinkNewsRepository.save(footerLinkNews);
        return ResponseEntity
            .created(new URI("/api/footer-link-news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/footer-link-news/{id}")
    public ResponseEntity<FooterLinkNews> putFooterInfo(

        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FooterLinkNews footerLinkNews) throws URISyntaxException {
        log.debug("REST request to update footerInfo : {}, {}", id, footerLinkNews);
        if (footerLinkNews.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, footerLinkNews.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!footerLinkNewsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        FooterLinkNews result = footerLinkNewsRepository.save(footerLinkNews);
        return ResponseEntity
            .ok().body(result);
    }

    @PutMapping("/footer-link-news/change-item/{id}")
    public ResponseEntity<List<FooterLinkNewsItem>> changeItemFooterInfoBanner(

        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody List<FooterLinkNewsItem> footerLinkNewsItemList) throws URISyntaxException {
        log.debug("REST request to change item footerLinkNewsItemList : {}, {}", id, footerLinkNewsItemList);
        if (!footerLinkNewsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        footerLinkNewsItemRepository.deleteAllByParentId(id);

        List<FooterLinkNewsItem> result = footerLinkNewsItemRepository.saveAll(footerLinkNewsItemList);
        return ResponseEntity
            .ok().body(result);
    }

}
