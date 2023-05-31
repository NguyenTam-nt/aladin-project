package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.HistoryDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.History}.
 */
public interface HistoryService {
    /**
     * Save a history.
     *
     * @param historyDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<HistoryDTO> save(HistoryDTO historyDTO);

    /**
     * Updates a history.
     *
     * @param historyDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<HistoryDTO> update(HistoryDTO historyDTO);

    /**
     * Partially updates a history.
     *
     * @param historyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<HistoryDTO> partialUpdate(HistoryDTO historyDTO);

    /**
     * Get all the histories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<HistoryDTO> findAll(Pageable pageable);

    /**
     * Returns the number of histories available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" history.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<HistoryDTO> findOne(Long id);

    /**
     * Delete the "id" history.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
