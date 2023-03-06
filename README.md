# TesteFirst

Este projeto foi desenvolvido como parte do teste de admissão da empresa F1st Tecnologia.

## Desafio

Tela com formulários para formalização digital.

### Etapas

- Dados do cliente e Produto
- Simulação
- Formalização de contratação do produto
- Integrar com json-server (chamar um endpoint que retorna uma requisição mock).

Obs.: Definição de objetos e propriedades é livre.
Obs.: Definição de payloads é livre.

Será avaliada a navegabilidade entre as telas, integração comsumindo endpoints e estrutura de pacotes.


## Iniciando o projeto

Para iniciar, rode o comando ng serve para iniciar a aplicação na rota 4200 (localhost:4200).
Inicie o banco de dados mock a partir do comando: json-server --watch db.json (localhost:3000).

Se o banco de dados não for iniciado, não será possível fazer qualquer ação dentro da aplicação.

## Fluxo

Ao iniciar a página, o usuário encontrará cards e uma navbar. Como este é um projeto básico, apenas algumas funcionalidades foram implementadas.

Apenas o card de financiamento veicular está habilitado para uso. E o mesmo está protegido por um guarda de rota, que verifica se o usuário está "autenticado".

## Sign-in / Sign-up
### Pela navbar
Para fazer o sign-in, o usuário deverá digitar um CPF válido na navbar, que irá buscar no banco de dados, se o usuário é existente ou não.

Em caso de novo usuário, o sistema irá direcioná-lo para a página de Sign-up, onde ele deverá informar seus dados pessoais para cadastro. Após o cadastro, ele será retornado para a página inicial, onde poderá acessar o card de financiamento veicular.

### Pelo card de financiamento
Se o usuário não cadastrado clicar no card, será direcionado para a página de login, onde deverá informar sua agência e conta.

Em caso de novo usuário, após a informação, ele será direcionado para a página de sign-up.
Caso contrário, será redirecionado para a página de financiamento veicular..

## Financiamento veicular
A página de financiamento veicular foi feita com base na página de simulação de financiamento veicular do Banco Bv. Apenas como exemplo.

Nesta página, o principal foco é obter informações de onde o veículo será vendido (informações do vendedor), qual o veículo e quanto o usuário pretenderá financiar, com base em dados retirados da API da tabela FIPE (notei que às vezes algumas vezes a API fica instável, retornando status 400).

A aplicação também faz integração com a API do viaCEP, facilitando a busca pelos dados de endereço do usuário.

A aplicação busca o preço médio do veículo e deduz do valor de entrada (caso seja fornecido), o valor bruto do financiamento. O valor mínimo de financiamento é de R$ 10.000,00.

Após escolher uma data de vencimento da primeira parcela, que poderá ser escolhida a partir do próximo mês até o mês subsequente e a quantidade de parcelas que desejará pagar, o usuário será direcionado para a página de contratação do financiamento, onde serão exibidos os valores.

Para formalizar o pedido de financiamento, o usuário deverá marcar o checkbox no fim da tabela e em seguida clicar no botão.

## Banco de dados

Após o sign-up, o banco de dados deverá conter as informações fornecidas pelo usuário na página de sign-up.

Após a contratação do financiamento, o banco de dados deverá conter todas as informações fornecidas pelo usuário na página de financiamento veicular.
