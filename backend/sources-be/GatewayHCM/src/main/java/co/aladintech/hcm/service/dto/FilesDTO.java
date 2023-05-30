package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Files} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FilesDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private Long objectId;

    private String type;

    @NotNull(message = "must not be null")
    private String link;

    private String name;

    private ContentSessionDTO contentSession;

    private NewsDTO news;

    private CadresDTO cadres;

    private SubjectDTO subject;

    private GalleryDTO gallery;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getObjectId() {
        return objectId;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ContentSessionDTO getContentSession() {
        return contentSession;
    }

    public void setContentSession(ContentSessionDTO contentSession) {
        this.contentSession = contentSession;
    }

    public NewsDTO getNews() {
        return news;
    }

    public void setNews(NewsDTO news) {
        this.news = news;
    }

    public CadresDTO getCadres() {
        return cadres;
    }

    public void setCadres(CadresDTO cadres) {
        this.cadres = cadres;
    }

    public SubjectDTO getSubject() {
        return subject;
    }

    public void setSubject(SubjectDTO subject) {
        this.subject = subject;
    }

    public GalleryDTO getGallery() {
        return gallery;
    }

    public void setGallery(GalleryDTO gallery) {
        this.gallery = gallery;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FilesDTO)) {
            return false;
        }

        FilesDTO filesDTO = (FilesDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, filesDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FilesDTO{" +
            "id=" + getId() +
            ", objectId=" + getObjectId() +
            ", type='" + getType() + "'" +
            ", link='" + getLink() + "'" +
            ", name='" + getName() + "'" +
            ", contentSession=" + getContentSession() +
            ", news=" + getNews() +
            ", cadres=" + getCadres() +
            ", subject=" + getSubject() +
            ", gallery=" + getGallery() +
            "}";
    }
}
