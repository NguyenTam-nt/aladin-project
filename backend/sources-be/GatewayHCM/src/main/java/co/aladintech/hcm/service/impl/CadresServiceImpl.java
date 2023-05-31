package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.repository.CadresRepository;
import co.aladintech.hcm.service.CadresService;
import co.aladintech.hcm.service.dto.CadresDTO;
import co.aladintech.hcm.service.mapper.CadresMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Cadres}.
 */
@Service
@Transactional
public class CadresServiceImpl implements CadresService {

    private final Logger log = LoggerFactory.getLogger(CadresServiceImpl.class);

    private final CadresRepository cadresRepository;

    private final CadresMapper cadresMapper;

    public CadresServiceImpl(CadresRepository cadresRepository, CadresMapper cadresMapper) {
        this.cadresRepository = cadresRepository;
        this.cadresMapper = cadresMapper;
    }

    @Override
    public Mono<CadresDTO> save(CadresDTO cadresDTO) {
        log.debug("Request to save Cadres : {}", cadresDTO);
        return cadresRepository.save(cadresMapper.toEntity(cadresDTO)).map(cadresMapper::toDto);
    }

    @Override
    public Mono<CadresDTO> update(CadresDTO cadresDTO) {
        log.debug("Request to update Cadres : {}", cadresDTO);
        return cadresRepository.save(cadresMapper.toEntity(cadresDTO)).map(cadresMapper::toDto);
    }

    @Override
    public Mono<CadresDTO> partialUpdate(CadresDTO cadresDTO) {
        log.debug("Request to partially update Cadres : {}", cadresDTO);

        return cadresRepository
            .findById(cadresDTO.getId())
            .map(existingCadres -> {
                cadresMapper.partialUpdate(existingCadres, cadresDTO);

                return existingCadres;
            })
            .flatMap(cadresRepository::save)
            .map(cadresMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CadresDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cadres");
        return cadresRepository.findAllBy(pageable).map(cadresMapper::toDto);
    }

    public Mono<Long> countAll() {
        return cadresRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CadresDTO> findOne(Long id) {
        log.debug("Request to get Cadres : {}", id);
        return cadresRepository.findById(id).map(cadresMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Cadres : {}", id);
        return cadresRepository.deleteById(id);
    }
}
