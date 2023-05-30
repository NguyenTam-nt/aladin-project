package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Posts} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PostsDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String title;

    @NotNull(message = "must not be null")
    private String titleKo;

    @NotNull(message = "must not be null")
    private String description;

    @NotNull(message = "must not be null")
    private String descriptionKo;

    @NotNull(message = "must not be null")
    private String image;

    @NotNull(message = "must not be null")
    private String link;

    private Boolean outstanding;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getOutstanding() {
        return outstanding;
    }

    public void setOutstanding(Boolean outstanding) {
        this.outstanding = outstanding;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PostsDTO)) {
            return false;
        }

        PostsDTO postsDTO = (PostsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, postsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PostsDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            ", image='" + getImage() + "'" +
            ", link='" + getLink() + "'" +
            ", outstanding='" + getOutstanding() + "'" +
            "}";
    }
}
