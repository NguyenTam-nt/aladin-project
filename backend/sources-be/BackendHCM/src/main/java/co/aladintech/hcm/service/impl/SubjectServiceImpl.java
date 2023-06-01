package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.domain.Subject;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.repository.SubjectRepository;
import co.aladintech.hcm.service.SubjectService;
import co.aladintech.hcm.service.dto.SubjectDTO;
import co.aladintech.hcm.service.mapper.SubjectMapper;

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
 * Service Implementation for managing {@link Subject}.
 */
@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectServiceImpl.class);

    private final SubjectRepository subjectRepository;

    private final SubjectMapper subjectMapper;

    @Autowired
    private FilesRepository filesRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    @Override
    public SubjectDTO save(SubjectDTO subjectDTO) {
        log.debug("Request to save Subject : {}", subjectDTO);
        Subject subject = subjectMapper.toEntity(subjectDTO);
        subject = subjectRepository.save(subject);
        return subjectMapper.toDto(subject);
    }

    @Override
    public SubjectDTO update(SubjectDTO subjectDTO) {
        log.debug("Request to update Subject : {}", subjectDTO);
        Subject subject = subjectMapper.toEntity(subjectDTO);
        subject = subjectRepository.save(subject);
        return subjectMapper.toDto(subject);
    }

    @Override
    public Optional<SubjectDTO> partialUpdate(SubjectDTO subjectDTO) {
        log.debug("Request to partially update Subject : {}", subjectDTO);

        return subjectRepository
            .findById(subjectDTO.getId())
            .map(existingSubject -> {
                subjectMapper.partialUpdate(existingSubject, subjectDTO);

                return existingSubject;
            })
            .map(subjectRepository::save)
            .map(subjectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubjectDTO> findAll(String keyword, Pageable pageable) {
        log.debug("Request to get all Subjects");
        if(keyword == null ) keyword = "";
        keyword = "%"+ keyword + "%";
        return subjectRepository.findAllByNameIsLikeIgnoreCase(keyword, pageable).map(subjectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SubjectDTO> findOne(Long id) {
        log.debug("Request to get Subject : {}", id);
        return subjectRepository.findById(id).map(subjectMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subject : {}", id);
        subjectRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        log.debug("Request to delete Subject : {}", ids);
        subjectRepository.deleteAllById(ids);
    }
}
