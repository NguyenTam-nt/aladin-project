package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.repository.NewsCategoryRepository;
import co.aladintech.hcm.service.NewsCategoryService;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.mapper.NewsCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link NewsCategory}.
 */
@Service
@Transactional
public class NewsCategoryServiceImpl implements NewsCategoryService {

    private final Logger log = LoggerFactory.getLogger(NewsCategoryServiceImpl.class);

    private final NewsCategoryRepository newsCategoryRepository;

    private final NewsCategoryMapper newsCategoryMapper;

    public NewsCategoryServiceImpl(NewsCategoryRepository newsCategoryRepository, NewsCategoryMapper newsCategoryMapper) {
        this.newsCategoryRepository = newsCategoryRepository;
        this.newsCategoryMapper = newsCategoryMapper;
    }

    @Override
    public Mono<NewsCategoryDTO> save(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to save NewsCategory : {}", newsCategoryDTO);
        return newsCategoryRepository.save(newsCategoryMapper.toEntity(newsCategoryDTO)).map(newsCategoryMapper::toDto);
    }

    @Override
    public Mono<NewsCategoryDTO> update(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to update NewsCategory : {}", newsCategoryDTO);
        return newsCategoryRepository.save(newsCategoryMapper.toEntity(newsCategoryDTO)).map(newsCategoryMapper::toDto);
    }

    @Override
    public Mono<NewsCategoryDTO> partialUpdate(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to partially update NewsCategory : {}", newsCategoryDTO);

        return newsCategoryRepository
            .findById(newsCategoryDTO.getId())
            .map(existingNewsCategory -> {
                newsCategoryMapper.partialUpdate(existingNewsCategory, newsCategoryDTO);

                return existingNewsCategory;
            })
            .flatMap(newsCategoryRepository::save)
            .map(newsCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<NewsCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all NewsCategories");
        return newsCategoryRepository.findAllBy(pageable).map(newsCategoryMapper::toDto);
    }

    public Mono<Long> countAll() {
        return newsCategoryRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<NewsCategoryDTO> findOne(Long id) {
        log.debug("Request to get NewsCategory : {}", id);
        return newsCategoryRepository.findById(id).map(newsCategoryMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete NewsCategory : {}", id);
        return newsCategoryRepository.deleteById(id);
    }
}
