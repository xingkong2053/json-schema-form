import { defineComponent} from "vue";
import { FiledPropsDefine, initialValue, Schema } from "../types";
import { useVJSFContext } from "../context";
import ArraySelect from "../widget/ArraySelect";
import SingleTypeArray from "../widget/SingleTypeArray";
import { ElFormItem } from "element-plus";


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
      const { schema, rootSchema, value, onChange, errorSchema } = props
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
        const SchemaItem = context.SchemaItem
        return <ElFormItem label={schema.title}>
          {
            (schema.items as Schema[]).map((item,index)=>{
              const arr = value as any[]
              //
              arr[index] === undefined && handleArrayItemChange(initialValue(item.type),index)
              return <SchemaItem key={index}
                                 schema={item}
                                 rootSchema={rootSchema}
                                 errorSchema={errorSchema[index] || {}}
                                 value={arr[index]}
                                 onChange={(v: any)=>handleArrayItemChange(v,index)} />
            })
          }
        </ElFormItem>

      } else{

        const isSelect = !!(schema.items as Schema)?.enum
        if (!isSelect) {
          return <ElFormItem label={schema.title}>
            <SingleTypeArray schema={schema} rootSchema={rootSchema} errorSchema={errorSchema} value={value as any[]} onChange={onChange}/>
          </ElFormItem>
        } else {
          return <ArraySelect valueArr={value as any[]} schema={schema} onChange={onChange} errors={errorSchema.__errors}/>
        }

      }
    }
  }
})
