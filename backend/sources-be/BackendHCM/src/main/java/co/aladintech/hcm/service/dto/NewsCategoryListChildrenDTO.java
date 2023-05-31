package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.NewsCategory} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NewsCategoryListChildrenDTO implements Serializable {

    private Long id;

    private String name;

    private String nameKo;

    private Boolean status;

    private List<NewsCategoryDTO> children;

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

    public List<NewsCategoryDTO> getChildren() {
        return children;
    }

    public void setChildren(List<NewsCategoryDTO> children) {
        this.children = children;
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
        if (!(o instanceof NewsCategoryListChildrenDTO)) {
            return false;
        }

        NewsCategoryListChildrenDTO newsCategoryDTO = (NewsCategoryListChildrenDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, newsCategoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

}
