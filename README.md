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
     setup(props, { slots, emit, attrs }){
   
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


### 高阶函数/闭包使用案例

```tsx
// ArrayField.tsx
setup(){
    const hoverStatus  = reactive(props.value?new Array((props.value as any[]).length).fill(false):[])

    // 管理hover
    const useHover = (index: number,status: boolean) =>
      ()=>hoverStatus[index] = status
    
    return ()=>{
        return <>
            	{
              arrayValue.map((v: any, index: number)=><div
                onMouseenter={useHover(index,true)}
                onMouseleave={useHover(index,false)}
              >
                {
                  hoverStatus[index] &&<ElButtonGroup class={'ml-4'}>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'add')} size={"small"}>新增</ElButton>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'delete')} size={"small"}>删除</ElButton>
                    <ElButton type={'primary'} plain size={"small"}>上移</ElButton>
                    <ElButton type={'primary'} plain size={"small"}>下移</ElButton>
                  </ElButtonGroup>
                }
                <SchemaItem
                  key={index}
                  schema={schema.items as Schema}
                  rootSchema={rootSchema}
                  value = {v}
                  onChange={(v: any)=>handleArrayItemChange(v,index)}
                />
              </div>)
            }
            </>
	}
}
```

```tsx
// ArrayField.tsx
setup(){
    const useArrayOperator = (index: number, cmd: 'add'|'delete'|'up'|'down') => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      switch (cmd) {
        case 'add':
          return ()=>{
            arr.splice(index+1,0,undefined)
            props.onChange(arr)
          }
        case 'delete':
          return ()=>{
            arr.splice(index,1)
            props.onChange(arr)
          }
        default:
          throw Error("cmd should be provided")
      }
    }
    
    return ()=>{
        return <>
            	<ElButtonGroup class={'ml-4'}>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'add')} size={"small"}>新增</ElButton>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'delete')} size={"small"}>删除</ElButton>
                    <ElButton type={'primary'} plain size={"small"}>上移</ElButton>
                    <ElButton type={'primary'} plain size={"small"}>下移</ElButton>
                  </ElButtonGroup>
            </>
	}
}
```

### watch使用案例

```js
// ArrayField.tsx
watch(valueArr,(arr)=>{
    props.onChange([...valueArr])
})
```

