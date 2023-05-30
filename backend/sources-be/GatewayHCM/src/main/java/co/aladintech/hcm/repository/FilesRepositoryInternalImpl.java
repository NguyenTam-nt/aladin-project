package co.aladintech.hcm.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import co.aladintech.hcm.domain.Files;
import co.aladintech.hcm.repository.rowmapper.CadresRowMapper;
import co.aladintech.hcm.repository.rowmapper.ContentSessionRowMapper;
import co.aladintech.hcm.repository.rowmapper.FilesRowMapper;
import co.aladintech.hcm.repository.rowmapper.GalleryRowMapper;
import co.aladintech.hcm.repository.rowmapper.NewsRowMapper;
import co.aladintech.hcm.repository.rowmapper.SubjectRowMapper;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.BiFunction;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the Files entity.
 */
@SuppressWarnings("unused")
class FilesRepositoryInternalImpl extends SimpleR2dbcRepository<Files, Long> implements FilesRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final ContentSessionRowMapper contentsessionMapper;
    private final NewsRowMapper newsMapper;
    private final CadresRowMapper cadresMapper;
    private final SubjectRowMapper subjectMapper;
    private final GalleryRowMapper galleryMapper;
    private final FilesRowMapper filesMapper;

    private static final Table entityTable = Table.aliased("files", EntityManager.ENTITY_ALIAS);
    private static final Table contentSessionTable = Table.aliased("content_session", "contentSession");
    private static final Table newsTable = Table.aliased("news", "news");
    private static final Table cadresTable = Table.aliased("cadres", "cadres");
    private static final Table subjectTable = Table.aliased("subject", "subject");
    private static final Table galleryTable = Table.aliased("gallery", "gallery");

    public FilesRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        ContentSessionRowMapper contentsessionMapper,
        NewsRowMapper newsMapper,
        CadresRowMapper cadresMapper,
        SubjectRowMapper subjectMapper,
        GalleryRowMapper galleryMapper,
        FilesRowMapper filesMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Files.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.contentsessionMapper = contentsessionMapper;
        this.newsMapper = newsMapper;
        this.cadresMapper = cadresMapper;
        this.subjectMapper = subjectMapper;
        this.galleryMapper = galleryMapper;
        this.filesMapper = filesMapper;
    }

    @Override
    public Flux<Files> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Files> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = FilesSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(ContentSessionSqlHelper.getColumns(contentSessionTable, "contentSession"));
        columns.addAll(NewsSqlHelper.getColumns(newsTable, "news"));
        columns.addAll(CadresSqlHelper.getColumns(cadresTable, "cadres"));
        columns.addAll(SubjectSqlHelper.getColumns(subjectTable, "subject"));
        columns.addAll(GallerySqlHelper.getColumns(galleryTable, "gallery"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(contentSessionTable)
            .on(Column.create("content_session_id", entityTable))
            .equals(Column.create("id", contentSessionTable))
            .leftOuterJoin(newsTable)
            .on(Column.create("news_id", entityTable))
            .equals(Column.create("id", newsTable))
            .leftOuterJoin(cadresTable)
            .on(Column.create("cadres_id", entityTable))
            .equals(Column.create("id", cadresTable))
            .leftOuterJoin(subjectTable)
            .on(Column.create("subject_id", entityTable))
            .equals(Column.create("id", subjectTable))
            .leftOuterJoin(galleryTable)
            .on(Column.create("gallery_id", entityTable))
            .equals(Column.create("id", galleryTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Files.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Files> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Files> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private Files process(Row row, RowMetadata metadata) {
        Files entity = filesMapper.apply(row, "e");
        entity.setContentSession(contentsessionMapper.apply(row, "contentSession"));
        entity.setNews(newsMapper.apply(row, "news"));
        entity.setCadres(cadresMapper.apply(row, "cadres"));
        entity.setSubject(subjectMapper.apply(row, "subject"));
        entity.setGallery(galleryMapper.apply(row, "gallery"));
        return entity;
    }

    @Override
    public <S extends Files> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
