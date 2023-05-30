package co.aladintech.hcm.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import co.aladintech.hcm.domain.News;
import co.aladintech.hcm.repository.rowmapper.NewsCategoryRowMapper;
import co.aladintech.hcm.repository.rowmapper.NewsRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the News entity.
 */
@SuppressWarnings("unused")
class NewsRepositoryInternalImpl extends SimpleR2dbcRepository<News, Long> implements NewsRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final NewsCategoryRowMapper newscategoryMapper;
    private final NewsRowMapper newsMapper;

    private static final Table entityTable = Table.aliased("news", EntityManager.ENTITY_ALIAS);
    private static final Table newsCategoryTable = Table.aliased("news_category", "newsCategory");

    public NewsRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        NewsCategoryRowMapper newscategoryMapper,
        NewsRowMapper newsMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(News.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.newscategoryMapper = newscategoryMapper;
        this.newsMapper = newsMapper;
    }

    @Override
    public Flux<News> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<News> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = NewsSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(NewsCategorySqlHelper.getColumns(newsCategoryTable, "newsCategory"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(newsCategoryTable)
            .on(Column.create("news_category_id", entityTable))
            .equals(Column.create("id", newsCategoryTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, News.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<News> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<News> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private News process(Row row, RowMetadata metadata) {
        News entity = newsMapper.apply(row, "e");
        entity.setNewsCategory(newscategoryMapper.apply(row, "newsCategory"));
        return entity;
    }

    @Override
    public <S extends News> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
