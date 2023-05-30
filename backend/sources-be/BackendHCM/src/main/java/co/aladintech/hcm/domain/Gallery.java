package co.aladintech.hcm.domain;

import co.aladintech.hcm.domain.enumeration.GalleryType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Gallery.
 */
@Entity
@Table(name = "gallery")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Gallery extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "name_ko", nullable = false)
    private String nameKo;

    @Column(name = "des")
    private String des;

    @Column(name = "des_ko")
    private String desKo;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private GalleryType type;

    @OneToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Files> files = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here


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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFiles(Set<Files> files) {
        this.files = files;
    }

    public void setType(GalleryType type) {
        this.type = type;
    }

    public Set<Files> getFiles() {
        return this.files;
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
