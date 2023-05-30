package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.FilesDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.aladintech.hcm.domain.Files}.
 */
public interface FilesService {
    /**
     * Save a files.
     *
     * @param filesDTO the entity to save.
     * @return the persisted entity.
     */
    FilesDTO save(FilesDTO filesDTO);

    /**
     * Updates a files.
     *
     * @param filesDTO the entity to update.
     * @return the persisted entity.
     */
    FilesDTO update(FilesDTO filesDTO);

    /**
     * Partially updates a files.
     *
     * @param filesDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FilesDTO> partialUpdate(FilesDTO filesDTO);

    /**
     * Get all the files.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FilesDTO> findAll(Pageable pageable);

    /**
     * Get the "id" files.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FilesDTO> findOne(Long id);

    /**
     * Delete the "id" files.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
