import { defineComponent } from "vue";
import { ElInput, ElFormItem } from "element-plus";
import { CommonWidgetPropsDefine } from "../../lib/types";
import { Errors } from "../../lib/widget/widget";

export default defineComponent({
  name: 'StringWidgetDefault',
  props: CommonWidgetPropsDefine,
  setup(props){
    return ()=>{
      const { value, onChange, schema, errors } = props
      return <ElFormItem label={schema.title}>
        <ElInput type={'text'} modelValue={value as string} onInput={onChange}/>
        <Errors errors={errors}/>
      </ElFormItem>
    }
  }
})