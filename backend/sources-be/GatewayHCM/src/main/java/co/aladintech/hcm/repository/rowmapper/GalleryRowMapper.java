package co.aladintech.hcm.repository.rowmapper;

import co.aladintech.hcm.domain.Gallery;
import co.aladintech.hcm.domain.enumeration.GalleryType;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Gallery}, with proper type conversions.
 */
@Service
public class GalleryRowMapper implements BiFunction<Row, String, Gallery> {

    private final ColumnConverter converter;

    public GalleryRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Gallery} stored in the database.
     */
    @Override
    public Gallery apply(Row row, String prefix) {
        Gallery entity = new Gallery();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setNameKo(converter.fromRow(row, prefix + "_name_ko", String.class));
        entity.setType(converter.fromRow(row, prefix + "_jhi_type", GalleryType.class));
        return entity;
    }
}
