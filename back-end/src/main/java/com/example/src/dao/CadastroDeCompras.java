package com.example.src.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class CadastroDeCompras {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String usuario;

    @Value("${spring.datasource.password}")
    private String senhaDB;

    // Obs: não guardar chavePessoa/chaveProduto como atributos da classe.
    // Este @Component é compartilhado entre todas as requisições, então o valor de um
    // usuário "vazava" para o próximo (ex.: e-mail não encontrado devolvia a chave do anterior).

    public void cadastroCompras(String chavePessoa, String chaveProduto, int quantidade) throws SQLException {

        String sql = "INSERT INTO LISTA_COMPRAS (FK_CLIENTE, FK_PRODUTO, QUANTIDADE) VALUES (?, ?, ?)";

        try (Connection conexao = DriverManager.getConnection(url, usuario, senhaDB);
             PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, chavePessoa);
            ps.setString(2, chaveProduto);
            ps.setInt(3, quantidade);
            ps.executeUpdate();
        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
            throw eSQl;
        }
    }

    /** Chave primária do cliente pelo e-mail, ou null se não existir. */
    public String chavePessoa(String email) throws SQLException {
        return buscarChave("SELECT * FROM CLIENTES WHERE EMAIL = ?", email);
    }

    /** Chave primária do produto pelo nome, ou null se não existir. */
    public String chaveProduto(String nomeProduto) throws SQLException {
        return buscarChave("SELECT * FROM PRODUTOS WHERE NOME = ?", nomeProduto);
    }

    private String buscarChave(String sql, String valor) throws SQLException {
        try (Connection conexao = DriverManager.getConnection(url, usuario, senhaDB);
             PreparedStatement ps = conexao.prepareStatement(sql)) {
            ps.setString(1, valor);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? rs.getString(1) : null;
            }
        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
            throw eSQl;
        }
    }
}
