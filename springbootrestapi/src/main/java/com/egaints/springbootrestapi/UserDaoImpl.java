package com.egaints.springbootrestapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

public class UserDaoImpl {
    private final String INSERT_SQL = "INSERT INTO USERS(name, address, email) values(:name,:address,:email)";

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User create(final User user) {
        KeyHolder holder = new GeneratedKeyHolder();
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("firstName", user.getFirstName())
                .addValue("lastName", user.getLastName())
                .addValue("email", user.getEmail())
                .addValue("createdAt", user.getCreatedAt())
                .addValue("createdBy", user.getCreatedBy())
                .addValue("updatedAt", user.getUpdatedAt())
                .addValue("updatedBy", user.getUpdatedBy());
        namedParameterJdbcTemplate.update(INSERT_SQL, parameters, holder);
        user.setId(holder.getKey().intValue());
        return user;
    }
}

