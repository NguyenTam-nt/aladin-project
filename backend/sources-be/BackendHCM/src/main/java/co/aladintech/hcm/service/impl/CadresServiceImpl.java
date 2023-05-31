package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.repository.CadresRepository;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.service.CadresService;
import co.aladintech.hcm.service.dto.CadresDTO;
import co.aladintech.hcm.service.mapper.CadresMapper;

import java.util.List;
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
 * Service Implementation for managing {@link Cadres}.
 */
@Service
@Transactional
public class CadresServiceImpl implements CadresService {

    private final Logger log = LoggerFactory.getLogger(CadresServiceImpl.class);

    private final CadresRepository cadresRepository;

    private final CadresMapper cadresMapper;

    @Autowired
    private FilesRepository filesRepository;

    public CadresServiceImpl(CadresRepository cadresRepository, CadresMapper cadresMapper) {
        this.cadresRepository = cadresRepository;
        this.cadresMapper = cadresMapper;
    }

    @Override
    public CadresDTO save(CadresDTO cadresDTO) {
        log.debug("Request to save Cadres : {}", cadresDTO);
        Cadres cadres = cadresMapper.toEntity(cadresDTO);
        cadres = cadresRepository.save(cadres);
        return cadresMapper.toDto(cadres);
    }

    @Override
    public CadresDTO update(CadresDTO cadresDTO) {
        log.debug("Request to update Cadres : {}", cadresDTO);
        Cadres cadres = cadresMapper.toEntity(cadresDTO);
        cadres = cadresRepository.save(cadres);
        return cadresMapper.toDto(cadres);
    }

    @Override
    public Optional<CadresDTO> partialUpdate(CadresDTO cadresDTO) {
        log.debug("Request to partially update Cadres : {}", cadresDTO);

        return cadresRepository
            .findById(cadresDTO.getId())
            .map(existingCadres -> {
                cadresMapper.partialUpdate(existingCadres, cadresDTO);

                return existingCadres;
            })
            .map(cadresRepository::save)
            .map(cadresMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CadresDTO> findAll(String keyword, Pageable pageable) {
        log.debug("Request to get all Cadres");
        if(keyword == null ) keyword = "";
        keyword = "%"+ keyword + "%";
        return cadresRepository.findAllByTitleIsLikeIgnoreCase(keyword, pageable).map(cadresMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CadresDTO> findOne(Long id) {
        log.debug("Request to get Cadres : {}", id);
        return cadresRepository.findById(id).map(cadresMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cadres : {}", id);
        cadresRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        log.debug("Request to delete Cadres : {}", ids);
        cadresRepository.deleteAllById(ids);
    }
}
