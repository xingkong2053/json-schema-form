import { defineComponent } from "vue";
import { ElInput } from "element-plus";
import { CommonWidgetPropsDefine } from "../../lib/types";

export default defineComponent({
  name: 'StringWidgetDefault',
  props: CommonWidgetPropsDefine,
  setup(props){
    return ()=>{
      const { value, onChange } = props
      return <>
        <ElInput type={'text'} modelValue={value as string} onInput={onChange}/>
      </>
    }
  }
})