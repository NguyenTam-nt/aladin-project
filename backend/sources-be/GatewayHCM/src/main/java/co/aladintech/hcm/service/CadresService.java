package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.CadresDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.Cadres}.
 */
public interface CadresService {
    /**
     * Save a cadres.
     *
     * @param cadresDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<CadresDTO> save(CadresDTO cadresDTO);

    /**
     * Updates a cadres.
     *
     * @param cadresDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<CadresDTO> update(CadresDTO cadresDTO);

    /**
     * Partially updates a cadres.
     *
     * @param cadresDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<CadresDTO> partialUpdate(CadresDTO cadresDTO);

    /**
     * Get all the cadres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CadresDTO> findAll(Pageable pageable);

    /**
     * Returns the number of cadres available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" cadres.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<CadresDTO> findOne(Long id);

    /**
     * Delete the "id" cadres.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
