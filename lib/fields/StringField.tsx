import { defineComponent, PropType } from "vue";
import { ElInput } from "element-plus";

/**
 * 渲染string类型的schema
 */
export default defineComponent({
  name: 'StringField',
  props: {
    value: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props){
    return ()=>{
      const { value } = props
      return <>
        <ElInput type={'text'}/>
      </>
    }
  }
})