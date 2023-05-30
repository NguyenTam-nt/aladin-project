package co.aladintech.hcm.service.dto;

import co.aladintech.hcm.domain.enumeration.GalleryType;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Gallery} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GalleryDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String nameKo;

    private GalleryType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameKo() {
        return nameKo;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public GalleryType getType() {
        return type;
    }

    public void setType(GalleryType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GalleryDTO)) {
            return false;
        }

        GalleryDTO galleryDTO = (GalleryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, galleryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GalleryDTO{" +
            "id=" + getId() +
            ", nameKo='" + getNameKo() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
