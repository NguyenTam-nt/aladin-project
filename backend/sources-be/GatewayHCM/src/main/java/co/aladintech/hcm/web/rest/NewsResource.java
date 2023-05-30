package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.repository.NewsRepository;
import co.aladintech.hcm.service.NewsService;
import co.aladintech.hcm.service.dto.NewsDTO;
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
 * REST controller for managing {@link co.aladintech.hcm.domain.News}.
 */
@RestController
@RequestMapping("/api")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    private static final String ENTITY_NAME = "news";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsService newsService;

    private final NewsRepository newsRepository;

    public NewsResource(NewsService newsService, NewsRepository newsRepository) {
        this.newsService = newsService;
        this.newsRepository = newsRepository;
    }

    /**
     * {@code POST  /news} : Create a new news.
     *
     * @param newsDTO the newsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new newsDTO, or with status {@code 400 (Bad Request)} if the news has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news")
    public Mono<ResponseEntity<NewsDTO>> createNews(@Valid @RequestBody NewsDTO newsDTO) throws URISyntaxException {
        log.debug("REST request to save News : {}", newsDTO);
        if (newsDTO.getId() != null) {
            throw new BadRequestAlertException("A new news cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return newsService
            .save(newsDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/news/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /news/:id} : Updates an existing news.
     *
     * @param id the id of the newsDTO to save.
     * @param newsDTO the newsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsDTO,
     * or with status {@code 400 (Bad Request)} if the newsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the newsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news/{id}")
    public Mono<ResponseEntity<NewsDTO>> updateNews(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NewsDTO newsDTO
    ) throws URISyntaxException {
        log.debug("REST request to update News : {}, {}", id, newsDTO);
        if (newsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return newsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return newsService
                    .update(newsDTO)
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
     * {@code PATCH  /news/:id} : Partial updates given fields of an existing news, field will ignore if it is null
     *
     * @param id the id of the newsDTO to save.
     * @param newsDTO the newsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsDTO,
     * or with status {@code 400 (Bad Request)} if the newsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the newsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the newsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/news/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<NewsDTO>> partialUpdateNews(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NewsDTO newsDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update News partially : {}, {}", id, newsDTO);
        if (newsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return newsRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<NewsDTO> result = newsService.partialUpdate(newsDTO);

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
     * {@code GET  /news} : get all the news.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of news in body.
     */
    @GetMapping("/news")
    public Mono<ResponseEntity<List<NewsDTO>>> getAllNews(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of News");
        return newsService
            .countAll()
            .zipWith(newsService.findAll(pageable).collectList())
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
     * {@code GET  /news/:id} : get the "id" news.
     *
     * @param id the id of the newsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the newsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news/{id}")
    public Mono<ResponseEntity<NewsDTO>> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        Mono<NewsDTO> newsDTO = newsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    /**
     * {@code DELETE  /news/:id} : delete the "id" news.
     *
     * @param id the id of the newsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news/{id}")
    public Mono<ResponseEntity<Void>> deleteNews(@PathVariable Long id) {
        log.debug("REST request to delete News : {}", id);
        return newsService
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
