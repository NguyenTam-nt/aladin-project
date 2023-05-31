package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.CadresCategory} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadresCategoryDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String name;

    @NotNull(message = "must not be null")
    private String nameKo;

    private CadresDTO cadres;

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

    public CadresDTO getCadres() {
        return cadres;
    }

    public void setCadres(CadresDTO cadres) {
        this.cadres = cadres;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadresCategoryDTO)) {
            return false;
        }

        CadresCategoryDTO cadresCategoryDTO = (CadresCategoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cadresCategoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadresCategoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameKo='" + getNameKo() + "'" +
            ", cadres=" + getCadres() +
            "}";
    }
}