import { defineComponent } from "vue";
import { FiledPropsDefine, Schema } from "../types";
import { useVJSFContext } from "../context";


export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext();
    return ()=>{
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem;

      /**
       * 处理多类型数组, eg:
       * {
       *   items: [
       *     {
       *       type: string,
       *     },
       *     {
       *       type: number
       *     }
       *   ]
       * }
       */
      const isMultiType = Array.isArray(schema.items)
      const arrayValue = Array.isArray(value) ? value: []
      const handleMultiTypeChange = (v: any, index: number)=>{
        const { value } = props
        const arr = Array.isArray(value) ? value : []
        arr[index] = v
        props.onChange(v)
      }
      if (isMultiType) {
        return (schema.items as Schema[]).map((item,index)=>
          <SchemaItem key={index}
                      schema={item}
                      rootSchema={rootSchema}
                      value={arrayValue[index]}
                      onChange={(v: any)=>handleMultiTypeChange(v,index)}/>)
      }

      return null
    }
  }
})
