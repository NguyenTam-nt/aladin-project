package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.ViewPageDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.ViewPage}.
 */
public interface ViewPageService {
    /**
     * Save a viewPage.
     *
     * @param viewPageDTO the entity to save.
     * @return the persisted entity.
     */
    ViewPageDTO save(ViewPageDTO viewPageDTO);

    /**
     * Updates a viewPage.
     *
     * @param viewPageDTO the entity to update.
     * @return the persisted entity.
     */
    ViewPageDTO update(ViewPageDTO viewPageDTO);

    /**
     * Partially updates a viewPage.
     *
     * @param viewPageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ViewPageDTO> partialUpdate(ViewPageDTO viewPageDTO);

    /**
     * Get all the viewPages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ViewPageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" viewPage.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ViewPageDTO> findOne(Long id);

    /**
     * Delete the "id" viewPage.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
