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
    @Mapping(target = "contentSession", source = "contentSession", qualifiedByName = "contentSessionId")
    @Mapping(target = "news", source = "news", qualifiedByName = "newsId")
    @Mapping(target = "cadres", source = "cadres", qualifiedByName = "cadresId")
    @Mapping(target = "subject", source = "subject", qualifiedByName = "subjectId")
    @Mapping(target = "gallery", source = "gallery", qualifiedByName = "galleryId")
    FilesDTO toDto(Files s);

    @Named("contentSessionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContentSessionDTO toDtoContentSessionId(ContentSession contentSession);

    @Named("newsId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    NewsDTO toDtoNewsId(News news);

    @Named("cadresId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CadresDTO toDtoCadresId(Cadres cadres);

    @Named("subjectId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SubjectDTO toDtoSubjectId(Subject subject);

    @Named("galleryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GalleryDTO toDtoGalleryId(Gallery gallery);
}
