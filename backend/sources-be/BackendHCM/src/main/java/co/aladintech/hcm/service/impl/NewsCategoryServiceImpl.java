package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.repository.NewsCategoryRepository;
import co.aladintech.hcm.repository.NewsRepository;
import co.aladintech.hcm.service.NewsCategoryService;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.dto.NewsCategoryListChildrenDTO;
import co.aladintech.hcm.service.mapper.NewsCategoryMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import co.aladintech.hcm.service.mapper.NewsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NewsCategory}.
 */
@Service
@Transactional
public class NewsCategoryServiceImpl implements NewsCategoryService {

    private final Logger log = LoggerFactory.getLogger(NewsCategoryServiceImpl.class);

    private final NewsCategoryRepository newsCategoryRepository;
    @Autowired
    private NewsRepository newsRepository;

    private final NewsCategoryMapper newsCategoryMapper;
    private final NewsMapper newsMapper;

    public NewsCategoryServiceImpl(NewsCategoryRepository newsCategoryRepository, NewsCategoryMapper newsCategoryMapper,
                                   NewsMapper newsMapper) {
        this.newsCategoryRepository = newsCategoryRepository;
        this.newsCategoryMapper = newsCategoryMapper;
        this.newsMapper = newsMapper;
    }

    @Override
    public NewsCategoryDTO save(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to save NewsCategory : {}", newsCategoryDTO);
        NewsCategory newsCategory = newsCategoryMapper.toEntity(newsCategoryDTO);
        newsCategory = newsCategoryRepository.save(newsCategory);
        return newsCategoryMapper.toDto(newsCategory);
    }

    @Override
    public NewsCategoryDTO update(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to update NewsCategory : {}", newsCategoryDTO);
        NewsCategory newsCategory = newsCategoryMapper.toEntity(newsCategoryDTO);
        newsCategory = newsCategoryRepository.save(newsCategory);
        return newsCategoryMapper.toDto(newsCategory);
    }

    @Override
    public NewsCategoryListChildrenDTO updateWithChildren(NewsCategoryListChildrenDTO newsCategoryListChildrenDTO) {
        log.debug("Request to update NewsCategory : {}", newsCategoryListChildrenDTO);


        NewsCategoryDTO newsCategoryDTO = new NewsCategoryDTO();
        newsCategoryDTO.setId(newsCategoryListChildrenDTO.getId());
        newsCategoryDTO.setName(newsCategoryListChildrenDTO.getName());
        newsCategoryDTO.setNameKo(newsCategoryListChildrenDTO.getNameKo());
        newsCategoryDTO.setStatus(newsCategoryListChildrenDTO.getStatus());
        NewsCategory newsCategory = newsCategoryMapper.toEntity(newsCategoryDTO);
        newsCategory = newsCategoryRepository.saveAndFlush(newsCategory);
        newsCategoryListChildrenDTO.setId(newsCategory.getId());

        List<NewsCategory> newsCategoryNews = new ArrayList<>();
        for(NewsCategoryDTO d : newsCategoryListChildrenDTO.getChildren()) {
            NewsCategory n = newsCategoryMapper.toEntity(d);
            n.setParent(newsCategory.getId());
            newsCategoryNews.add(n);

        }

//        newsCategoryRepository.deleteAllByParent(newsCategory.getId());

        List<NewsCategory> s = newsCategoryRepository.saveAll(newsCategoryNews);
        newsCategoryListChildrenDTO.setChildren(s.stream().map(newsCategoryMapper::toDto).collect(Collectors.toList()));
        return newsCategoryListChildrenDTO;
    }

    @Override
    public Optional<NewsCategoryDTO> partialUpdate(NewsCategoryDTO newsCategoryDTO) {
        log.debug("Request to partially update NewsCategory : {}", newsCategoryDTO);

        return newsCategoryRepository
            .findById(newsCategoryDTO.getId())
            .map(existingNewsCategory -> {
                newsCategoryMapper.partialUpdate(existingNewsCategory, newsCategoryDTO);

                return existingNewsCategory;
            })
            .map(newsCategoryRepository::save)
            .map(newsCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all NewsCategories");
        return newsCategoryRepository.findAll(pageable).map(newsCategoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsCategoryListChildrenDTO> findAllParent(Pageable pageable) {
        log.debug("Request to get all NewsCategories");
        return newsCategoryRepository.findAllByParent(null, pageable).map(e -> {
            NewsCategoryListChildrenDTO newsCategoryListChildrenDTO = new NewsCategoryListChildrenDTO();
            newsCategoryListChildrenDTO.setId(e.getId());
            newsCategoryListChildrenDTO.setName(e.getName());
            newsCategoryListChildrenDTO.setNameKo(e.getNameKo());
            newsCategoryListChildrenDTO.setStatus(e.getStatus());

            List<NewsCategory> nl = newsCategoryRepository.findAllByParent(e.getId());

            newsCategoryListChildrenDTO.setChildren(nl.stream().map(newsCategoryMapper::toDto).collect(Collectors.toList()));

            return newsCategoryListChildrenDTO;
        });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsCategoryListChildrenDTO> findAllWithChildren(Pageable pageable) {
        log.debug("Request to get all NewsCategories");
        return newsCategoryRepository.findAll(pageable).map(e -> {
            NewsCategoryListChildrenDTO newsCategoryListChildrenDTO = new NewsCategoryListChildrenDTO();
            newsCategoryListChildrenDTO.setId(e.getId());
            newsCategoryListChildrenDTO.setName(e.getName());
            newsCategoryListChildrenDTO.setNameKo(e.getNameKo());
            newsCategoryListChildrenDTO.setStatus(e.getStatus());

            List<NewsCategory> nl = newsCategoryRepository.findAllByParent(e.getId());

            newsCategoryListChildrenDTO.setChildren(nl.stream().map(newsCategoryMapper::toDto).collect(Collectors.toList()));

            return newsCategoryListChildrenDTO;
        });
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NewsCategoryDTO> findOne(Long id) {
        log.debug("Request to get NewsCategory : {}", id);
        return newsCategoryRepository.findById(id).map(newsCategoryMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<NewsCategoryListChildrenDTO> findOneWithChildren(Long id) {
        Optional<NewsCategory> newsCategory = newsCategoryRepository.findById(id);

        if(newsCategory.isPresent()) {
            NewsCategoryListChildrenDTO newsCategoryListChildrenDTO = new NewsCategoryListChildrenDTO();
            newsCategoryListChildrenDTO.setId(newsCategory.get().getId());
            newsCategoryListChildrenDTO.setName(newsCategory.get().getName());
            newsCategoryListChildrenDTO.setNameKo(newsCategory.get().getNameKo());
            newsCategoryListChildrenDTO.setStatus(newsCategory.get().getStatus());

            List<NewsCategory> nl = newsCategoryRepository.findAllByParent(newsCategory.get().getId());

            newsCategoryListChildrenDTO.setChildren(nl.stream().map(newsCategoryMapper::toDto).collect(Collectors.toList()));

            return Optional.of(newsCategoryListChildrenDTO);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NewsCategory : {}", id);

        Optional<NewsCategory> newsCategory = newsCategoryRepository.findById(id);
        if(newsCategory.isPresent()) {
            newsRepository.deleteAllByNewsCategory(newsCategory.get());
            newsCategoryRepository.deleteAllByParent(id);
            newsCategoryRepository.deleteById(id);
        }

    }

    @Override
    public NewsCategoryListChildrenDTO saveWithChildren(NewsCategoryListChildrenDTO newsCategoryListChildrenDTO){
        NewsCategoryDTO newsCategoryDTO = new NewsCategoryDTO();
        newsCategoryDTO.setStatus(newsCategoryListChildrenDTO.getStatus());
        newsCategoryDTO.setName(newsCategoryListChildrenDTO.getName());
        newsCategoryDTO.setNameKo(newsCategoryListChildrenDTO.getNameKo());
        NewsCategory newsCategory = newsCategoryMapper.toEntity(newsCategoryDTO);
        newsCategory = newsCategoryRepository.saveAndFlush(newsCategory);
        newsCategoryListChildrenDTO.setId(newsCategory.getId());

        List<NewsCategory> newsCategoryNews = new ArrayList<>();
        for(NewsCategoryDTO d : newsCategoryListChildrenDTO.getChildren()) {
            NewsCategory n = newsCategoryMapper.toEntity(d);
            n.setParent(newsCategory.getId());
            newsCategoryNews.add(n);
        }

        List<NewsCategory> s = newsCategoryRepository.saveAll(newsCategoryNews);
        newsCategoryListChildrenDTO.setChildren(s.stream().map(newsCategoryMapper::toDto).collect(Collectors.toList()));
        return newsCategoryListChildrenDTO;
    }
}
