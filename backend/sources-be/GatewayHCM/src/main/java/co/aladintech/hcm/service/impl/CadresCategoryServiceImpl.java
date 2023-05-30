package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.repository.CadresCategoryRepository;
import co.aladintech.hcm.service.CadresCategoryService;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import co.aladintech.hcm.service.mapper.CadresCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link CadresCategory}.
 */
@Service
@Transactional
public class CadresCategoryServiceImpl implements CadresCategoryService {

    private final Logger log = LoggerFactory.getLogger(CadresCategoryServiceImpl.class);

    private final CadresCategoryRepository cadresCategoryRepository;

    private final CadresCategoryMapper cadresCategoryMapper;

    public CadresCategoryServiceImpl(CadresCategoryRepository cadresCategoryRepository, CadresCategoryMapper cadresCategoryMapper) {
        this.cadresCategoryRepository = cadresCategoryRepository;
        this.cadresCategoryMapper = cadresCategoryMapper;
    }

    @Override
    public Mono<CadresCategoryDTO> save(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to save CadresCategory : {}", cadresCategoryDTO);
        return cadresCategoryRepository.save(cadresCategoryMapper.toEntity(cadresCategoryDTO)).map(cadresCategoryMapper::toDto);
    }

    @Override
    public Mono<CadresCategoryDTO> update(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to update CadresCategory : {}", cadresCategoryDTO);
        return cadresCategoryRepository.save(cadresCategoryMapper.toEntity(cadresCategoryDTO)).map(cadresCategoryMapper::toDto);
    }

    @Override
    public Mono<CadresCategoryDTO> partialUpdate(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to partially update CadresCategory : {}", cadresCategoryDTO);

        return cadresCategoryRepository
            .findById(cadresCategoryDTO.getId())
            .map(existingCadresCategory -> {
                cadresCategoryMapper.partialUpdate(existingCadresCategory, cadresCategoryDTO);

                return existingCadresCategory;
            })
            .flatMap(cadresCategoryRepository::save)
            .map(cadresCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CadresCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CadresCategories");
        return cadresCategoryRepository.findAllBy(pageable).map(cadresCategoryMapper::toDto);
    }

    public Mono<Long> countAll() {
        return cadresCategoryRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CadresCategoryDTO> findOne(Long id) {
        log.debug("Request to get CadresCategory : {}", id);
        return cadresCategoryRepository.findById(id).map(cadresCategoryMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete CadresCategory : {}", id);
        return cadresCategoryRepository.deleteById(id);
    }
}
