package com.example.src.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Component
public class ConsultaLogin {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String usuario;

    @Value("${spring.datasource.password}")
    private String senhaDB;

    public ArrayList<String> consultaEmail(String email, String senha) throws SQLException, InterruptedException {

        boolean resultado = false;

        ArrayList<String> loginPessoa = new ArrayList<>();

        Connection conexao = null;
        String sql = String.format("SELECT * FROM clientes WHERE EMAIL = '%s' AND SENHA = '%s'", email, senha);

        try {
            conexao = DriverManager.getConnection(url, usuario, senhaDB);
            ResultSet puxarLogin = conexao.createStatement().executeQuery(sql);

            if (puxarLogin.next()) {
                resultado = true;
            }

        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
        } finally {
            if (conexao != null) {
                conexao.close();
            }
        }
        if(resultado) {
            loginPessoa.add(email);
            loginPessoa.add(senha);
            return loginPessoa;
        }
        else{
            loginPessoa.add("nao encontrado");
            return loginPessoa;
        }
    }

}
