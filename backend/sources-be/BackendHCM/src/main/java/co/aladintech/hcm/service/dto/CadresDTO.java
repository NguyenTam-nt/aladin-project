package co.aladintech.hcm.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.aladintech.hcm.domain.Cadres} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadresDTO extends AbstractAuditingEntityDTO<Long> implements Serializable {

    private Long id;

    @NotNull
    private String fullname;

    @NotNull
    private String fullnameKo;

    @NotNull
    private String position;

    @NotNull
    private String positionKo;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String major;

    @NotNull
    private String majorKo;

    @NotNull
    private String workResponsibility;

    @NotNull
    private String workResponsibilityKo;

    @NotNull
    private String title;

    @NotNull
    private String titleKo;

    @NotNull
    private String content;

    @NotNull
    private String contentKo;

    private Set<FilesDTO> files;

    private CadresCategoryDTO cadresCategory;

    public Set<FilesDTO> getFiles() {
        return files;
    }

    public void setFiles(Set<FilesDTO> files) {
        this.files = files;
    }

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

    public CadresCategoryDTO getCadresCategory() {
        return cadresCategory;
    }

    public void setCadresCategory(CadresCategoryDTO cadresCategory) {
        this.cadresCategory = cadresCategory;
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
            ", cadresCategory=" + getCadresCategory() +
            "}";
    }
}
