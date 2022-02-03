import { defineComponent} from "vue";
import { FiledPropsDefine, Schema } from "../types";
import { useVJSFContext } from "../context";
import ArraySelect from "../widget/ArraySelect";
import SingleTypeArray from "../widget/SingleTypeArray";


export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext();

    const handleArrayItemChange = (v: any, index: number)=>{
      const arr = props.value as any[]
      arr[index] = v
      props.onChange(arr)
    }

    return ()=>{
      const { schema, rootSchema, value, onChange } = props
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
      if (isMultiType) {

        return <>
          {
            (schema.items as Schema[]).map((item,index)=>
              <context.SchemaItem key={index}
                          schema={item}
                          rootSchema={rootSchema}
                          value={(value as any[])[index]}
                          onChange={(v: any)=>handleArrayItemChange(v,index)}
              />)
          }
        </>

      } else{

        const isSelect = !!(schema.items as Schema)?.enum
        if (!isSelect) {
          return <SingleTypeArray schema={schema} rootSchema={rootSchema} valueArr={value as any[]} onChange={onChange}/>
        } else {
          return <ArraySelect valueArr={value as any[]} schema={schema} onChange={onChange}/>
        }

      }
    }
  }
})
