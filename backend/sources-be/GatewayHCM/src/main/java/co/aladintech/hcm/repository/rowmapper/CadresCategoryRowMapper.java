package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.CadresCategory;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link CadresCategory}, with proper type conversions.
 */
@Service
public class CadresCategoryRowMapper implements BiFunction<Row, String, CadresCategory> {

    private final ColumnConverter converter;

    public CadresCategoryRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link CadresCategory} stored in the database.
     */
    @Override
    public CadresCategory apply(Row row, String prefix) {
        CadresCategory entity = new CadresCategory();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setNameKo(converter.fromRow(row, prefix + "_name_ko", String.class));
        entity.setCadresId(converter.fromRow(row, prefix + "_cadres_id", Long.class));
        return entity;
    }
}
