import { defineComponent } from "vue";
import { ElInput } from "element-plus";
import { FiledPropsDefine } from "../types";
/**
 * 渲染number类型的schema
 */
export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
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