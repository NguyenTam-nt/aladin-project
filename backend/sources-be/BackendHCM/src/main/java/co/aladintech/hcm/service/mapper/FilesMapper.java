package co.aladintech.hcm.service.mapper;

import co.aladintech.hcm.domain.Cadres;
import co.aladintech.hcm.domain.ContentSession;
import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.domain.Subject;
import co.aladintech.hcm.service.dto.CadresDTO;
import co.aladintech.hcm.service.dto.ContentSessionDTO;
import co.aladintech.hcm.service.dto.FilesDTO;
import co.aladintech.hcm.service.dto.GalleryDTO;
import co.aladintech.hcm.service.dto.NewsDTO;
import co.aladintech.hcm.service.dto.SubjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Files} and its DTO {@link FilesDTO}.
 */
@Mapper(componentModel = "spring")
public interface FilesMapper extends EntityMapper<FilesDTO, Files> {
    FilesDTO toDto(Files s);

}
