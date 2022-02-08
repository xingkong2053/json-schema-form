import { defineComponent } from "vue";
import { ElOption, ElSelect } from "element-plus";
import { SelectWidgetPropsDefine } from "../../lib/types";

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
  name: 'SelectWidgetDefault',
  props: SelectWidgetPropsDefine,
  setup(props){
    return ()=>{
      const { onChange, value, options } = props

      return <ElSelect
        class={"m-2"}
        placeholder={"请选择"}
        size={"large"}
        v-model={value}
        multiple
        onChange={onChange}
      >
        {
          options.map((item,index)=><ElOption key={index} label={item.key} value={item.value}/>)
        }
      </ElSelect>
    }
  }
})