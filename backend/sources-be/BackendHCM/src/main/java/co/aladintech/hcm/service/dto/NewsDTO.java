package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.News} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsDTO extends AbstractAuditingEntityDTO<Long> implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String titleKo;

    @NotNull
    private String description;

    @NotNull
    private String descriptionKo;

    @NotNull
    private String content;

    @NotNull
    private String contentKo;

    private Long view;

    private NewsCategoryDTO newsCategory;

    private Set<FilesDTO> files;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getView() {
        return view;
    }

    public void setView(Long view) {
        this.view = view;
    }

    public NewsCategoryDTO getNewsCategory() {
        return newsCategory;
    }

    public void setNewsCategory(NewsCategoryDTO newsCategory) {
        this.newsCategory = newsCategory;
    }

    public Set<FilesDTO> getFiles() {
        return files;
    }

    public void setFiles(Set<FilesDTO> files) {
        this.files = files;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NewsDTO)) {
            return false;
        }

        NewsDTO newsDTO = (NewsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, newsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NewsDTO{" +
            "id=" + getId() +
            ", tilte='" + getTitle() + "'" +
            ", tilteKo='" + getTitleKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            ", view=" + getView() +
            ", newsCategory=" + getNewsCategory() +
            "}";
    }
}
