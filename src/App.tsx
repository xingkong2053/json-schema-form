import { defineComponent, reactive, ref, Ref, watchEffect } from "vue";
import MonacoEditor from "./components/MonacoEditor";
import { createUseStyles } from "vue-jss";
import demos from "./demos";
import { ElSelect, ElOption } from "element-plus";
import SchemaForm from "../lib/SchemaForm";
import ThemeProvider from "../lib/ThemeProvider";
import theme from "../theme/default";


const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})


function toJson(data: any){
  return JSON.stringify(data,null, 2)
}

type Schema = any

type UISchema = any

type Demo = {
  schema: Schema | null
  data: any
  uiSchema: UISchema | null
  schemaCode: string
  dataCode: string
  uiSchemaCode: string
  customValidate: ((d: any, e: any) => void) | undefined
}

export default defineComponent({

  setup(){

    //使用的demo序号
    const selectedRef: Ref<number> = ref(0)

    const demo: Demo = reactive({
      schema: null,
      data: null,
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined
    })

    // 当select序号变化时，更新对应的值
    watchEffect(()=>{
      const index = selectedRef.value;
      const d = demos[index];
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })

    /**
     * 当SchemaForm中的文本改变时，同步改变demo中的数据值
     * @param v
     */
    const handleChange = (v: any) =>{
      demo.data = v
      demo.dataCode = toJson(v)
    }

    const classesRef = useStyles()

    // closure 闭包 demo
    function handleCodeChange(
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        demo[field] = JSON.parse(value)
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        // some thing
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    const schemaFormRef = ref()

    const doValidate = () => {
      schemaFormRef.value.doValidate().then(console.log)
    }

    return ()=>{

      const classes = classesRef.value
      const selected = selectedRef.value

      console.log(schemaFormRef.value);

      return <div>
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            {/* 切换按钮 */}
            <ElSelect v-model={selected}  onChange={(value)=>selectedRef.value = value} >
              {
                demos.map(({name},index)=> <ElOption value={index} key={index} label={name}/>)
              }
            </ElSelect>
          </div>
          {/* /.menu */}
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
              {/* /.uiAndValue */}
            </div>
            {/* /.code */}
            <div class={classes.form}>
              <ThemeProvider theme={theme}>
                <SchemaForm schema={demo.schema} onChange={handleChange} value={demo.data} ref={schemaFormRef}/>
              </ThemeProvider>
            </div>
          </div>
        </div>
        <button onClick={doValidate}>校验</button>
      </div>
    }
  }
})
