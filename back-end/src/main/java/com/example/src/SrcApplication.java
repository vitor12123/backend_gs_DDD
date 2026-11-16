package com.example.src;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SrcApplication {

	public static void main(String[] args) {
		SpringApplication.run(SrcApplication.class, args);
	}

	// continuar com a ideia de fazer o cancelamento de pedidos, obs não começamos ainda, ou seja tem que adicionar carrinho de compra, cancelamento em ate 24h, e no banco de dados tem que ter email, senha, cpf, e cep.
	// na tabela de produtos tem que ter nome do produto, preço, descrição do produto.

}
