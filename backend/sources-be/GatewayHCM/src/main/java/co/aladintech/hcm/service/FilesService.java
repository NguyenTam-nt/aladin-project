package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.FilesDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    Mono<FilesDTO> save(FilesDTO filesDTO);

    /**
     * Updates a files.
     *
     * @param filesDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<FilesDTO> update(FilesDTO filesDTO);

    /**
     * Partially updates a files.
     *
     * @param filesDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<FilesDTO> partialUpdate(FilesDTO filesDTO);

    /**
     * Get all the files.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<FilesDTO> findAll(Pageable pageable);

    /**
     * Returns the number of files available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" files.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<FilesDTO> findOne(Long id);

    /**
     * Delete the "id" files.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
