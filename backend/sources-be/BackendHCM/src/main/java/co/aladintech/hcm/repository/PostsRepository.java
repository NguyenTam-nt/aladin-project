package co.aladintech.hcm.repository;

import co.aladintech.hcm.domain.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Posts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostsRepository extends JpaRepository<Posts, Long> {
    Page<Posts> findAllByType(String type, Pageable pageable);
}
