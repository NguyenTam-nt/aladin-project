package co.aladintech.hcm.service.dto;

import co.aladintech.hcm.domain.FooterLinkNewsItem;

import java.util.List;

public class FooterLinkNewsDTO {
    private Long id;
    private String name;

    private String nameKo;

    private Boolean status;

    private List<FooterLinkNewsItem> items;

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

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

    public List<FooterLinkNewsItem> getItems() {
        return items;
    }

    public void setItems(List<FooterLinkNewsItem> items) {
        this.items = items;
    }
}
