import { defineComponent } from "vue";
import { CommonWidgetNames, FiledPropsDefine } from "../types";
import { useGetWidgetRef } from "../ThemeProvider";

/**
 * 渲染number类型的schema
 */
export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props){
    return ()=>{
      const { value, onChange, errorSchema } = props
      // 从主题中获取NumberWidget
      const NumberWidgetRef = useGetWidgetRef(CommonWidgetNames.NumberWidget);
      const NumberWidget = NumberWidgetRef.value
      return <NumberWidget value={value} onChange={onChange} errors={errorSchema.__errors}/>
    }
  }
})