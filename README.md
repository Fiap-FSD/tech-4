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


## 🏗️ Arquitetura da Aplicação

A arquitetura da aplicação foi projetada de forma modular e escalável, com separação clara entre responsabilidades. A seguir, os principais aspectos da organização do projeto:

- **Organização por funcionalidades**: O projeto segue uma estrutura baseada em pastas funcionais, onde cada feature (Login, Home, Profile, etc.) possui sua própria pasta contendo a tela (``.tsx``) e o arquivo de estilos (``styles.ts``).

- **Componentização**: Elementos reutilizáveis da interface, como o ``Header``, estão localizados na pasta ``components/``. Isso promove reutilização de código e facilita a manutenção da interface.

- **Gerenciamento de estado com Context API**: A pasta ``contexts/`` contém a lógica de autenticação compartilhada entre as telas, utilizando o padrão de Context API do React para controlar o estado do usuário logado e seu perfil (professor ou aluno).

- **Navegação centralizada**: Toda a navegação entre telas é gerenciada pelo React Navigation, inicializado no arquivo ``App.tsx``. Isso garante um fluxo unificado entre as views.

- **Integração com Backend**: A comunicação com o backend é feita por meio da biblioteca Axios (em arquivos de serviços que podem ser incluídos posteriormente), permitindo que as telas realizem chamadas autenticadas à API.

- **Tipagem com TypeScript:**: A pasta ``types/`` centraliza as interfaces e tipos utilizados ao longo da aplicação, promovendo consistência e evitando erros comuns.

### 📖 Estrutura dos diretórios:

A estrutura utilizada segue as convenções do Next.js para separação de componentes, páginas e contextos, mantendo o código modular e escalável.

```
📦tech-4  
 ┣ 📂assets
 ┃ ┣ 📜adaptive-icon.png
 ┃ ┣ 📜favicon.png
 ┃ ┣ 📜Fiap-logo.jpg
 ┃ ┣ 📜icon.png
 ┃ ┗ 📜splash-icon.png
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂contexts
 ┃ ┃ ┗ 📜AuthContext.tsx
 ┃ ┣ 📂screens
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┃ ┗ 📜styles.ts
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┃ ┗ 📜styles.ts
 ┃ ┃ ┣ 📂NewPost
 ┃ ┃ ┃ ┗ 📜NewPost.tsx
 ┃ ┃ ┣ 📂Profile
 ┃ ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┃ ┗ 📂Users
 ┃ ┃ ┃ ┗ 📜Users.tsx
 ┃ ┗ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┣ 📜.gitignore
 ┣ 📜app.json
 ┣ 📜App.tsx
 ┣ 📜index.ts
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```

### 🖌️ Funcionalidades
1. Página de Login:

  - O usuário pode inserir um email e senha para se autenticar.
  - O sistema redireciona o usuário para a página Home.

2. Página de Criação de Post:

  - Os usuários autenticados podem criar novos posts. O título, conteúdo, autor, introdução, imagem e link de vídeo podem ser definidos.

3. Página de Edição de Post:

  - Os usuários podem editar posts existentes acessando a URL /edit/[id], onde [id] é o identificador do post.
  - A edição é feita por meio de um formulário onde o usuário pode atualizar os campos.

4. Página de Detalhes do Post:

  - A página exibe os detalhes de um post específico, acessado pela URL /post/[id]

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

Este projeto foi uma excelente oportunidade para aprimorar habilidades no desenvolvimento front-end, utilizando tecnologias modernas e robustas como React.js, Next.js, Axios, TailwindCSS e Styled-components. Durante o desenvolvimento, conseguimos criar uma interface gráfica dinâmica, responsiva e intuitiva para a aplicação de blog, garantindo uma experiência de usuário fluida e uma integração eficiente com a API do back-end.

A arquitetura adotada baseada no padrão NextJS que trouxe vantagens significativas, como modularidade, escalabilidade e alta performance, permitindo um desenvolvimento ágil e bem estruturado. Além dessas vantagens, existe a facilidade no deploy do projeto, na vercel, pois oferece uma integração nativa que automatiza grande parte do processo. A integração do Axios facilitou a comunicação com a API, enquanto TailwindCSS e Styled-components garantiram um design coeso, flexível e de fácil manutenção.

O projeto reforçou a importância das boas práticas de desenvolvimento, como controle de versão pelo GitHub, organização modular do código e foco na usabilidade. O resultado é uma aplicação funcional e bem estruturada, pronta para ser utilizada por docentes e alunos, oferecendo um ambiente de leitura e interação intuitivo.

