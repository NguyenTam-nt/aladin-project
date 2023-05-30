package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.HeaderNavbar}.
 */
public interface HeaderNavbarService {
    /**
     * Save a headerNavbar.
     *
     * @param headerNavbarDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<HeaderNavbarDTO> save(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Updates a headerNavbar.
     *
     * @param headerNavbarDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<HeaderNavbarDTO> update(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Partially updates a headerNavbar.
     *
     * @param headerNavbarDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<HeaderNavbarDTO> partialUpdate(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Get all the headerNavbars.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<HeaderNavbarDTO> findAll(Pageable pageable);

    /**
     * Returns the number of headerNavbars available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" headerNavbar.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<HeaderNavbarDTO> findOne(Long id);

    /**
     * Delete the "id" headerNavbar.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
