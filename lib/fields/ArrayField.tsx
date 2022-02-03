import { defineComponent, reactive, watch } from "vue";
import { FiledPropsDefine, Schema } from "../types";
import { useVJSFContext } from "../context";
import { ElButtonGroup, ElButton, ElSelect, ElOption } from "element-plus";


export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext();

    const state = reactive({
      hoverStatus: props.value?new Array((props.value as any[]).length).fill(false):[],
      // 只有当valueArr 引用改变时才能触发更新
      valueArr: Array.isArray(props.value) ? props.value : []
    })

    watch(()=>state.valueArr,(arr)=>{
      // 当内容不一样时才触发更新
      JSON.stringify(arr) !== JSON.stringify(props.value) && props.onChange(arr)
    })

    watch(()=>props.value,newVal=>{
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
      const { schema, rootSchema } = props
      const { valueArr } = state
      const SchemaItem = context.SchemaItem;

      /**
       * 处理多类型数组, eg:
       * {
       *   items: [
       *     {
       *       type: string,
       *     },
       *     {
       *       type: number
       *     }
       *   ]
       * }
       */
      const isMultiType = Array.isArray(schema.items)
      if (isMultiType) {
        return <>
          {
            (schema.items as Schema[]).map((item,index)=>
              <SchemaItem key={index}
                          schema={item}
                          rootSchema={rootSchema}
                          value={valueArr[index]}
                          onChange={(v: any)=>handleArrayItemChange(v,index)}
              />)
          }
        </>
      } else{
        const isSelect = !!(schema.items as Schema)?.enum

        /**
         * 单一类型数组, eg:
         * {
         *   type: array,
         *   items: {
         *     type: string
         *   }
         * }
         */
        if (!isSelect) {

          return <>
            {
              valueArr.map((v: any, index: number)=><div
                onMouseenter={useHover(index,true)}
                onMouseleave={useHover(index,false)}
              >
                <SchemaItem
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
          </>
        } else {
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
          return <>
            <ElSelect
              class={"m-2"}
              placeholder={"select"}
              size={"large"}
              v-model={valueArr}
              multiple
              onChange={arr=>state.valueArr=arr}
            >
              {
                ((schema.items as Schema).enum as any[]).map((item,index)=><ElOption key={index} label={item} value={item}/>)
              }
            </ElSelect>
          </>
        }

      }
    }
  }
})
