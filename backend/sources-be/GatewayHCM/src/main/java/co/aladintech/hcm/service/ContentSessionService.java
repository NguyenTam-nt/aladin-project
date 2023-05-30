package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.ContentSessionDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.ContentSession}.
 */
public interface ContentSessionService {
    /**
     * Save a contentSession.
     *
     * @param contentSessionDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ContentSessionDTO> save(ContentSessionDTO contentSessionDTO);

    /**
     * Updates a contentSession.
     *
     * @param contentSessionDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ContentSessionDTO> update(ContentSessionDTO contentSessionDTO);

    /**
     * Partially updates a contentSession.
     *
     * @param contentSessionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ContentSessionDTO> partialUpdate(ContentSessionDTO contentSessionDTO);

    /**
     * Get all the contentSessions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ContentSessionDTO> findAll(Pageable pageable);

    /**
     * Returns the number of contentSessions available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" contentSession.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ContentSessionDTO> findOne(Long id);

    /**
     * Delete the "id" contentSession.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
