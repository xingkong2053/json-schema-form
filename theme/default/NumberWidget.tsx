import { defineComponent } from "vue";
import { ElInput } from "element-plus";
import { CommonWidgetPropsDefine } from "../../lib/types";

export default defineComponent({
  name: 'ArraySelect',
  props: CommonWidgetPropsDefine,
  setup(props){
    const handleChange = (value: any) =>{
      props.onChange(isNaN(value)?0:+value)
    }
    return ()=>{
      const { value } = props
      return <>
        <ElInput type={'number'} modelValue={value as number} onInput={handleChange}/>
      </>
    }
  }
})