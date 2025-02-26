<template>
    <n-select :options="list" placeholder="请选择下载类型"></n-select>
</template>


<script setup lang="ts">
import { NSelect } from "naive-ui";
import { DownloadTypeList as list } from "../../const";
</script>