package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.service.dto.CadresDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cadres} and its DTO {@link CadresDTO}.
 */
@Mapper(componentModel = "spring")
public interface CadresMapper extends EntityMapper<CadresDTO, Cadres> {}
