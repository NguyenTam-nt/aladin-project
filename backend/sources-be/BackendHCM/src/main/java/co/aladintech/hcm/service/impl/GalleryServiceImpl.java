package co.aladintech.hcm.service.impl;

import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.domain.enumeration.GalleryType;
import co.aladintech.hcm.repository.FilesRepository;
import co.aladintech.hcm.repository.GalleryRepository;
import co.aladintech.hcm.service.GalleryService;
import co.aladintech.hcm.service.dto.BannerDTO;
import co.aladintech.hcm.service.dto.FilesDTO;
import co.aladintech.hcm.service.dto.GalleryDTO;
import co.aladintech.hcm.service.dto.GalleryPageDTO;
import co.aladintech.hcm.service.mapper.FilesMapper;
import co.aladintech.hcm.service.mapper.GalleryMapper;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Gallery}.
 */
@Service
@Transactional
public class GalleryServiceImpl implements GalleryService {

    private final Logger log = LoggerFactory.getLogger(GalleryServiceImpl.class);

    private final GalleryRepository galleryRepository;

    private final GalleryMapper galleryMapper;
    @Autowired
    private FilesMapper filesMapper;

    @Autowired
    private FilesRepository filesRepository;

    public GalleryServiceImpl(GalleryRepository galleryRepository, GalleryMapper galleryMapper) {
        this.galleryRepository = galleryRepository;
        this.galleryMapper = galleryMapper;
    }

    @Override
    public GalleryDTO save(GalleryDTO galleryDTO) {
        log.debug("Request to save Gallery : {}", galleryDTO);
        Gallery gallery = galleryMapper.toEntity(galleryDTO);
        gallery = galleryRepository.save(gallery);
        return galleryMapper.toDto(gallery);
    }

    @Override
    public GalleryDTO update(GalleryDTO galleryDTO) {
        log.debug("Request to update Gallery : {}", galleryDTO);
        Gallery gallery = galleryMapper.toEntity(galleryDTO);
        gallery = galleryRepository.save(gallery);
        return galleryMapper.toDto(gallery);
    }

    @Override
    public Optional<GalleryDTO> partialUpdate(GalleryDTO galleryDTO) {
        log.debug("Request to partially update Gallery : {}", galleryDTO);

        return galleryRepository
            .findById(galleryDTO.getId())
            .map(existingGallery -> {
                galleryMapper.partialUpdate(existingGallery, galleryDTO);

                return existingGallery;
            })
            .map(galleryRepository::save)
            .map(galleryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GalleryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Galleries");
        return galleryRepository.findAll(pageable).map(galleryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GalleryDTO> findAllByType(GalleryType type, Pageable pageable) {
        log.debug("Request to get all Banners");
        return galleryRepository.findAllByType(type, pageable).map(galleryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GalleryPageDTO> findOne(Long id, Pageable pageable) {
        log.debug("Request to get Gallery : {}", id);
        return galleryRepository.findById(id).map(e -> {
            GalleryPageDTO galleryDTO = new GalleryPageDTO();
            galleryDTO.setId(e.getId());
            galleryDTO.setName(e.getName());
            galleryDTO.setNameKo(e.getNameKo());
            galleryDTO.setDes(e.getDes());
            galleryDTO.setDesKo(e.getDesKo());
            galleryDTO.setType(e.getType());
            galleryDTO.setCreatedBy(e.getCreatedBy());
            galleryDTO.setCreatedDate(e.getCreatedDate());
            galleryDTO.setLastModifiedBy(e.getLastModifiedBy());
            galleryDTO.setLastModifiedDate(e.getLastModifiedDate());
            List<FilesDTO> files = e.getFiles().stream().map(filesMapper::toDto).collect(Collectors.toList());
            int start = pageable.getPageNumber() * pageable.getPageSize();
            int end = (pageable.getPageNumber() + 1) * pageable.getPageSize();
            if(end > files.size()) end = files.size();
            if(start > end) start = end;
            Page<FilesDTO> page =
                new PageImpl<>(files.subList(start, end),
                    pageable, files.size()
                );
            galleryDTO.setFiles(page);
            return galleryDTO;
        });
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Gallery : {}", id);
        galleryRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Long> ids) {
        log.debug("Request to delete Gallery : {}", ids);
        galleryRepository.deleteAllById(ids);
    }
}
