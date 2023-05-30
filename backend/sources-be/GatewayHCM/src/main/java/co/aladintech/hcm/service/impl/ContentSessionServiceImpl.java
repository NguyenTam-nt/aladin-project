package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.ContentSession;
import co.aladintech.hcm.repository.ContentSessionRepository;
import co.aladintech.hcm.service.ContentSessionService;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
import co.aladintech.hcm.service.mapper.ContentSessionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ContentSession}.
 */
@Service
@Transactional
public class ContentSessionServiceImpl implements ContentSessionService {

    private final Logger log = LoggerFactory.getLogger(ContentSessionServiceImpl.class);

    private final ContentSessionRepository contentSessionRepository;

    private final ContentSessionMapper contentSessionMapper;

    public ContentSessionServiceImpl(ContentSessionRepository contentSessionRepository, ContentSessionMapper contentSessionMapper) {
        this.contentSessionRepository = contentSessionRepository;
        this.contentSessionMapper = contentSessionMapper;
    }

    @Override
    public Mono<ContentSessionDTO> save(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to save ContentSession : {}", contentSessionDTO);
        return contentSessionRepository.save(contentSessionMapper.toEntity(contentSessionDTO)).map(contentSessionMapper::toDto);
    }

    @Override
    public Mono<ContentSessionDTO> update(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to update ContentSession : {}", contentSessionDTO);
        return contentSessionRepository.save(contentSessionMapper.toEntity(contentSessionDTO)).map(contentSessionMapper::toDto);
    }

    @Override
    public Mono<ContentSessionDTO> partialUpdate(ContentSessionDTO contentSessionDTO) {
        log.debug("Request to partially update ContentSession : {}", contentSessionDTO);

        return contentSessionRepository
            .findById(contentSessionDTO.getId())
            .map(existingContentSession -> {
                contentSessionMapper.partialUpdate(existingContentSession, contentSessionDTO);

                return existingContentSession;
            })
            .flatMap(contentSessionRepository::save)
            .map(contentSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ContentSessionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContentSessions");
        return contentSessionRepository.findAllBy(pageable).map(contentSessionMapper::toDto);
    }

    public Mono<Long> countAll() {
        return contentSessionRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ContentSessionDTO> findOne(Long id) {
        log.debug("Request to get ContentSession : {}", id);
        return contentSessionRepository.findById(id).map(contentSessionMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ContentSession : {}", id);
        return contentSessionRepository.deleteById(id);
    }
}
