package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.NewsCategory} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsCategoryDTO implements Serializable {

    private Long id;

    private String name;

    private String nameKo;

    private Boolean status;

    private Long parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getParent() {
        return parent;
    }

    public void setParent(Long parent) {
        this.parent = parent;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NewsCategoryDTO)) {
            return false;
        }

        NewsCategoryDTO newsCategoryDTO = (NewsCategoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, newsCategoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NewsCategoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", parent=" + getParent() +
            "}";
    }
}
