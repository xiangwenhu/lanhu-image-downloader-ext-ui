<template>
  <n-select :options="list" placeholder="请选择图片尺寸"></n-select>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { computed } from "vue";
import { ScaleMap } from "../../const";
import { EnumTargetPlatform } from "../../types";

interface Props {
  platform: EnumTargetPlatform;
}

const props = defineProps<Props>();

const list = computed(() => {
  return ScaleMap[props.platform] || ScaleMap[EnumTargetPlatform.Web];
});
</script>
