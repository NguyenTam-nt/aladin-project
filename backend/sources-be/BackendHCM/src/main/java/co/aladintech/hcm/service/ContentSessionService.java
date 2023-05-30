package co.aladintech.hcm.service;

import co.aladintech.hcm.service.dto.ContentSessionDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    ContentSessionDTO save(ContentSessionDTO contentSessionDTO);

    /**
     * Updates a contentSession.
     *
     * @param contentSessionDTO the entity to update.
     * @return the persisted entity.
     */
    ContentSessionDTO update(ContentSessionDTO contentSessionDTO);

    /**
     * Partially updates a contentSession.
     *
     * @param contentSessionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ContentSessionDTO> partialUpdate(ContentSessionDTO contentSessionDTO);

    /**
     * Get all the contentSessions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ContentSessionDTO> findAll(Pageable pageable);


    Page<ContentSessionDTO> findAllByCategory(String category, Pageable pageable);

    /**
     * Get the "id" contentSession.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ContentSessionDTO> findOne(Long id);

    /**
     * Delete the "id" contentSession.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
