package co.aladintech.hcm.domain;

import co.aladintech.hcm.domain.enumeration.GalleryType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Gallery.
 */
@Table("gallery")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Gallery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("name_ko")
    private String nameKo;

    @Column("jhi_type")
    private GalleryType type;

    @Transient
    @JsonIgnoreProperties(value = { "contentSession", "news", "cadres", "subject", "gallery" }, allowSetters = true)
    private Set<Files> files = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Gallery id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameKo() {
        return this.nameKo;
    }

    public Gallery nameKo(String nameKo) {
        this.setNameKo(nameKo);
        return this;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public GalleryType getType() {
        return this.type;
    }

    public Gallery type(GalleryType type) {
        this.setType(type);
        return this;
    }

    public void setType(GalleryType type) {
        this.type = type;
    }

    public Set<Files> getFiles() {
        return this.files;
    }

    public void setFiles(Set<Files> files) {
        if (this.files != null) {
            this.files.forEach(i -> i.setGallery(null));
        }
        if (files != null) {
            files.forEach(i -> i.setGallery(this));
        }
        this.files = files;
    }

    public Gallery files(Set<Files> files) {
        this.setFiles(files);
        return this;
    }

    public Gallery addFiles(Files files) {
        this.files.add(files);
        files.setGallery(this);
        return this;
    }

    public Gallery removeFiles(Files files) {
        this.files.remove(files);
        files.setGallery(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Gallery)) {
            return false;
        }
        return id != null && id.equals(((Gallery) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Gallery{" +
            "id=" + getId() +
            ", nameKo='" + getNameKo() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
