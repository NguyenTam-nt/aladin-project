package co.aladintech.hcm.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A HeaderNavbar.
 */
@Table("header_navbar")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HeaderNavbar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @Column("jhi_index")
    private Integer index;

    @Column("name")
    private String name;

    @Column("name_ko")
    private String nameKo;

    @Column("jhi_link")
    private String link;

    @Column("parent")
    private Long parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HeaderNavbar id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndex() {
        return this.index;
    }

    public HeaderNavbar index(Integer index) {
        this.setIndex(index);
        return this;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public String getName() {
        return this.name;
    }

    public HeaderNavbar name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return this.nameKo;
    }

    public HeaderNavbar nameKo(String nameKo) {
        this.setNameKo(nameKo);
        return this;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getLink() {
        return this.link;
    }

    public HeaderNavbar link(String link) {
        this.setLink(link);
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getParent() {
        return this.parent;
    }

    public HeaderNavbar parent(Long parent) {
        this.setParent(parent);
        return this;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HeaderNavbar)) {
            return false;
        }
        return id != null && id.equals(((HeaderNavbar) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HeaderNavbar{" +
            "id=" + getId() +
            ", index=" + getIndex() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", link='" + getLink() + "'" +
            ", parent=" + getParent() +
            "}";
    }
}
