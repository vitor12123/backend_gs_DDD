package com.example.src.controller;

import com.example.src.dao.CadastroDeCompras;
import com.example.src.dao.ConsultaListaCompras;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
public class HistoricoDeCompras {

    @Autowired
    private CadastroDeCompras cadastroDeCompras;

    @Autowired
    private ConsultaListaCompras consultaListaCompras;

    @GetMapping("/compras/historico")
    public List<Map<String, Object>> historico(@RequestParam String email) throws SQLException {

        // Se o e-mail não existir, chavePessoa é null e a lista volta vazia (antes dava erro 500)
        String chavePessoa = cadastroDeCompras.chavePessoa(email);

        List<Map<String, Object>> compras = consultaListaCompras.consultaCompras(chavePessoa);
        System.out.println(compras);

        return compras;
    }
}
