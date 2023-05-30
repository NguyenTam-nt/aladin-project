package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.History;
import co.aladintech.hcm.service.dto.HistoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link History} and its DTO {@link HistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface HistoryMapper extends EntityMapper<HistoryDTO, History> {}
