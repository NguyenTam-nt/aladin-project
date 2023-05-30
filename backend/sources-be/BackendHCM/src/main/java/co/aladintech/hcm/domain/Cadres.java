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
 * A Cadres.
 */
@Entity
@Table(name = "cadres")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cadres extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fullname", nullable = false)
    private String fullname;

    @NotNull
    @Column(name = "fullname_ko", nullable = false)
    private String fullnameKo;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    @NotNull
    @Column(name = "position_ko", nullable = false)
    private String positionKo;

    @NotNull
    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "major", nullable = false)
    private String major;

    @NotNull
    @Column(name = "major_ko", nullable = false)
    private String majorKo;

    @NotNull
    @Column(name = "work_responsibility", nullable = false)
    private String workResponsibility;

    @NotNull
    @Column(name = "work_responsibility_ko", nullable = false)
    private String workResponsibilityKo;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "title_ko", nullable = false)
    private String titleKo;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "content_ko", nullable = false)
    private String contentKo;

    @OneToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Files> files = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "cadres" }, allowSetters = true)
    private CadresCategory cadresCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cadres id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public Cadres fullname(String fullname) {
        this.setFullname(fullname);
        return this;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getFullnameKo() {
        return this.fullnameKo;
    }

    public Cadres fullnameKo(String fullnameKo) {
        this.setFullnameKo(fullnameKo);
        return this;
    }

    public void setFullnameKo(String fullnameKo) {
        this.fullnameKo = fullnameKo;
    }

    public String getPosition() {
        return this.position;
    }

    public Cadres position(String position) {
        this.setPosition(position);
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPositionKo() {
        return this.positionKo;
    }

    public Cadres positionKo(String positionKo) {
        this.setPositionKo(positionKo);
        return this;
    }

    public void setPositionKo(String positionKo) {
        this.positionKo = positionKo;
    }

    public String getEmail() {
        return this.email;
    }

    public Cadres email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMajor() {
        return this.major;
    }

    public Cadres major(String major) {
        this.setMajor(major);
        return this;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getMajorKo() {
        return this.majorKo;
    }

    public Cadres majorKo(String majorKo) {
        this.setMajorKo(majorKo);
        return this;
    }

    public void setMajorKo(String majorKo) {
        this.majorKo = majorKo;
    }

    public String getWorkResponsibility() {
        return this.workResponsibility;
    }

    public Cadres workResponsibility(String workResponsibility) {
        this.setWorkResponsibility(workResponsibility);
        return this;
    }

    public void setWorkResponsibility(String workResponsibility) {
        this.workResponsibility = workResponsibility;
    }

    public String getWorkResponsibilityKo() {
        return this.workResponsibilityKo;
    }

    public Cadres workResponsibilityKo(String workResponsibilityKo) {
        this.setWorkResponsibilityKo(workResponsibilityKo);
        return this;
    }

    public void setWorkResponsibilityKo(String workResponsibilityKo) {
        this.workResponsibilityKo = workResponsibilityKo;
    }

    public String getTitle() {
        return this.title;
    }

    public Cadres title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleKo() {
        return this.titleKo;
    }

    public Cadres titleKo(String titleKo) {
        this.setTitleKo(titleKo);
        return this;
    }

    public void setTitleKo(String titleKo) {
        this.titleKo = titleKo;
    }

    public String getContent() {
        return this.content;
    }

    public Cadres content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentKo() {
        return this.contentKo;
    }

    public Cadres contentKo(String contentKo) {
        this.setContentKo(contentKo);
        return this;
    }

    public void setContentKo(String contentKo) {
        this.contentKo = contentKo;
    }

    public Set<Files> getFiles() {
        return this.files;
    }


    public CadresCategory getCadresCategory() {
        return this.cadresCategory;
    }

    public void setCadresCategory(CadresCategory cadresCategory) {
        this.cadresCategory = cadresCategory;
    }

    public Cadres cadresCategory(CadresCategory cadresCategory) {
        this.setCadresCategory(cadresCategory);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cadres)) {
            return false;
        }
        return id != null && id.equals(((Cadres) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cadres{" +
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
