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

    private String type;

    @NotNull
    private String link;

    private String name;


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
            ", type='" + getType() + "'" +
            ", link='" + getLink() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
