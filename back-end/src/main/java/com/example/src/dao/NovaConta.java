package com.example.src.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.*;

@Component
public class NovaConta {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String usuario;

    @Value("${spring.datasource.password}")
    private String senhaDB;

    public void cadastro(String email, String senha, String cpf, String cep) throws SQLException, InterruptedException {

        System.out.println(0.5);

        Connection conexao = null;
        String sql = String.format("INSERT INTO CLIENTES (EMAIL, SENHA, CPF, CEP) VALUES ('%s', '%s', '%s', '%s')", email, senha, cpf, cep);

        try {
            conexao = DriverManager.getConnection(url, usuario, senhaDB);
            ResultSet puxarLogin = conexao.createStatement().executeQuery(sql);

        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
        } finally {
            if (conexao != null) {
                conexao.close();
            }
        }

    }
}
