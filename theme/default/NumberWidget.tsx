import { defineComponent } from "vue";
import { ElFormItem, ElInput } from "element-plus";
import { CommonWidgetPropsDefine } from "../../lib/types";
import { Errors } from "../../lib/widget/widget";

export default defineComponent({
  name: 'NumberWidgetDefault',
  props: CommonWidgetPropsDefine,
  setup(props){
    const handleChange = (value: any) =>{
      props.onChange(isNaN(value)?0:+value)
    }
    return ()=>{
      const { value, schema, errors } = props
      return <ElFormItem label={schema.title}>
        <ElInput type={'number'} modelValue={value as number} onInput={handleChange}/>
        <Errors errors={errors}/>
      </ElFormItem>
    }
  }
})