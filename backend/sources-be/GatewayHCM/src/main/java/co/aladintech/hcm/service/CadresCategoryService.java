package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    Mono<CadresCategoryDTO> save(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Updates a cadresCategory.
     *
     * @param cadresCategoryDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<CadresCategoryDTO> update(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Partially updates a cadresCategory.
     *
     * @param cadresCategoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<CadresCategoryDTO> partialUpdate(CadresCategoryDTO cadresCategoryDTO);

    /**
     * Get all the cadresCategories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CadresCategoryDTO> findAll(Pageable pageable);

    /**
     * Returns the number of cadresCategories available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" cadresCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<CadresCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" cadresCategory.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
