package com.example.src.bo;

import com.example.src.dao.ConsultaLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Objects;

@Component
public class LoginTentativas {

    @Autowired
    private ConsultaLogin consultaLogin;

    int contador = 0;

    public boolean consultaDB(String email, String senha) throws SQLException, InterruptedException {

        ArrayList<String> consultaEmail = consultaLogin.consultaEmail(email,senha);

        if (!Objects.equals(consultaEmail.get(0),"nao encontrado")){
            contador += 1;
            return true;
        }
        else{
            contador+=1;
            if (contador > 3) {
                System.out.println("senha ou email errados muitas vezes espere 5 minutos.");
                Thread.sleep(300000);
                contador = 0;
            }
            return false;
        }
    }



}
