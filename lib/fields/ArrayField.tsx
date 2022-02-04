import { defineComponent} from "vue";
import { FiledPropsDefine, initialValue, Schema } from "../types";
import { useVJSFContext } from "../context";
import ArraySelect from "../widget/ArraySelect";
import SingleTypeArray from "../widget/SingleTypeArray";


export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext();

    const handleArrayItemChange = (v: any, index: number)=>{
      // 这里必须是props.value的深拷贝值，不能是引用
      // 否则同级别的其他的数组也会跟着改变
      const arr = JSON.parse(JSON.stringify(props.value as any[]))
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
            (schema.items as Schema[]).map((item,index)=>{
              const arr = value as any[]
              //
              arr[index] === undefined && handleArrayItemChange(initialValue.get(item.type),index)
              return <context.SchemaItem key={index}
                                         schema={item}
                                         rootSchema={rootSchema}
                                         value={arr[index]}
                                         onChange={(v: any)=>handleArrayItemChange(v,index)} />
            })
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
