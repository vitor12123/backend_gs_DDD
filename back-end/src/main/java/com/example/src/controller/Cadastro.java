package com.example.src.controller;

import com.example.src.bo.RegrasNovasContas;
import com.example.src.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class Cadastro extends Cliente{

    @Autowired
    private RegrasNovasContas regrasNovasContas;

    @PostMapping("/cadastro")
    public boolean login(@RequestBody Cadastro json) throws SQLException, InterruptedException{

        String e = json.getEmail();
        String s = json.getSenha();
        String cpf = json.getCpf();
        String cep = json.getCep();

        System.out.println(0);

        if(regrasNovasContas.verificacao(e,s,cpf,cep)){
            System.out.println(1);
            return true;
        }

        return false;

    }

}
