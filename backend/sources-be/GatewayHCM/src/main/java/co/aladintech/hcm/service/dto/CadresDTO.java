package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Cadres} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadresDTO implements Serializable {

    private Long id;

    @NotNull(message = "must not be null")
    private String fullname;

    @NotNull(message = "must not be null")
    private String fullnameKo;

    @NotNull(message = "must not be null")
    private String position;

    @NotNull(message = "must not be null")
    private String positionKo;

    @NotNull(message = "must not be null")
    @Pattern(regexp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,6}$")
    private String email;

    @NotNull(message = "must not be null")
    private String major;

    @NotNull(message = "must not be null")
    private String majorKo;

    @NotNull(message = "must not be null")
    private String workResponsibility;

    @NotNull(message = "must not be null")
    private String workResponsibilityKo;

    @NotNull(message = "must not be null")
    private String title;

    @NotNull(message = "must not be null")
    private String titleKo;

    @NotNull(message = "must not be null")
    private String content;

    @NotNull(message = "must not be null")
    private String contentKo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getFullnameKo() {
        return fullnameKo;
    }

    public void setFullnameKo(String fullnameKo) {
        this.fullnameKo = fullnameKo;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPositionKo() {
        return positionKo;
    }

    public void setPositionKo(String positionKo) {
        this.positionKo = positionKo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getMajorKo() {
        return majorKo;
    }

    public void setMajorKo(String majorKo) {
        this.majorKo = majorKo;
    }

    public String getWorkResponsibility() {
        return workResponsibility;
    }

    public void setWorkResponsibility(String workResponsibility) {
        this.workResponsibility = workResponsibility;
    }

    public String getWorkResponsibilityKo() {
        return workResponsibilityKo;
    }

    public void setWorkResponsibilityKo(String workResponsibilityKo) {
        this.workResponsibilityKo = workResponsibilityKo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return titleKo;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return contentKo;
    }

    public void setContentKo(String contentKo) {
        this.contentKo = contentKo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadresDTO)) {
            return false;
        }

        CadresDTO cadresDTO = (CadresDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cadresDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadresDTO{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            ", fullnameKo='" + getFullnameKo() + "'" +
            ", position='" + getPosition() + "'" +
            ", positionKo='" + getPositionKo() + "'" +
            ", email='" + getEmail() + "'" +
            ", major='" + getMajor() + "'" +
            ", majorKo='" + getMajorKo() + "'" +
            ", workResponsibility='" + getWorkResponsibility() + "'" +
            ", workResponsibilityKo='" + getWorkResponsibilityKo() + "'" +
            ", title='" + getTitle() + "'" +
            ", titleKo='" + getTitleKo() + "'" +
            ", content='" + getContent() + "'" +
            ", contentKo='" + getContentKo() + "'" +
            "}";
    }
}
