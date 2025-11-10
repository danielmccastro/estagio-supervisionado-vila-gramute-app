<p align="center">
  <img src="assets/logo.png" alt="Logo Vila Gramuté" width="150"/>
</p>

# Vila Gramuté App

O Vila Gramuté App foi desenvolvido com o propósito de apoiar a gestão administrativa da Vila Gramuté, proporcionando ferramentas para organização de tarefas e controle financeiro. O aplicativo busca contribuir para a melhoria da eficiência operacional e para a otimização dos processos de gestão do empreendimento.

## Objetivos e Justificativas do Projeto

A criação do Vila Gramuté App justifica-se pela necessidade de centralizar e modernizar os processos de gestão da Vila Gramuté, substituindo métodos manuais e dispersos por uma solução digital integrada. O aplicativo foi desenvolvido para otimizar a organização de tarefas e o controle financeiro, promovendo maior eficiência, praticidade e confiabilidade na administração do empreendimento.

## Funcionalidades

- Gerenciamento de tarefas (criação e exclusão)
- Controle financeiro simples (registro de receitas e despesas)
- Proteção de acesso via PIN
- Armazenamento local utilizando `AsyncStorage`

---

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- JavaScript (ES6+)

---

## Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/danielmccastro/estagio-supervisionado-vila-gramute-app.git
cd estagio-supervisionado-vila-gramute-app
```
### 2. Instale as dependências

Certifique-se de que você tem o Node.js instalado. Depois, execute:

```bash
npm install
```
### 3. Configure o ambiente

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example:

```bash
cp .env.example .env
```
Edite o arquivo .env com o PIN desejado (esse PIN será solicitado ao abrir o app):

```bash
APP_PIN=1234
```
O PIN é usado para proteger o acesso ao aplicativo. Não há sistema de autenticação com usuário/senha – o PIN é uma medida local de segurança.

### 4. Inicie o aplicativo

Inicie o servidor de desenvolvimento com o Expo:

```bash
npx expo start
```
Use o app Expo Go no seu celular para escanear o QR Code exibido no terminal ou no navegador e executar o aplicativo.

## Estrutura do Projeto
.<br>
├── assets/             # Imagens e ícones<br>
├── components/         # Componentes reutilizáveis<br>
├── screens/            # Telas do app (tarefas, finanças, etc.)<br>
├── storage/            # Manipulação do AsyncStorage<br>
├── App.js              # Componente principal do app<br>
├── .env.example        # Exemplo de variáveis de ambiente<br>
└── ...

## .env.example
PIN de acesso ao app

```bash
APP_PIN=1234
```
## Desenvolvedor

Daniel M C de Castro<br>
