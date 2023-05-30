package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.HeaderNavbar;
import co.aladintech.hcm.repository.HeaderNavbarRepository;
import co.aladintech.hcm.service.HeaderNavbarService;
import co.aladintech.hcm.service.dto.HeaderNavbarDTO;
import co.aladintech.hcm.service.mapper.HeaderNavbarMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link HeaderNavbar}.
 */
@Service
@Transactional
public class HeaderNavbarServiceImpl implements HeaderNavbarService {

    private final Logger log = LoggerFactory.getLogger(HeaderNavbarServiceImpl.class);

    private final HeaderNavbarRepository headerNavbarRepository;

    private final HeaderNavbarMapper headerNavbarMapper;

    public HeaderNavbarServiceImpl(HeaderNavbarRepository headerNavbarRepository, HeaderNavbarMapper headerNavbarMapper) {
        this.headerNavbarRepository = headerNavbarRepository;
        this.headerNavbarMapper = headerNavbarMapper;
    }

    @Override
    public Mono<HeaderNavbarDTO> save(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to save HeaderNavbar : {}", headerNavbarDTO);
        return headerNavbarRepository.save(headerNavbarMapper.toEntity(headerNavbarDTO)).map(headerNavbarMapper::toDto);
    }

    @Override
    public Mono<HeaderNavbarDTO> update(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to update HeaderNavbar : {}", headerNavbarDTO);
        return headerNavbarRepository.save(headerNavbarMapper.toEntity(headerNavbarDTO)).map(headerNavbarMapper::toDto);
    }

    @Override
    public Mono<HeaderNavbarDTO> partialUpdate(HeaderNavbarDTO headerNavbarDTO) {
        log.debug("Request to partially update HeaderNavbar : {}", headerNavbarDTO);

        return headerNavbarRepository
            .findById(headerNavbarDTO.getId())
            .map(existingHeaderNavbar -> {
                headerNavbarMapper.partialUpdate(existingHeaderNavbar, headerNavbarDTO);

                return existingHeaderNavbar;
            })
            .flatMap(headerNavbarRepository::save)
            .map(headerNavbarMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<HeaderNavbarDTO> findAll(Pageable pageable) {
        log.debug("Request to get all HeaderNavbars");
        return headerNavbarRepository.findAllBy(pageable).map(headerNavbarMapper::toDto);
    }

    public Mono<Long> countAll() {
        return headerNavbarRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<HeaderNavbarDTO> findOne(Long id) {
        log.debug("Request to get HeaderNavbar : {}", id);
        return headerNavbarRepository.findById(id).map(headerNavbarMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete HeaderNavbar : {}", id);
        return headerNavbarRepository.deleteById(id);
    }
}
