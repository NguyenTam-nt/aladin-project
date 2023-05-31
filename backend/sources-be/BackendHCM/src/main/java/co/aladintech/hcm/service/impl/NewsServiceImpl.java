package co.aladintech.hcm.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.domain.NewsCategory;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.repository.NewsCategoryRepository;
import co.aladintech.hcm.repository.NewsRepository;
import co.aladintech.hcm.repository.search.NewsSearchRepository;
import co.aladintech.hcm.service.NewsService;
import co.aladintech.hcm.service.dto.NewsCategoryDTO;
import co.aladintech.hcm.service.dto.NewsDTO;
import co.aladintech.hcm.service.mapper.NewsCategoryMapper;
import co.aladintech.hcm.service.mapper.NewsMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;
    @Autowired
    private NewsCategoryMapper newsCategoryMapper;

    private final NewsSearchRepository newsSearchRepository;

    @Autowired
    private FilesRepository filesRepository;
    @Autowired
    private NewsCategoryRepository newsCategoryRepository;

    public NewsServiceImpl(NewsRepository newsRepository, NewsMapper newsMapper, NewsSearchRepository newsSearchRepository) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
        this.newsSearchRepository = newsSearchRepository;
    }

    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        NewsDTO result = newsMapper.toDto(news);
//        newsSearchRepository.index(news);
        return result;
    }

    @Override
    public NewsDTO update(NewsDTO newsDTO) {
        log.debug("Request to update News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        NewsDTO result = newsMapper.toDto(news);
//        newsSearchRepository.index(news);
        return result;
    }

    @Override
    public Optional<NewsDTO> partialUpdate(NewsDTO newsDTO) {
        log.debug("Request to partially update News : {}", newsDTO);

        return newsRepository
            .findById(newsDTO.getId())
            .map(existingNews -> {
                newsMapper.partialUpdate(existingNews, newsDTO);

                return existingNews;
            })
            .map(newsRepository::save)
            .map(savedNews -> {
                newsSearchRepository.save(savedNews);

                return savedNews;
            })
            .map(newsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return newsRepository.findAll(pageable).map(newsMapper::toDto);
    }

    @Override
    public Optional<NewsDTO> findOne(Long id) {
        log.debug("Request to get News : {}", id);
        Optional<News> newsOptiona = newsRepository.findById(id);
        if(newsOptiona.isPresent()) {
            long v = newsOptiona.get().getView() == null ? 1 : (newsOptiona.get().getView() + 1);
            newsOptiona.get().setView(v);
            newsRepository.save(newsOptiona.get());
        }
        return newsOptiona.map(newsMapper::toDto);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        log.debug("Request to delete News : {}", ids);
        newsRepository.deleteAllById(ids);
//        newsSearchRepository.deleteAllById(ids);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete News : {}", id);
        newsRepository.deleteById(id);
//        newsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of News for query {}", query);
        return newsSearchRepository.search(query, pageable).map(newsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsDTO> findAllByCategoriesIdAndKeyword(List<Long> categoriesId, String keyword, Pageable pageable) {
        if(keyword == null) keyword = "";
        keyword = "%" + keyword + "%";
        List<NewsCategory> categories;
        if(categoriesId == null || categoriesId.isEmpty()) {
            categories = newsCategoryRepository.findAll();
        } else {
            categories = newsCategoryRepository.findAllById(categoriesId);
            for(Long id : categoriesId) {
                categories.addAll(newsCategoryRepository.findAllByParent(id));
            }
        }

        Page<News> news = newsRepository.findAllByNewsCategoryInAndTitleIsLikeIgnoreCase(categories, keyword, pageable);
        return news.map(newsMapper::toDto);
    }
}
