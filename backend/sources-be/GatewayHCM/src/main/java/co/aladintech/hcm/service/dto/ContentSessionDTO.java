package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.ContentSession} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContentSessionDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String type;

    @NotNull(message = "must not be null")
    private String category;

    @NotNull(message = "must not be null")
    private String categoryKo;

    @NotNull(message = "must not be null")
    private String tilte;

    @NotNull(message = "must not be null")
    private String tilteKo;

    @NotNull(message = "must not be null")
    private String content;

    @NotNull(message = "must not be null")
    private String contentKo;

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
            ", tilte='" + getTilte() + "'" +
            ", tilteKo='" + getTilteKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
