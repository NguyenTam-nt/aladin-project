package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Subject;
import co.aladintech.hcm.service.dto.SubjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Subject} and its DTO {@link SubjectDTO}.
 */
@Mapper(componentModel = "spring")
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {}
