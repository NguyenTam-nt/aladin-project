package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.ContentSession;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ContentSession} and its DTO {@link ContentSessionDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContentSessionMapper extends EntityMapper<ContentSessionDTO, ContentSession> {}
