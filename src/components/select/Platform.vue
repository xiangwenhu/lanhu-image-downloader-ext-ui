<template>
    <n-select :options="list" placeholder="请选择使用平台"></n-select>
</template>


<script setup lang="ts">
import { NSelect } from "naive-ui";
import { PlatformList as list } from "../../const";
</script>