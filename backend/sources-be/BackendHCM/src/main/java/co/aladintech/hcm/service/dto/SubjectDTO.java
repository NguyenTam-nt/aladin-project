package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Subject} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SubjectDTO extends AbstractAuditingEntityDTO<Long> implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String nameKo;

    @NotNull
    private String description;

    @NotNull
    private String descriptionKo;

    @NotNull
    private String title;

    @NotNull
    private String titleKo;

    @NotNull
    private String content;

    @NotNull
    private String contentKo;

    private Set<FilesDTO> files;

    public Set<FilesDTO> getFiles() {
        return files;
    }

    public void setFiles(Set<FilesDTO> files) {
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return nameKo;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionKo() {
        return descriptionKo;
    }

    public void setDescriptionKo(String descriptionKo) {
        this.descriptionKo = descriptionKo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return titleKo;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return contentKo;
    }

    public void setContentKo(String contentKo) {
        this.contentKo = contentKo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubjectDTO)) {
            return false;
        }

        SubjectDTO subjectDTO = (SubjectDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, subjectDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubjectDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
