package co.aladintech.hcm.service.dto;

import co.aladintech.hcm.domain.enumeration.GalleryType;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Gallery} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GalleryPageDTO extends AbstractAuditingEntityDTO<Long> implements Serializable {

    private Long id;

    @NotNull
    private String nameKo;

    private String name;

    private String des;

    private String desKo;

    private GalleryType type;

    private Page<FilesDTO> files;


    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getDesKo() {
        return desKo;
    }

    public void setDesKo(String desKo) {
        this.desKo = desKo;
    }

    public Page<FilesDTO> getFiles() {
        return files;
    }

    public void setFiles(Page<FilesDTO> files) {
        this.files = files;
    }

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
        if (!(o instanceof GalleryPageDTO)) {
            return false;
        }

        GalleryPageDTO galleryDTO = (GalleryPageDTO) o;
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
