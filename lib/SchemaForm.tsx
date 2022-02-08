import { defineComponent, PropType, provide, Ref, watchEffect, shallowRef } from "vue";
import { initialValue, Schema } from "./types";
import SchemaItem from "./SchemaItem";
import { SCHEMA_FORM_CONTEXT_KEY } from "./context";
import Ajv, { Options } from 'ajv'
import { ErrorSchema, validateFormData } from "./validator";

const defaultAjvOptions: Options = {
  allErrors: true,
}

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
    },
    ajvOptions: {
      type: Object as PropType<Options>
    }
  },
  setup(props,{ expose }){

    // 将SchemaItem包装成context供后代节点(ObjectField调用)
    // 避免文件循环引用
    // const { SchemaItem } = inject( SCHEMA_FORM_CONTEXT_KEY )
    // 注意：如果需要提供不断变化的对象，则必须提供响应式对象(const context = reactive({}))，否则当数据变化时视图无法响应式更新
    provide( SCHEMA_FORM_CONTEXT_KEY ,{ SchemaItem })

    const ajvRef: Ref<Ajv> = shallowRef() as any

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    watchEffect(()=>{
      ajvRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })
    })

    const doValidate = () => {
      return validateFormData(ajvRef.value,props.value,props.schema).then(result=>{
        errorSchemaRef.value = result.errorSchema
        return result
      })
    }

    expose({
      doValidate
    })

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
      return <SchemaItem value={tempValue} schema={schema} rootSchema={schema} onChange={v=>onChange(v)} errorSchema={errorSchemaRef.value || {}}/>
    }
  }
})