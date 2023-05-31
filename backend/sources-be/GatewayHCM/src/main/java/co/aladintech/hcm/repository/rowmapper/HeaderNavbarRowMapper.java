package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.HeaderNavbar;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link HeaderNavbar}, with proper type conversions.
 */
@Service
public class HeaderNavbarRowMapper implements BiFunction<Row, String, HeaderNavbar> {

    private final ColumnConverter converter;

    public HeaderNavbarRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link HeaderNavbar} stored in the database.
     */
    @Override
    public HeaderNavbar apply(Row row, String prefix) {
        HeaderNavbar entity = new HeaderNavbar();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setIndex(converter.fromRow(row, prefix + "_jhi_index", Integer.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setNameKo(converter.fromRow(row, prefix + "_name_ko", String.class));
        entity.setLink(converter.fromRow(row, prefix + "_jhi_link", String.class));
        entity.setParent(converter.fromRow(row, prefix + "_parent", Long.class));
        return entity;
    }
}
