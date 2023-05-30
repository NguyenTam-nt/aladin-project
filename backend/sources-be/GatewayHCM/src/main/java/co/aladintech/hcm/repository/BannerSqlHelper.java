package co.aladintech.hcm.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class BannerSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("jhi_type", table, columnPrefix + "_jhi_type"));
        columns.add(Column.aliased("jhi_link", table, columnPrefix + "_jhi_link"));

        return columns;
    }
}
