package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.HeaderNavbar} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HeaderNavbarDTO implements Serializable {

    private Long id;

    private Integer index;

    private String name;

    private String nameKo;

    private String link;

    private Long parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameKo() {
        return nameKo;
    }

    public void setNameKo(String nameKo) {
        this.nameKo = nameKo;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HeaderNavbarDTO)) {
            return false;
        }

        HeaderNavbarDTO headerNavbarDTO = (HeaderNavbarDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, headerNavbarDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HeaderNavbarDTO{" +
            "id=" + getId() +
            ", index=" + getIndex() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", link='" + getLink() + "'" +
            ", parent=" + getParent() +
            "}";
    }
}
