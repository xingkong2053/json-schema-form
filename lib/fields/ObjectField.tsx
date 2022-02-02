import { defineComponent, inject } from "vue";
import { FiledPropsDefine } from "../types";
import { isObject } from "../utils";
import { SCHEMA_FORM_CONTEXT_KEY } from "../context";



const TypeHelperComponent = defineComponent({props: FiledPropsDefine})
// SchemaItem类型
type SchemaItemType = typeof TypeHelperComponent

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props){
    const context: { SchemaItem: SchemaItemType } | undefined = inject(SCHEMA_FORM_CONTEXT_KEY)
    if (!context) {
      // 没有context 可能的情况是在SchemaForm之外使用ObjectField
      throw Error('ObjectField should be used in SchemaForm')
    }

    const handleChange = (key: string, v: any)=>{
      const value: any = isObject(props.value) ? props.value : {}
      if (!v) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return ()=>{
      // 拿到解析后的schema
      const { schema, rootSchema, value/*value应该是一个对象*/ } = props
      const properties = schema.properties || {};
      // 从环境中拿到SchemaItem组件
      const { SchemaItem } = context
      const objectValue : any = isObject(value)?value:{}
      return <>
        {
          Object.keys(properties).map((k: string,index:number)=>
            <SchemaItem
              key={index}
              schema={properties[k]}
              rootSchema={rootSchema}
              value={objectValue[k]}
              onChange={(v: any)=> handleChange(k,v)}/>
          )
        }
      </>
    }
  } // setup
})