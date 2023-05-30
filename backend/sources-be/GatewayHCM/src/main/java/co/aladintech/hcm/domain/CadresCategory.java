package co.aladintech.hcm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A CadresCategory.
 */
@Table("cadres_category")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadresCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @NotNull(message = "must not be null")
    @Column("name")
    private String name;

    @NotNull(message = "must not be null")
    @Column("name_ko")
    private String nameKo;

    @Transient
    @JsonIgnoreProperties(value = { "files", "cadresCategories" }, allowSetters = true)
    private Cadres cadres;

    @Column("cadres_id")
    private Long cadresId;

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

    public Cadres getCadres() {
        return this.cadres;
    }

    public void setCadres(Cadres cadres) {
        this.cadres = cadres;
        this.cadresId = cadres != null ? cadres.getId() : null;
    }

    public CadresCategory cadres(Cadres cadres) {
        this.setCadres(cadres);
        return this;
    }

    public Long getCadresId() {
        return this.cadresId;
    }

    public void setCadresId(Long cadres) {
        this.cadresId = cadres;
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
