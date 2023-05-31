package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.CadresCategory}.
 */
public interface CadresCategoryService {
    /**
     * Save a cadresCategory.
     *
     * @param cadresCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    CadresCategoryDTO save(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Updates a cadresCategory.
     *
     * @param cadresCategoryDTO the entity to update.
     * @return the persisted entity.
     */
    CadresCategoryDTO update(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Partially updates a cadresCategory.
     *
     * @param cadresCategoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CadresCategoryDTO> partialUpdate(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Get all the cadresCategories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CadresCategoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cadresCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CadresCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" cadresCategory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
