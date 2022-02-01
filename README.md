# vue3-json-schema-form

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue3定义组件

```vue
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>
```

### 使用jsx

1. 安装plugin
```shell
yarn add @vue/babel-plugin-jsx -D
```

2. 在babel.config.js 中添加插件
```js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: ['@vue/babel-plugin-jsx'],
};
```

3. `jsx`组件文件格式

   ```tsx
   import { defineComponent, reactive } from "vue";
   
   export default defineComponent({
     setup(){
   
       const state = reactive({
         name: 'world'
       })
   
       return ()=>{
         const { name } = state;
   
         return <div>
           hello {name}
         </div>
       }
     }
   })
   ```

   ### 安装ajv

   ```shell
   yarn add ajv ajv-formats ajv-i18n ajv-errors -S
   ```

   ### 安装

   ```shell
   yarn add monaco-editor@^0.21.2 monaco-editor-webpack-plugin@^2.0.0 -D
   ```

   ### 安装`vue-jss`

   ```shell
   yarn add vue-jss jss jss-preset-default -S
   ```

   ### eslint.config.js

   ```json
     "eslintConfig": {
       "root": true,
       "env": {
         "node": true
       },
       "extends": [
         "plugin:vue/vue3-essential",
         "eslint:recommended",
         "@vue/typescript/recommended",
         "@vue/prettier",
         "@vue/prettier/@typescript-eslint"
       ],
       "parserOptions": {
         "ecmaVersion": 2020
       },
       "rules": {}
     },
   ```

   ### 添加支持可选链操作符

   ```shell
   yarn add @babel/plugin-proposal-optional-chaining -D
   ```

   ```.js
   // .babelrc
   {
       "plugins": ["@babel/plugin-proposal-optional-chaining"]
   }
   ```

   
