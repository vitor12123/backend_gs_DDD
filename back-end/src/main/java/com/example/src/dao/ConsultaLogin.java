package com.example.src.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ConsultaLogin {

    public static ArrayList<String> consultaEmail(String email, String senha) throws SQLException, InterruptedException {

        boolean resultado = false;

        ArrayList<String> loginPessoa = new ArrayList<>();

        Connection conexao = null;
        String sql = String.format("SELECT * FROM usuario WHERE email_usu = '%s' AND sn_usu = '%s'", email, senha);

        try {
            conexao = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/teste1", "backend_sprint", "senha_do_backend");
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
