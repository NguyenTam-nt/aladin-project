package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.ContentSession} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContentSessionDTO extends AbstractAuditingEntityDTO<Long> implements Serializable {

    private Long id;

    @NotNull
    private String type;

    @NotNull
    private String category;

    @NotNull
    private String categoryKo;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryKo() {
        return categoryKo;
    }

    public void setCategoryKo(String categoryKo) {
        this.categoryKo = categoryKo;
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
        if (!(o instanceof ContentSessionDTO)) {
            return false;
        }

        ContentSessionDTO contentSessionDTO = (ContentSessionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contentSessionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContentSessionDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", categoryKo='" + getCategoryKo() + "'" +
            ", tilte='" + getTitle() + "'" +
            ", tilteKo='" + getTitleKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
