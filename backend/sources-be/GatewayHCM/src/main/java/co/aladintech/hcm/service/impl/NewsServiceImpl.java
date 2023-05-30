package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.repository.NewsRepository;
import co.aladintech.hcm.service.NewsService;
import co.aladintech.hcm.service.dto.NewsDTO;
import co.aladintech.hcm.service.mapper.NewsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    public NewsServiceImpl(NewsRepository newsRepository, NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
    }

    @Override
    public Mono<NewsDTO> save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        return newsRepository.save(newsMapper.toEntity(newsDTO)).map(newsMapper::toDto);
    }

    @Override
    public Mono<NewsDTO> update(NewsDTO newsDTO) {
        log.debug("Request to update News : {}", newsDTO);
        return newsRepository.save(newsMapper.toEntity(newsDTO)).map(newsMapper::toDto);
    }

    @Override
    public Mono<NewsDTO> partialUpdate(NewsDTO newsDTO) {
        log.debug("Request to partially update News : {}", newsDTO);

        return newsRepository
            .findById(newsDTO.getId())
            .map(existingNews -> {
                newsMapper.partialUpdate(existingNews, newsDTO);

                return existingNews;
            })
            .flatMap(newsRepository::save)
            .map(newsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<NewsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return newsRepository.findAllBy(pageable).map(newsMapper::toDto);
    }

    public Mono<Long> countAll() {
        return newsRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<NewsDTO> findOne(Long id) {
        log.debug("Request to get News : {}", id);
        return newsRepository.findById(id).map(newsMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete News : {}", id);
        return newsRepository.deleteById(id);
    }
}
