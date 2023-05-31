package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.NewsDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.News}.
 */
public interface NewsService {
    /**
     * Save a news.
     *
     * @param newsDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<NewsDTO> save(NewsDTO newsDTO);

    /**
     * Updates a news.
     *
     * @param newsDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<NewsDTO> update(NewsDTO newsDTO);

    /**
     * Partially updates a news.
     *
     * @param newsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<NewsDTO> partialUpdate(NewsDTO newsDTO);

    /**
     * Get all the news.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<NewsDTO> findAll(Pageable pageable);

    /**
     * Returns the number of news available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" news.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<NewsDTO> findOne(Long id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
