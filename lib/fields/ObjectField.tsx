import { defineComponent } from "vue";
import { FiledPropsDefine, initialValue } from "../types";
import { isObject } from "../utils";
import { useVJSFContext } from "../context";
import { ElForm } from "element-plus";


export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext()

    const handleChange = (key: string, v: any)=>{
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return ()=>{
      // 拿到解析后的schema
      const { schema, rootSchema, value/*value应该是一个对象*/ , errorSchema} = props
      const properties = schema.properties || {};
      // 从环境中拿到SchemaItem组件
      const { SchemaItem } = context
      const objectValue : any = isObject(value)?value:{}
      return <ElForm labelPosition={"top"} labelWidth={"100px"}>
        {
          Object.keys(properties).map((k: string,index:number)=> {
            //先检查objectValue[key]是否存在
            if(objectValue[k] === undefined){
              handleChange(k,initialValue(properties[k].type))
            }
            return <SchemaItem
              key={index}
              schema={properties[k]}
              rootSchema={rootSchema}
              errorSchema={errorSchema[k] || {}}
              value={objectValue[k]}
              onChange={(v: any)=> handleChange(k,v)}/>
          })
        }
      </ElForm>
    }
  } // setup
})