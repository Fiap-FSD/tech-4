<p align="center">
  <img src="./assets/Fiap-logo.jpg" width="400" /></a>
</p>

# ✨ Blog Post App - Front-End Mobile

Aplicativo mobile de blog desenvolvido com React Native, Expo e TypeScript. Permite que usuários criem, editem e visualizem posts, além de interagir com professores e alunos. A aplicação utiliza autenticação via JWT armazenado com AsyncStorage e segue uma arquitetura modular e escalável.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## 🎯 Objetivos do Projeto

- Desenvolver uma interface gráfica para uma aplicação de blogging utilizando React Native.
- Garantir que a aplicação seja acessível e fácil de usar.
- Implementar autenticação segura com JWT.
- Consumir APIs externas para gerenciamento de posts, usuários e interações.

## 🛠️ Ferramentas Utilizadas

A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

- **Visual Studio Code**: Ferramenta utilizada para escrita e execução de código, com extensões específicas para TypeScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

- **GitHub**: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência.

- **Expo**: Framework para React Native que fornece uma camada de abstração, simplificando o desenvolvimento de aplicativos. Oferece ferramentas e serviços que facilitam a construção, execução e depuração da aplicação em diferentes dispositivos.

- **React Native**: Biblioteca utilizada para o desenvolvimento do aplicativo mobile. Permite criar interfaces nativas utilizando TypeScript e React, com ótima performance e experiência do usuário semelhante à de apps desenvolvidos de forma nativa.

- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários. O JWT é um token seguro transmitido entre o cliente e o servidor, permitindo que o usuário acesse áreas protegidas com base na autenticação bem-sucedida.

- **Axios**:  Biblioteca usada para fazer requisições HTTP e buscar dados de uma API externa. O Axios foi utilizado para buscar os posts, docentes e alunos do servidor, além de enviar as informações do usuário, permitindo uma integração fluida com a API do backend.


## 🧱 Arquitetura da Aplicação
A arquitetura do projeto segue o padrão do React Native com Expo, voltado para o desenvolvimento de aplicações mobile nativas multiplataforma (Android e iOS), utilizando TypeScript. A aplicação é estruturada de forma modular e escalável, promovendo desenvolvimento orientado a componentes, com foco em reutilização de código, separação de responsabilidades e organização eficiente.

A utilização do Expo simplifica o gerenciamento de bibliotecas nativas e permite um ciclo de desenvolvimento rápido e otimizado. A arquitetura também faz uso do React Navigation, proporcionando uma navegação fluida entre telas, com suporte a pilhas de navegação, abas, rotas dinâmicas e parâmetros tipados com segurança via TypeScript.

Essa abordagem melhora tanto a experiência de desenvolvimento quanto a experiência do usuário, oferecendo interfaces responsivas, navegação intuitiva e comunicação eficiente com APIs externas.

## 📐 Camadas e Estrutura
Apresentação (UI): Componentes React Native responsáveis pela interface gráfica e interação com o usuário.

Serviços: Módulos que encapsulam chamadas à API utilizando Axios, facilitando a comunicação com o back-end.

Gerenciamento de Estado: Utilização de contextos e hooks personalizados para gerenciar o estado da aplicação de forma eficiente.

Autenticação: Implementação de autenticação baseada em JWT, com tokens armazenados de forma segura no AsyncStorage nativo.

## 🗂️ Estrutura de Pastas
```
.
├── src/
│   ├── components/       # Componentes reutilizáveis de UI
│   ├── screens/          # Telas da aplicação
│   ├── services/         # Módulos de acesso à API
│   ├── contexts/         # Contextos para gerenciamento de estado
│   ├── hooks/            # Hooks personalizados
│   └── utils/            # Funções utilitárias
├── assets/               # Recursos estáticos (imagens, fontes)
├── App.tsx               # Componente principal da aplicação
├── app.json              # Configurações do projeto Expo
├── package.json          # Dependências e scripts do projeto
└── tsconfig.json         # Configurações do TypeScript
```

## 🔐 Segurança e Autenticação
A aplicação implementa autenticação de usuários utilizando JWT (JSON Web Tokens). Os tokens são armazenados de forma segura no AsyncStorage, garantindo persistência entre sessões e segurança nas requisições autenticadas.

## ⚙️ Integração com o Back-End
As comunicações com o back-end são realizadas por meio de requisições HTTP utilizando Axios. Os serviços são organizados em módulos, facilitando a manutenção e a escalabilidade da aplicação.

## 📱 Experiência do Usuário
O projeto prioriza uma experiência de usuário fluida e responsiva, com interfaces intuitivas e navegação simplificada. O uso de React Native permite a entrega de uma aplicação nativa com desempenho otimizado para dispositivos móveis.

### 🖌️ Funcionalidades
1. Página de Login:

  - O usuário pode inserir um email e senha para se autenticar, alunos e professores terão seu usuário e senha.
  - O sistema redireciona o usuário para a página Home.
  - Apenas usuários autenticados poderão acessar páginas restritas, como criação, edição e administração de posts.

2. Página de Criação de Post:

  - Os usuários autenticados podem criar novos posts. O título, conteúdo, autor, introdução, imagem e link de vídeo podem ser inseridos/redefinidos.
  - Ao enviar o formulário, os dados são enviados para o servidor e o post é adicionado à lista de publicações.

3. Página de Edição de Post:

  - Os usuários podem editar uma postagem existente acessando a URL /edit/[id], onde [id] representa o identificador único da postagem.
  - A página carrega os dados atuais da postagem em um formulário editável.
  - O formulário permite alterar qualquer campo previamente preenchido, como título, conteúdo, imagem, etc.
  - Após as alterações, o usuário pode clicar no botão de salvar para atualizar o conteúdo no servidor.

4. Página de Detalhes do Post:

  - Essa página exibe as informações completas de uma publicação específica.
  - A página exibe os detalhes de um post específico, acessado pela URL /post/[id]

5. Página de Criação de Alunos/Professores:
   
 - Formulário para que alunos/professores autenticados possam cadastrar outros usuários.
 - Campos como nome, e-mail e senha do novo professor.
 - Após o envio, o novo usuário é registrado no sistema.

6. Página de Listagem de Usuários

 - Exibe uma lista paginada de alunos/professores cadastrados no sistema.
 - Cada item possui informações do usuário, botão de edição e exclusão.

7. Autenticação e Autorização
   
 - O sistema implementa controle de acesso com login via e-mail e senha.
 - As rotas protegidas são validadas antes de renderizar o conteúdo.

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão recomendada: 20.x)
- Expo CLI
- Yarn ou npm

### Passos:

#### Clone este repositório:

```bash
git clone https://github.com/Fiap-FSD/tech-4.git
cd tech-4
```

#### Instale as dependencia:

No terminal do projeto, rode:

```bash
 yarn install
  # ou
 npm install
```

#### Rodando Localmente:

Inicie o servidor de desenvolvimento:

```bash
 expo start
```

### Fluxo de Navegação
- A página inicial será carregada automaticamente.
- Para fazer login, acesse a página /login.
- Após o login, o usuário será redirecionado para a página home.
- Para editar um post, acesse /edit/[id], onde [id] é o identificador do post.
- Para visualizar os detalhes de um post, acesse /post/[id].

### Fluxo de Autenticação

A autenticação é feita usando JWT. Quando o usuário faz login, o token JWT é armazenado em um cookie e enviado com cada requisição subsequente. Caso o token não seja encontrado ou seja inválido, o usuário será redirecionado para a página de login.

#### Abra no seu navegador

Com o link que aparecerá no seu terminal, copie e cole no seu navegador.

## 💥 Deploy

O deploy é essencial para disponibilizar a aplicação para os usuários finais, garantindo que qualquer pessoa possa acessá-la diretamente pela internet, sem precisar instalar nada.

Optou-se pela Vercel porque ela possui suporte nativo ao Next.js, o framework utilizado no projeto. Além disso, o processo de deploy é extremamente simples e rápido.

Outro ponto importante é que a integração com o GitHub permite que o deploy seja automatizado, ou seja, sempre que realizamos um push na branch principal, a Vercel detecta as mudanças, faz o build e atualiza automaticamente a aplicação em produção.

👉 **[Link para o site](https://blog-post-tech3.vercel.app/)**  

👉 **[Link para o vídeo](https://www.youtube.com/watch?v=bK5arno51pw)**  

## 📜 Conclusão

O desenvolvimento deste projeto proporcionou à equipe uma experiência completa no ciclo de construção de um aplicativo mobile moderno, desde a concepção até a entrega funcional. Com o uso de ferramentas como Visual Studio Code, GitHub, Expo e React Native, foi possível estruturar uma aplicação escalável e eficiente, com foco em performance e experiência do usuário.

A arquitetura adotada, baseada em módulos bem definidos e com separação clara de responsabilidades, garantiu um código limpo, reutilizável e fácil de manter. A integração com o back-end por meio do Axios e o uso de JWT para autenticação reforçaram os conceitos de segurança e comunicação assíncrona entre cliente e servidor.

Além dos aspectos técnicos, o trabalho em equipe foi essencial para o sucesso do projeto. A colaboração via Discord, Github e as boas práticas com pull requests e revisão de código fortaleceram o aprendizado coletivo e simularam um ambiente real de desenvolvimento ágil.

Este projeto representa não apenas a entrega de uma solução funcional, mas também um avanço significativo nas habilidades práticas da equipe em desenvolvimento mobile, integração de APIs, controle de versão e aplicação de boas práticas de arquitetura.


