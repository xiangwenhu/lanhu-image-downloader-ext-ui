<template>
    <n-select :options="list" placeholder="请选择图片格式"></n-select>
</template>


<script setup lang="ts">
import { NSelect } from "naive-ui";
import { CutImageStyleList as list } from "../../const";
</script>