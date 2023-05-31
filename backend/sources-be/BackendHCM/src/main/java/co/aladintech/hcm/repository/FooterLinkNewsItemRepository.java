package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.FooterLinkNews;
import co.aladintech.hcm.domain.FooterLinkNewsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FooterLinkNewsItemRepository extends JpaRepository<FooterLinkNewsItem, Long> {
    List<FooterLinkNewsItem> findAllByParentId(Long id);

    @Transactional
    @Modifying
    void deleteAllByParentId(Long id);
}
