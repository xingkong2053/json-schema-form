import { defineComponent, PropType } from "vue";
import { ElOption, ElSelect } from "element-plus";
import { Schema } from "../types";

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
      type: Function as PropType<(arr: any[])=>void>
    }
  },
  setup(props){
    return ()=>{
      const {valueArr, schema, onChange} = props
      return <>
        <ElSelect
          class={"m-2"}
          placeholder={"select"}
          size={"large"}
          v-model={valueArr}
          multiple
          onChange={onChange}
        >
          {
            ((schema.items as Schema).enum as any[]).map((item,index)=><ElOption key={index} label={item} value={item}/>)
          }
        </ElSelect>
      </>
    }
  }
})
