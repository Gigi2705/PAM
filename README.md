# App de Cadastro e Consulta de Pessoas

## Vídeo: https://youtube.com/shorts/T11B_TbgCPQ

## Descrição do projeto
Um aplicativo mobile em React Native que permite realizar as operações do CRUD(cadastrar, editar, deletar e visualizar pessoas) de pessoas(ex.: firstName, lastName, email, phone).

## Tecnologias utilizadas
- React Native
- API JSON Server
- Expo (No caso, meu aplicativo Expo Go não esta funcionando então fiz tudo no web)
- LocalTunnel

## Instalação e Execução

1. **Clone o repositório:**
git clone https://github.com/Gigi2705/PAM.git

2. **Acesse a pasta do projeto:**
cd backend

- Instale o JSON Server globalmente:
npm install -g json-server

- Rode a API:
npx json-server --watch db.json --port 3000

- Rodando a API no terminal, abra um novo terminal e acesse a pasta do projeto:
cd backend

- Agora para gerar uma URL pública, eu optei por utilizar o LocalTunnel, então instale globalmente:
npm install -g localtunnel

- Logo depois disso rode:
lt --port 3000 (Esse não funcionou quando tentei rodar, então utilizei o que está logo abaixo)
npx localtunnel --port 3000

Após esse comando o terminal ira gerar um link, e esse link vc colocará no arquivo configApi.js, que está dentro da pasta MeuCrud em services.

- Para rodarmos a aplicaçao mobile, você irá abrir um novo terminal e rodar:
cd MeuCrud

- Será necessário fazer algumas intalações de dependências, então rode:
npm i
npm install expo
npm install @react-navigation/native
npm intall @react-navigation/native-stack

(Acho que são só essas, caso falte alguma irá dar erro no terminal, se aparecer um erro normalmente o terminal manda a dependência que está faltando **npm notice To update run: npm install..**)

- Agora para rodarmos o projeto basta escrever no terminal:
npx expo start 
      ou
npx expo start --tunnel 

Como meu Expo Go está falando que o projeto é incompativel com a versão dele, estou rodando esse comando e logo depois clicando a tecla w para rodar no web.

## Explicação da solução

A solução foi implementada separando responsabilidades:

Persistência (simulada) dos dados:
Os registros ficam no arquivo Backend/db.json, no array people.
Um servidor simples (ex.: json-server) expõe esse arquivo como uma API REST.

Aplicativo mobile:
O app (Expo/React Native) consome a API para:
Listar pessoas
Cadastrar nova pessoa
Editar dados
Remover registros
A navegação entre telas é feita com React Navigation.

Acesso do celular ao backend:
Quando necessário, o localtunnel expõe a API local para uma URL pública, facilitando testes em dispositivos físicos.
