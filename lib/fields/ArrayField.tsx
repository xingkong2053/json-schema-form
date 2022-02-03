import { defineComponent, reactive, watch } from "vue";
import { FiledPropsDefine, Schema } from "../types";
import { useVJSFContext } from "../context";
import { ElButtonGroup, ElButton } from "element-plus";


export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props){
    const context = useVJSFContext();

    const hoverStatus  = reactive(props.value?new Array((props.value as any[]).length).fill(false):[])
    const valueArr = reactive(Array.isArray(props.value) ? [...props.value] : [])

    watch(valueArr,(arr)=>{
      props.onChange([...arr])
    })

    // 管理hover
    const useHover = (index: number,status: boolean) =>
      ()=>hoverStatus[index] = status

    const useArrayOperator = (index: number, cmd: 'add'|'delete'|'up'|'down') => {
      switch (cmd) {
        case 'add':
          return ()=>{
            valueArr.splice(index+1,0,undefined)
          }
        case 'delete':
          return ()=>{
            valueArr.splice(index,1)
          }
        case 'up':
          return ()=>{
            if(index === 0) return
            const temp = valueArr[index - 1]
            valueArr[index - 1] = valueArr[index]
            valueArr[index] = temp
          }
        case 'down':
          return ()=>{
            if(index === valueArr.length-1) return
            const temp = valueArr[index + 1]
            valueArr[index + 1] = valueArr[index]
            valueArr[index] = temp
          }
        default:
          throw Error("cmd should be provided")
      }
    }

    const handleArrayItemChange = (v: any, index: number)=>{
      valueArr[index] = v
    }

    return ()=>{
      const { schema, rootSchema } = props
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
                {
                  hoverStatus[index] &&<ElButtonGroup class={'ml-4'}>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'add')} size={"small"}>新增</ElButton>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'delete')} size={"small"}>删除</ElButton>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'up')} size={"small"}>上移</ElButton>
                    <ElButton type={'primary'} plain onClick={useArrayOperator(index,'down')} size={"small"}>下移</ElButton>
                  </ElButtonGroup>
                }
                <SchemaItem
                  key={index}
                  schema={schema.items as Schema}
                  rootSchema={rootSchema}
                  value = {v}
                  onChange={(v: any)=>handleArrayItemChange(v,index)}
                />
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
        }

      }
      return null
    }
  }
})
