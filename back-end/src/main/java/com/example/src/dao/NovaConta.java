package com.example.src.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

public class NovaConta {

    public static void cadastro(String email, String senha) throws SQLException, InterruptedException {

        Connection conexao = null;
        String sql = String.format("INSERT INTO usuario (email_usu, sn_usu) VALUES ('%s', '%s')", email, senha);

        try {
            conexao = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/teste1", "backend_sprint", "senha_do_backend");
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
