package com.example.src.bo;

import com.example.src.dao.NovaConta;
import com.example.src.dao.VerificacaoCpfRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;

@Component
public class RegrasNovasContas {

    @Autowired
    private NovaConta novaConta;

    @Autowired
    private VerificacaoCpfRep verificador;

    public boolean verificacao(String e, String s ,String cpf, String cep) throws SQLException, InterruptedException{
        System.out.println(0.4);

        if(verificador.verificacaoDeRegrasContaNova(e,cpf)) {
            novaConta.cadastro(e,s,cpf,cep);
            return true;
        }
        else{
            return false;
        }

    }

}
