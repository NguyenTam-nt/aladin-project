package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.ViewPage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ViewPageDTO implements Serializable {

    private Long id;

    private Long view;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getView() {
        return view;
    }

    public void setView(Long view) {
        this.view = view;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ViewPageDTO)) {
            return false;
        }

        ViewPageDTO viewPageDTO = (ViewPageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, viewPageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ViewPageDTO{" +
            "id=" + getId() +
            ", view=" + getView() +
            "}";
    }
}
