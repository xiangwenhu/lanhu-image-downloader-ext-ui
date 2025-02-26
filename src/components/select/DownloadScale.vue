<template>
    <n-select :options="list" placeholder="请选择图片尺寸"></n-select>
</template>


<script setup lang="ts">
import { NSelect } from "naive-ui";
import { DownloadScaleList as list } from "../../const";
</script>