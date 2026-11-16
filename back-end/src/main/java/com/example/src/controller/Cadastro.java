package com.example.src.controller;

import com.example.src.bo.LoginTentativas;
import com.example.src.dao.NovaConta;
import com.example.src.model.Cliente;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@CrossOrigin(origins = "http://localHost:5173")
public class Cadastro extends Cliente{
    @PostMapping("/cadastro")
    public void login(@RequestBody Cadastro json) throws SQLException, InterruptedException{

        setEmail(json.getEmail());

        String e = json.getEmail();
        String s = json.getSenha();

        System.out.println(json.getSenha());

        NovaConta.cadastro(e,s);


    }

}
