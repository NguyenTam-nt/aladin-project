package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Banner;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Banner}, with proper type conversions.
 */
@Service
public class BannerRowMapper implements BiFunction<Row, String, Banner> {

    private final ColumnConverter converter;

    public BannerRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Banner} stored in the database.
     */
    @Override
    public Banner apply(Row row, String prefix) {
        Banner entity = new Banner();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setType(converter.fromRow(row, prefix + "_jhi_type", String.class));
        entity.setLink(converter.fromRow(row, prefix + "_jhi_link", String.class));
        return entity;
    }
}
