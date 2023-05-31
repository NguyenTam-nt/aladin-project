package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.NewsCategory}.
 */
public interface NewsCategoryService {
    /**
     * Save a newsCategory.
     *
     * @param newsCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<NewsCategoryDTO> save(NewsCategoryDTO newsCategoryDTO);

    /**
     * Updates a newsCategory.
     *
     * @param newsCategoryDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<NewsCategoryDTO> update(NewsCategoryDTO newsCategoryDTO);

    /**
     * Partially updates a newsCategory.
     *
     * @param newsCategoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<NewsCategoryDTO> partialUpdate(NewsCategoryDTO newsCategoryDTO);

    /**
     * Get all the newsCategories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<NewsCategoryDTO> findAll(Pageable pageable);

    /**
     * Returns the number of newsCategories available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" newsCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<NewsCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" newsCategory.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
