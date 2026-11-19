package com.example.src.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class ConsultaListaCompras {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String usuario;

    @Value("${spring.datasource.password}")
    private String senhaDB;

    public List<Map<String, Object>> consultaCompras(String chavePessoa) throws SQLException {

        List<Map<String, Object>> compras = new ArrayList<>();

        if (chavePessoa == null) {
            return compras;
        }

        try (Connection conexao = DriverManager.getConnection(url, usuario, senhaDB)) {

            Map<String, String> nomesProdutos = carregarNomesProdutos(conexao);

            String sql = "SELECT ID_COMPRA, FK_PRODUTO, DATA_COMPRA, STATUS, QUANTIDADE "
                    + "FROM LISTA_COMPRAS WHERE FK_CLIENTE = ?";
            try (PreparedStatement ps = conexao.prepareStatement(sql)) {
                ps.setString(1, chavePessoa);

                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        Map<String, Object> compra = new LinkedHashMap<>();

                        String fkProduto = rs.getString("FK_PRODUTO");
                        Timestamp data = rs.getTimestamp("DATA_COMPRA");

                        compra.put("idCompra", rs.getInt("ID_COMPRA"));
                        compra.put("nomeProduto", nomesProdutos.getOrDefault(fkProduto, "Produto #" + fkProduto));
                        compra.put("quantidade", rs.getInt("QUANTIDADE"));
                        compra.put("dataCompra", data != null ? data.toLocalDateTime().toString() : null);
                        compra.put("status", rs.getString("STATUS"));

                        compras.add(compra);
                    }
                }
            }
        } catch (SQLException eSQl) {
            System.out.println("erro ao tentar acessar o banco de dados " + eSQl.getMessage());
            throw eSQl;
        }

        return compras;
    }

    private Map<String, String> carregarNomesProdutos(Connection conexao) throws SQLException {
        Map<String, String> nomes = new HashMap<>();
        try (PreparedStatement ps = conexao.prepareStatement("SELECT * FROM PRODUTOS");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                nomes.put(rs.getString(1), rs.getString("NOME"));
            }
        }
        return nomes;
    }
}