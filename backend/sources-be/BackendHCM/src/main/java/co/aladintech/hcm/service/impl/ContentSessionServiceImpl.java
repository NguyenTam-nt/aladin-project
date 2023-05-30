package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.ContentSession;
import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.repository.ContentSessionRepository;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.service.ContentSessionService;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
import co.aladintech.hcm.service.mapper.ContentSessionMapper;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ContentSession}.
 */
@Service
@Transactional
public class ContentSessionServiceImpl implements ContentSessionService {

    private final Logger log = LoggerFactory.getLogger(ContentSessionServiceImpl.class);

    private final ContentSessionRepository contentSessionRepository;

    private final ContentSessionMapper contentSessionMapper;

    @Autowired
    private FilesRepository filesRepository;

    public ContentSessionServiceImpl(ContentSessionRepository contentSessionRepository, ContentSessionMapper contentSessionMapper) {
        this.contentSessionRepository = contentSessionRepository;
        this.contentSessionMapper = contentSessionMapper;
    }

    @Override
    public ContentSessionDTO save(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to save ContentSession : {}", contentSessionDTO);
        ContentSession contentSession = contentSessionMapper.toEntity(contentSessionDTO);
        contentSession = contentSessionRepository.save(contentSession);
        return contentSessionMapper.toDto(contentSession);
    }

    @Override
    public ContentSessionDTO update(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to update ContentSession : {}", contentSessionDTO);
        ContentSession contentSession = contentSessionMapper.toEntity(contentSessionDTO);
        contentSession = contentSessionRepository.save(contentSession);
        return contentSessionMapper.toDto(contentSession);
    }

    @Override
    public Optional<ContentSessionDTO> partialUpdate(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to partially update ContentSession : {}", contentSessionDTO);

        return contentSessionRepository
            .findById(contentSessionDTO.getId())
            .map(existingContentSession -> {
                contentSessionMapper.partialUpdate(existingContentSession, contentSessionDTO);

                return existingContentSession;
            })
            .map(contentSessionRepository::save)
            .map(contentSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContentSessionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContentSessions");
        return contentSessionRepository.findAll(pageable).map(contentSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContentSessionDTO> findAllByCategory(String category, Pageable pageable) {
        log.debug("Request to get all ContentSessions");
        return contentSessionRepository.findAllByCategory(category, pageable).map(contentSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContentSessionDTO> findOne(Long id) {
        log.debug("Request to get ContentSession : {}", id);
        return contentSessionRepository.findById(id).map(contentSessionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContentSession : {}", id);
        contentSessionRepository.deleteById(id);
    }
}
