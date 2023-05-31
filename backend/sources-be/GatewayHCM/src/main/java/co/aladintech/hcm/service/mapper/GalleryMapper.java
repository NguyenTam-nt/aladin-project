package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.service.dto.GalleryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Gallery} and its DTO {@link GalleryDTO}.
 */
@Mapper(componentModel = "spring")
public interface GalleryMapper extends EntityMapper<GalleryDTO, Gallery> {}
