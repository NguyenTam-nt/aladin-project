package co.aladintech.hcm.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class HeaderNavbarSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("jhi_index", table, columnPrefix + "_jhi_index"));
        columns.add(Column.aliased("name", table, columnPrefix + "_name"));
        columns.add(Column.aliased("name_ko", table, columnPrefix + "_name_ko"));
        columns.add(Column.aliased("jhi_link", table, columnPrefix + "_jhi_link"));
        columns.add(Column.aliased("parent", table, columnPrefix + "_parent"));

        return columns;
    }
}
