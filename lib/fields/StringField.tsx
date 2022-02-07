import { defineComponent} from "vue";
import { useGetWidgetRef } from "../ThemeProvider";
import { CommonWidgetNames, FiledPropsDefine } from "../types";

/**
 * 渲染string类型的schema
 */
export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props){
    const StringWidgetRef = useGetWidgetRef(CommonWidgetNames.StringWidget);
    const StringWidget = StringWidgetRef.value
    return ()=>{
      const { value, onChange } = props
      return <StringWidget value={value} onChange={onChange}/>
    }
  }
})