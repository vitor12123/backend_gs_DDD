package com.example.src.model;

public class Cliente {

    private static String email;
    private String senha;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public static String getEmail() {
        return  email;
    }

    public String getSenha() {
        return senha;
    }

}
