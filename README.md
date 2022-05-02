# Lab 10: replicacion calculador con React

## Pre requisitos
- Node < ^16. *Probado en version v16.14.0
- npm < ^8. *Probado en version v8.3.1
## Create react app from scratch
```
npm i --save mini-css-extract-plugin html-webpack-plugin clean-webpack-plugin css-loader sass-loader webpack wepack-cli babel-loader react react-dom sass html-loader @babel/preset-react @babel/preset-env  
```
```
npm i --save-dev webpack-dev-server
```
## Eslint AirBnB Config
### Prettier & airbnb
```
npm i --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier
```
```
npx install-peerdeps --dev eslint-config-airbnb
```
Crar el archivo .prettierrc
```json
{
  "singleQuote": true
}
```
## Eslint
```
npm i -g eslint
```
```
npm init @eslint/config
```
## Editar proyecto (DEV)
Como es de costumbre con proyecto que utilizan npm debemos instalar todas las dependencias con el siguiente comando: 
```
npm i 
```
Posteriormente podemos reconstruir el proyecto en la carpeta proyecto01 (que es el bundle de este proyecyo). 
```
npm run build
```
O correr en webpack server con el comando
```
npm start
```