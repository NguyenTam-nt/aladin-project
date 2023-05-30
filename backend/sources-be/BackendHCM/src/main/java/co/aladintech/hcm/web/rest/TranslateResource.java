package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.BannerRepository;
import co.aladintech.hcm.service.BannerService;
import co.aladintech.hcm.service.GoogleTranslate;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.service.dto.TranslateDTO;
import co.aladintech.hcm.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link co.aladintech.hcm.domain.Banner}.
 */
@RestController
@RequestMapping("/api")
public class TranslateResource {

    private final Logger log = LoggerFactory.getLogger(TranslateResource.class);

    private static final String ENTITY_NAME = "backendHcmBanner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;



    public TranslateResource() {
    }

    @PostMapping("/translate")
    public ResponseEntity<?> translate(@Valid @RequestBody TranslateDTO translateDTO) throws URISyntaxException, IOException {
        log.debug("REST request to translate : {}", translateDTO);

        return ResponseEntity.ok(GoogleTranslate.translateKo(translateDTO.getContent()));
    }

}
