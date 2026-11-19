package com.example.src.controller;

import com.example.src.dao.CadastroDeCompras;
import com.example.src.model.ListaDeCompras;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class NovaCompra {

    @Autowired
    private CadastroDeCompras cadastroDeCompras;

    @PostMapping("/compras")
    public ResponseEntity<String> compra(@RequestBody ListaDeCompras json) throws SQLException {

        String email = json.getEmailCliente();
        String nomeProduto = json.getNomeProduto();
        int quantidade = json.getQuantidade();

        System.out.println(email);
        System.out.println(nomeProduto);
        System.out.println(quantidade);

        if (quantidade <= 0) {
            return ResponseEntity.badRequest().body("Quantidade inválida.");
        }

        String chavePessoa = cadastroDeCompras.chavePessoa(email);
        if (chavePessoa == null) {
            return ResponseEntity.badRequest().body("Cliente não encontrado.");
        }

        String chaveProduto = cadastroDeCompras.chaveProduto(nomeProduto);
        if (chaveProduto == null) {
            return ResponseEntity.badRequest().body("Produto não encontrado.");
        }

        cadastroDeCompras.cadastroCompras(chavePessoa, chaveProduto, quantidade);

        return ResponseEntity.ok("true");
    }
}
