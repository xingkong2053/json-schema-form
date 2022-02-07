import { defineComponent, PropType, provide } from "vue";
import { initialValue, Schema } from "./types";
import SchemaItem from "./SchemaItem";
import { SCHEMA_FORM_CONTEXT_KEY } from "./context";


export default defineComponent({
  name: 'SchemaForm',
  props:{
    schema:{
      type: Object as PropType<Schema>,
      required: true
    },
    value:{
      required: true
    },
    onChange:{
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props){

    // 将SchemaItem包装成context供后代节点(ObjectField调用)
    // 避免文件循环引用
    // const { SchemaItem } = inject( SCHEMA_FORM_CONTEXT_KEY )
    // 注意：如果需要提供不断变化的对象，则必须提供响应式对象(const context = reactive({}))，否则当数据变化时视图无法响应式更新
    provide( SCHEMA_FORM_CONTEXT_KEY ,{ SchemaItem })

    return ()=>{
      const {onChange, value, schema} = props
      let tempValue = value
      //先检查value是否存在
      if(value === undefined || value === null){
        const initial = initialValue(schema.type)
        onChange(initial)
        tempValue = initial
      }
      console.log({value});
      return <SchemaItem value={tempValue} schema={schema} rootSchema={schema} onChange={v=>onChange(v)}/>
    }
  }
})