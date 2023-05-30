package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.ViewPage;
import co.aladintech.hcm.repository.ViewPageRepository;
import co.aladintech.hcm.service.ViewPageService;
import co.aladintech.hcm.service.dto.ViewPageDTO;
import co.aladintech.hcm.service.mapper.ViewPageMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ViewPage}.
 */
@Service
@Transactional
public class ViewPageServiceImpl implements ViewPageService {

    private final Logger log = LoggerFactory.getLogger(ViewPageServiceImpl.class);

    private final ViewPageRepository viewPageRepository;

    private final ViewPageMapper viewPageMapper;

    public ViewPageServiceImpl(ViewPageRepository viewPageRepository, ViewPageMapper viewPageMapper) {
        this.viewPageRepository = viewPageRepository;
        this.viewPageMapper = viewPageMapper;
    }

    @Override
    public ViewPageDTO save(ViewPageDTO viewPageDTO) {
        log.debug("Request to save ViewPage : {}", viewPageDTO);
        ViewPage viewPage = viewPageMapper.toEntity(viewPageDTO);
        viewPage = viewPageRepository.save(viewPage);
        return viewPageMapper.toDto(viewPage);
    }

    @Override
    public ViewPageDTO update(ViewPageDTO viewPageDTO) {
        log.debug("Request to update ViewPage : {}", viewPageDTO);
        ViewPage viewPage = viewPageMapper.toEntity(viewPageDTO);
        viewPage = viewPageRepository.save(viewPage);
        return viewPageMapper.toDto(viewPage);
    }

    @Override
    public Optional<ViewPageDTO> partialUpdate(ViewPageDTO viewPageDTO) {
        log.debug("Request to partially update ViewPage : {}", viewPageDTO);

        return viewPageRepository
            .findById(viewPageDTO.getId())
            .map(existingViewPage -> {
                viewPageMapper.partialUpdate(existingViewPage, viewPageDTO);

                return existingViewPage;
            })
            .map(viewPageRepository::save)
            .map(viewPageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ViewPageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ViewPages");
        return viewPageRepository.findAll(pageable).map(viewPageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ViewPageDTO> findOne(Long id) {
        log.debug("Request to get ViewPage : {}", id);
        return viewPageRepository.findById(id).map(viewPageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ViewPage : {}", id);
        viewPageRepository.deleteById(id);
    }

}
