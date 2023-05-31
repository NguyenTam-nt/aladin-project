package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.repository.CadresCategoryRepository;
import co.aladintech.hcm.service.CadresCategoryService;
import co.aladintech.hcm.service.dto.CadresCategoryDTO;
import co.aladintech.hcm.service.mapper.CadresCategoryMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public CadresCategoryDTO save(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to save CadresCategory : {}", cadresCategoryDTO);
        CadresCategory cadresCategory = cadresCategoryMapper.toEntity(cadresCategoryDTO);
        cadresCategory = cadresCategoryRepository.save(cadresCategory);
        return cadresCategoryMapper.toDto(cadresCategory);
    }

    @Override
    public CadresCategoryDTO update(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to update CadresCategory : {}", cadresCategoryDTO);
        CadresCategory cadresCategory = cadresCategoryMapper.toEntity(cadresCategoryDTO);
        cadresCategory = cadresCategoryRepository.save(cadresCategory);
        return cadresCategoryMapper.toDto(cadresCategory);
    }

    @Override
    public Optional<CadresCategoryDTO> partialUpdate(CadresCategoryDTO cadresCategoryDTO) {
        log.debug("Request to partially update CadresCategory : {}", cadresCategoryDTO);

        return cadresCategoryRepository
            .findById(cadresCategoryDTO.getId())
            .map(existingCadresCategory -> {
                cadresCategoryMapper.partialUpdate(existingCadresCategory, cadresCategoryDTO);

                return existingCadresCategory;
            })
            .map(cadresCategoryRepository::save)
            .map(cadresCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CadresCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CadresCategories");
        return cadresCategoryRepository.findAll(pageable).map(cadresCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CadresCategoryDTO> findOne(Long id) {
        log.debug("Request to get CadresCategory : {}", id);
        return cadresCategoryRepository.findById(id).map(cadresCategoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CadresCategory : {}", id);
        cadresCategoryRepository.deleteById(id);
    }
}
