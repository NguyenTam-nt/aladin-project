package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.History;
import co.aladintech.hcm.repository.HistoryRepository;
import co.aladintech.hcm.service.HistoryService;
import co.aladintech.hcm.service.dto.HistoryDTO;
import co.aladintech.hcm.service.mapper.HistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link History}.
 */
@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    private final Logger log = LoggerFactory.getLogger(HistoryServiceImpl.class);

    private final HistoryRepository historyRepository;

    private final HistoryMapper historyMapper;

    public HistoryServiceImpl(HistoryRepository historyRepository, HistoryMapper historyMapper) {
        this.historyRepository = historyRepository;
        this.historyMapper = historyMapper;
    }

    @Override
    public Mono<HistoryDTO> save(HistoryDTO historyDTO) {
        log.debug("Request to save History : {}", historyDTO);
        return historyRepository.save(historyMapper.toEntity(historyDTO)).map(historyMapper::toDto);
    }

    @Override
    public Mono<HistoryDTO> update(HistoryDTO historyDTO) {
        log.debug("Request to update History : {}", historyDTO);
        return historyRepository.save(historyMapper.toEntity(historyDTO)).map(historyMapper::toDto);
    }

    @Override
    public Mono<HistoryDTO> partialUpdate(HistoryDTO historyDTO) {
        log.debug("Request to partially update History : {}", historyDTO);

        return historyRepository
            .findById(historyDTO.getId())
            .map(existingHistory -> {
                historyMapper.partialUpdate(existingHistory, historyDTO);

                return existingHistory;
            })
            .flatMap(historyRepository::save)
            .map(historyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<HistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Histories");
        return historyRepository.findAllBy(pageable).map(historyMapper::toDto);
    }

    public Mono<Long> countAll() {
        return historyRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<HistoryDTO> findOne(Long id) {
        log.debug("Request to get History : {}", id);
        return historyRepository.findById(id).map(historyMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete History : {}", id);
        return historyRepository.deleteById(id);
    }
}
