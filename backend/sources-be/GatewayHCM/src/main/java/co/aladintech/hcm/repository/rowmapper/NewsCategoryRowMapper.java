package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.NewsCategory;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link NewsCategory}, with proper type conversions.
 */
@Service
public class NewsCategoryRowMapper implements BiFunction<Row, String, NewsCategory> {

    private final ColumnConverter converter;

    public NewsCategoryRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link NewsCategory} stored in the database.
     */
    @Override
    public NewsCategory apply(Row row, String prefix) {
        NewsCategory entity = new NewsCategory();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setNameKo(converter.fromRow(row, prefix + "_name_ko", String.class));
        return entity;
    }
}
