package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.History} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HistoryDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer year;

    @NotNull
    private String image;

    @NotNull
    private String description;

    @NotNull
    private String descriptionKo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoryDTO)) {
            return false;
        }

        HistoryDTO historyDTO = (HistoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, historyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistoryDTO{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", image='" + getImage() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionKo='" + getDescriptionKo() + "'" +
            "}";
    }
}
