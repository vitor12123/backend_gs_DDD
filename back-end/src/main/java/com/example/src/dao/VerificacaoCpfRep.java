package com.example.src.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Component
public class VerificacaoCpfRep {
    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String usuario;

    @Value("${spring.datasource.password}")
    private String senhaDB;

    public boolean verificacaoDeRegrasContaNova(String email, String cpf) throws SQLException, InterruptedException {

        System.out.println(0.1);

        String e;
        String c;

        Connection conexao = null;
        String sql = String.format("SELECT * FROM clientes WHERE EMAIL = '%s' or cpf = '%s'", email, cpf);

        try {
            System.out.println(0.2);
            conexao = DriverManager.getConnection(url, usuario, senhaDB);
            ResultSet puxarLogin = conexao.createStatement().executeQuery(sql);

            if (puxarLogin.next()){
                System.out.println(0.3);
                return false;
            }

        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
        } finally {
            if (conexao != null) {
                conexao.close();
            }
        }
        System.out.println(0.6);
        return true;
    }
}
