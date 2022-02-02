import { inject } from "vue";
import { SchemaItemType } from "./types";


export const SCHEMA_FORM_CONTEXT_KEY = Symbol()

export const useVJSFContext = () => {
  const context: { SchemaItem: SchemaItemType } | undefined = inject(SCHEMA_FORM_CONTEXT_KEY)
  if (!context) {
    // 没有context 可能的情况是在SchemaForm之外使用ObjectField
    throw Error('Component should be used in SchemaForm')
  }
  return context
}