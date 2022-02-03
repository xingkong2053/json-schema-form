import { defineComponent, PropType, reactive, watch } from "vue";
import { Schema } from "../types";
import { ElButton, ElButtonGroup } from "element-plus";
import { useVJSFContext } from "../context";

/**
 * 单一类型数组, eg:
 * {
 *   type: array,
 *   items: {
 *     type: string
 *   }
 * }
 */
export default defineComponent({
  name: 'SingleTypeArray',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    rootSchema: {
      type: Object as PropType<Schema>,
      required: true
    },
    valueArr: {
      type: Array as PropType<any[]>,
      required: true
    },
    onChange:{
      type: Function as PropType<(arr: any[])=>void>,
      required: true
    }
  },
  setup(props){
    const context = useVJSFContext()
    const state = reactive({
      hoverStatus: new Array((props.valueArr as any[]).length).fill(false),
      // 只有当valueArr 引用改变时才能触发更新
      valueArr: Array.isArray(props.valueArr) ? props.valueArr : []
    })

    watch(()=>state.valueArr,(arr)=>{
      // 当state中的数组和 props中的数组不一致时，触发事件
      JSON.stringify(arr) !== JSON.stringify(props.valueArr) && props.onChange(arr)
    })

    watch(()=>props.valueArr,newVal=>{
      // 当props中的数组变化时，同步变化state中的数组
      state.valueArr = Array.isArray(newVal) ? [...newVal] : []
    })

    // 管理hover
    const useHover = (index: number,status: boolean) =>
      ()=>state.hoverStatus[index] = status

    const useArrayOperator = (index: number, cmd: 'add'|'delete'|'up'|'down') => {
      const  { valueArr } = state
      switch (cmd) {
        case 'add':
          return ()=>{
            valueArr.splice(index+1,0,undefined)
            state.valueArr = [...valueArr]
          }
        case 'delete':
          return ()=>{
            valueArr.splice(index,1)
            state.valueArr = [...valueArr]
          }
        case 'up':
          return ()=>{
            if(index === 0) return
            const temp = valueArr[index - 1]
            valueArr[index - 1] = valueArr[index]
            valueArr[index] = temp
            state.valueArr = [...valueArr]
          }
        case 'down':
          return ()=>{
            if(index === valueArr.length-1) return
            const temp = valueArr[index + 1]
            valueArr[index + 1] = valueArr[index]
            valueArr[index] = temp
            state.valueArr = [...valueArr]
          }
        default:
          throw Error("cmd should be provided")
      }
    }

    const handleArrayItemChange = (v: any, index: number)=>{
      state.valueArr[index] = v
      state.valueArr = [...state.valueArr]
    }

    return ()=>{
      const { valueArr, schema, rootSchema } = props
      return valueArr.map((v: any, index: number)=><div
          onMouseenter={useHover(index,true)}
          onMouseleave={useHover(index,false)}
        >
          <context.SchemaItem
            key={index}
            schema={schema.items as Schema}
            rootSchema={rootSchema}
            value = {v}
            onChange={(v: any)=>handleArrayItemChange(v,index)}
          />
          {
            state.hoverStatus[index] &&<ElButtonGroup class={'ml-4'}>
              <ElButton type={'primary'} plain onClick={useArrayOperator(index,'add')} size={"small"}>新增</ElButton>
              <ElButton type={'primary'} plain onClick={useArrayOperator(index,'delete')} size={"small"}>删除</ElButton>
              <ElButton type={'primary'} plain onClick={useArrayOperator(index,'up')} size={"small"}>上移</ElButton>
              <ElButton type={'primary'} plain onClick={useArrayOperator(index,'down')} size={"small"}>下移</ElButton>
            </ElButtonGroup>
          }
        </div>)
    }
  }
})
