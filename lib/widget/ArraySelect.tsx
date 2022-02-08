import { defineComponent, PropType } from "vue";
import { Schema, SelectWidgetNames } from "../types";
import { useGetWidgetRef } from "../ThemeProvider";

/**
 * 单一类型数组且取值确定, eg:
 * {
 *   type: array,
 *   items: {
 *     type: string,
 *     enum: ['a','b','c']
 *   }
 * }
 */
export default defineComponent({
  name: 'ArraySelect',
  props:{
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    valueArr: {
      type: Array as PropType<any[]>,
      required: true
    },
    onChange:{
      type: Function as PropType<(arr: any[])=>void>,
      required: true
    },
    errors: {
      type: Array as PropType<string[]>
    }
  },
  setup(props){
    return ()=>{
      const {valueArr, schema, onChange, errors} = props
      const SelectWidgetRef = useGetWidgetRef(SelectWidgetNames.SelectWidget);
      const SelectWidget = SelectWidgetRef.value
      const options = ((schema.items as Schema).enum as string[]).map(item=>({key: item,value: item}))
      return <SelectWidget options={options} value={valueArr} onChange={v=>onChange(v as any[])} errors={errors}/>
    }
  }
})
