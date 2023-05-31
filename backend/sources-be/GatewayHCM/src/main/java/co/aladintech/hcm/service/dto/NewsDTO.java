package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.News} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String tilte;

    @NotNull(message = "must not be null")
    private String tilteKo;

    @NotNull(message = "must not be null")
    private String description;

    @NotNull(message = "must not be null")
    private String descriptionKo;

    @NotNull(message = "must not be null")
    private String content;

    @NotNull(message = "must not be null")
    private String contentKo;

    private NewsCategoryDTO newsCategory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTilte() {
        return tilte;
    }

    public void setTilte(String tilte) {
        this.tilte = tilte;
    }

    public String getTilteKo() {
        return tilteKo;
    }

    public void setTilteKo(String tilteKo) {
        this.tilteKo = tilteKo;
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

    public NewsCategoryDTO getNewsCategory() {
        return newsCategory;
    }

    public void setNewsCategory(NewsCategoryDTO newsCategory) {
        this.newsCategory = newsCategory;
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
            ", tilte='" + getTilte() + "'" +
            ", tilteKo='" + getTilteKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            ", newsCategory=" + getNewsCategory() +
            "}";
    }
}
