# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
  #   m e r n - a u t h 
   
   -dom

steps:

- setup ui (install shadcn tailwind etc)
- setup frontend react-router-dom routes (home,login,register and dashboard at minimum)
- set up express backend
- import express, dotenv, mongoose, cors etc. add "type":"module" to package.json to use import,set up vite env
- import bcryptjs(NOTE bcrypt and other packages can cause problems when deployed), jwt, cookie-parser for auth
- setup mongoose db (create project/collection and connect)
- setup models
- setup basic POST route for registration
- setup basic POST route for login
- add extra auth features (bcryptjs, jwt, cookie-parser, verify route)
- configure frontend
  (eg.
  - api url for requests
  - axios ( axios.defaults.withCredentials = true;)
  - dashboard should only display when logged in
  - info should be displayed according to users
  - nav should change when logged in
    )
- vercel deploy (note added env variables)
- vercel.json (frontend needs one to get react-router-dom working properly. backend needs builds to deploy as express app "builds": [{ "src": "*.js", "use": "@vercel/node" }])

Things to fix?
cookie issues
