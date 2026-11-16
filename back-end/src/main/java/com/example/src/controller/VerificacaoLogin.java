package com.example.src.controller;

import com.example.src.bo.LoginTentativas;
import com.example.src.dao.ConsultaLogin;
import com.example.src.model.Cliente;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localHost:5173")
public class VerificacaoLogin extends Cliente {
    @PostMapping("/verificarLogin")
    public boolean login(@RequestBody VerificacaoLogin json) throws SQLException, InterruptedException{

        setEmail(json.getEmail());

        String e = json.getEmail();
        String s = json.getSenha();

        System.out.println(json.getSenha());

        return LoginTentativas.consultaDB(e,s);

    }
}
