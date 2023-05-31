package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.ViewPage;
import co.aladintech.hcm.service.dto.ViewPageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ViewPage} and its DTO {@link ViewPageDTO}.
 */
@Mapper(componentModel = "spring")
public interface ViewPageMapper extends EntityMapper<ViewPageDTO, ViewPage> {}
