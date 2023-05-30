package co.aladintech.hcm.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import co.aladintech.hcm.domain.CadresCategory;
import co.aladintech.hcm.repository.rowmapper.CadresCategoryRowMapper;
import co.aladintech.hcm.repository.rowmapper.CadresRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the CadresCategory entity.
 */
@SuppressWarnings("unused")
class CadresCategoryRepositoryInternalImpl extends SimpleR2dbcRepository<CadresCategory, Long> implements CadresCategoryRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CadresRowMapper cadresMapper;
    private final CadresCategoryRowMapper cadrescategoryMapper;

    private static final Table entityTable = Table.aliased("cadres_category", EntityManager.ENTITY_ALIAS);
    private static final Table cadresTable = Table.aliased("cadres", "cadres");

    public CadresCategoryRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CadresRowMapper cadresMapper,
        CadresCategoryRowMapper cadrescategoryMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(CadresCategory.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.cadresMapper = cadresMapper;
        this.cadrescategoryMapper = cadrescategoryMapper;
    }

    @Override
    public Flux<CadresCategory> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<CadresCategory> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = CadresCategorySqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CadresSqlHelper.getColumns(cadresTable, "cadres"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(cadresTable)
            .on(Column.create("cadres_id", entityTable))
            .equals(Column.create("id", cadresTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, CadresCategory.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<CadresCategory> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<CadresCategory> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private CadresCategory process(Row row, RowMetadata metadata) {
        CadresCategory entity = cadrescategoryMapper.apply(row, "e");
        entity.setCadres(cadresMapper.apply(row, "cadres"));
        return entity;
    }

    @Override
    public <S extends CadresCategory> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
