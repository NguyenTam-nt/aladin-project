package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    HeaderNavbarDTO save(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Updates a headerNavbar.
     *
     * @param headerNavbarDTO the entity to update.
     * @return the persisted entity.
     */
    HeaderNavbarDTO update(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Partially updates a headerNavbar.
     *
     * @param headerNavbarDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<HeaderNavbarDTO> partialUpdate(HeaderNavbarDTO headerNavbarDTO);

    /**
     * Get all the headerNavbars.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HeaderNavbarDTO> findAll(Pageable pageable);

    /**
     * Get the "id" headerNavbar.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HeaderNavbarDTO> findOne(Long id);

    /**
     * Delete the "id" headerNavbar.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
