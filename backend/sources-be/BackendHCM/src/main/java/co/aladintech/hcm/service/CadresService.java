package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.CadresDTO;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    CadresDTO save(CadresDTO cadresDTO);

    /**
     * Updates a cadres.
     *
     * @param cadresDTO the entity to update.
     * @return the persisted entity.
     */
    CadresDTO update(CadresDTO cadresDTO);

    /**
     * Partially updates a cadres.
     *
     * @param cadresDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CadresDTO> partialUpdate(CadresDTO cadresDTO);

    /**
     * Get all the cadres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CadresDTO> findAll(String keyword, Pageable pageable);

    /**
     * Get the "id" cadres.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CadresDTO> findOne(Long id);

    /**
     * Delete the "id" cadres.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    void deleteAll(List<Long> ids);
}
