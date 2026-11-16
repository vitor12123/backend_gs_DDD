package com.example.src.bo;

import com.example.src.dao.ConsultaLogin;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Objects;

public class LoginTentativas extends ConsultaLogin {

    static int contador = 0;

    public static boolean consultaDB(String email, String senha) throws SQLException, InterruptedException {

        ArrayList<String> consultaEmail = ConsultaLogin.consultaEmail(email,senha);

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
