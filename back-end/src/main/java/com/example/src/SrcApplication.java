package com.example.src;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SrcApplication {

	public static void main(String[] args) {
		SpringApplication.run(SrcApplication.class, args);
	}

	// continuar com a ideia de fazer o cancelamento de pedidos, obs não começamos ainda, o cancelamento em ate 24h, e na tabela de clientes tem que ter chave primaria cliente, email, senha, cpf, e cep. (feito)
	// vamos colocar tambem tudo que o cliente comprou em 1 ano.
	// na tabela de produtos tem que ter nome do produto, preço, descrição do produto, e chave primaria produto. (feito)
	// tres tabelas na banco de dados: produtos, clientes, lista de compras; a lista de compras vai ter um fk_cliente, que vai ser a chave primaria do cliente, data da compra , e a chave primaria do produto. (feito)
	// quando passar do db pro backend, quando o front fazer a requisição, ele verifica quais datas passaram de 1 ano, e apaga essas do db e depois desse filtro ele entrega para o front, para colocar na lista de itens comprados é la que se cancela o pedido.

}
