import { computed, defineComponent } from "vue";
import { FiledPropsDefine, SchemaTypes } from "./types";
import StringField from "./fields/StringField.vue";
import NumberField from "./fields/NumberField";
import { retrieveSchema } from "./utils";
import ObjectField from "./fields/ObjectField";
import ArrayField from "./fields/ArrayField";

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props){

    // retrievedSchemaRef
    const rSRef = computed(()=>{
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return ()=>{
      const { schema, ...restProps } = props

      // 遍历后的schema
      const rS = rSRef.value

      const type = schema.type
      let Component : any
      switch (type){
        case SchemaTypes.STRING:
          Component = StringField;break;
        case SchemaTypes.NUMBER:
          Component = NumberField;break;
        case SchemaTypes.OBJECT:
          Component = ObjectField;break;
        case SchemaTypes.ARRAY:
          Component = ArrayField;break;
        default:
          console.warn(`${type} is not supported`);
      }
      return <Component {...restProps} schema = {rS}/>
    }
  }
})
