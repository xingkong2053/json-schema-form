import { DefineComponent, defineComponent, PropType } from "vue";
import { ErrorSchema } from "./validator";

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
  schema:{
    type: Object as PropType<Schema>,
    required: true
  },
  value:{
    required: true
  },
  onChange:{
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true
  }
} as const /*声明为readonly类型*/ // SchemaItem类型

export const TypeHelperComponent = defineComponent({ props: FiledPropsDefine });

export type SchemaItemType = typeof TypeHelperComponent

export const initialValue = (type :string | undefined) => {
  switch (type){
    case SchemaTypes.NUMBER: return 0;
    case SchemaTypes.STRING: return "";
    case SchemaTypes.OBJECT: return {};
    case SchemaTypes.ARRAY: return [];
    default: return;
  }
}

export const CommonWidgetPropsDefine = {
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>
  }
} as const

export const SelectWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{key:string,value:any}[]>,
    required: true
  }
} as const

export type CommonWidgetComponentType =
  DefineComponent<
    typeof CommonWidgetPropsDefine,
    Record<string, unknown>,
    Record<string, unknown>>

export type SelectWidgetComponentType = DefineComponent<typeof SelectWidgetPropsDefine, Record<string, unknown>,
  Record<string, unknown>>

export enum SelectWidgetNames {
  SelectWidget = 'SelectWidget '
}

export enum CommonWidgetNames {
  StringWidget = 'StringWidget',
  NumberWidget = 'NumberWidget'
}

export interface Theme {
  widgets: {
    [SelectWidgetNames.SelectWidget]: SelectWidgetComponentType,
    [CommonWidgetNames.StringWidget]: CommonWidgetComponentType,
    [CommonWidgetNames.NumberWidget]: CommonWidgetComponentType
  }
}

