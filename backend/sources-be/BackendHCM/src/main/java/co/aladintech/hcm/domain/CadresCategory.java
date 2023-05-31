package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CadresCategory.
 */
@Entity
@Table(name = "cadres_category")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadresCategory extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "name_ko", nullable = false)
    private String nameKo;

    @OneToMany(mappedBy = "cadresCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "files", "cadresCategory" }, allowSetters = true)
    private Set<Cadres> cadres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CadresCategory id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public CadresCategory name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return this.nameKo;
    }

    public CadresCategory nameKo(String nameKo) {
        this.setNameKo(nameKo);
        return this;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public Set<Cadres> getCadres() {
        return this.cadres;
    }

    public void setCadres(Set<Cadres> cadres) {
        if (this.cadres != null) {
            this.cadres.forEach(i -> i.setCadresCategory(null));
        }
        if (cadres != null) {
            cadres.forEach(i -> i.setCadresCategory(this));
        }
        this.cadres = cadres;
    }

    public CadresCategory cadres(Set<Cadres> cadres) {
        this.setCadres(cadres);
        return this;
    }

    public CadresCategory addCadres(Cadres cadres) {
        this.cadres.add(cadres);
        cadres.setCadresCategory(this);
        return this;
    }

    public CadresCategory removeCadres(Cadres cadres) {
        this.cadres.remove(cadres);
        cadres.setCadresCategory(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadresCategory)) {
            return false;
        }
        return id != null && id.equals(((CadresCategory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadresCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            "}";
    }
}
