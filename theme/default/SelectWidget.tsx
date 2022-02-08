import { defineComponent } from "vue";
import { ElOption, ElSelect, ElFormItem } from "element-plus";
import { SelectWidgetPropsDefine } from "../../lib/types";
import { Errors } from "../../lib/widget/widget";

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
      const { onChange, value, options, schema, errors } = props

      return <ElFormItem label={schema.title}>
        <ElSelect
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
        <Errors errors={errors}/>
      </ElFormItem>
    }
  }
})