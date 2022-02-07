import { computed, defineComponent, inject, PropType, provide, ComputedRef } from "vue";
import { CommonWidgetNames, SelectWidgetNames, Theme } from "./types";

const THEME_PROVIDER_KEY = Symbol()

export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props,{ slots }){
    // 当props.theme改变时，能够及时的响应
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY,context)
    return ()=>{
      return slots.default && slots.default()
    }
  }
})

export function useGetWidgetRef<T extends SelectWidgetNames | CommonWidgetNames>(name: T){
  const context : ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context) {
    // 如果顶层组件提供的theme对象不存在，报错
    throw new Error('vjsf theme required')
  }
  // theme改变时，动态改变
  return computed(()=>{return context.value.widgets[name]})
}
