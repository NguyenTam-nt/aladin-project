package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Subject;
import co.aladintech.hcm.repository.SubjectRepository;
import co.aladintech.hcm.service.SubjectService;
import co.aladintech.hcm.service.dto.SubjectDTO;
import co.aladintech.hcm.service.mapper.SubjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Subject}.
 */
@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectServiceImpl.class);

    private final SubjectRepository subjectRepository;

    private final SubjectMapper subjectMapper;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    @Override
    public Mono<SubjectDTO> save(SubjectDTO subjectDTO) {
        log.debug("Request to save Subject : {}", subjectDTO);
        return subjectRepository.save(subjectMapper.toEntity(subjectDTO)).map(subjectMapper::toDto);
    }

    @Override
    public Mono<SubjectDTO> update(SubjectDTO subjectDTO) {
        log.debug("Request to update Subject : {}", subjectDTO);
        return subjectRepository.save(subjectMapper.toEntity(subjectDTO)).map(subjectMapper::toDto);
    }

    @Override
    public Mono<SubjectDTO> partialUpdate(SubjectDTO subjectDTO) {
        log.debug("Request to partially update Subject : {}", subjectDTO);

        return subjectRepository
            .findById(subjectDTO.getId())
            .map(existingSubject -> {
                subjectMapper.partialUpdate(existingSubject, subjectDTO);

                return existingSubject;
            })
            .flatMap(subjectRepository::save)
            .map(subjectMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<SubjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Subjects");
        return subjectRepository.findAllBy(pageable).map(subjectMapper::toDto);
    }

    public Mono<Long> countAll() {
        return subjectRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<SubjectDTO> findOne(Long id) {
        log.debug("Request to get Subject : {}", id);
        return subjectRepository.findById(id).map(subjectMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Subject : {}", id);
        return subjectRepository.deleteById(id);
    }
}
