<template>
  <ElInput
    type="text" :model-value="value" @input="onChange/*props.onChange*/"/>
</template>

<script lang="ts" setup="props">
import { defineProps } from 'vue'
import { FiledPropsDefine } from "../types";
// sfc 定义props方式
// const props = defineProps({})
const props = defineProps(FiledPropsDefine)

</script>