<template>
  <n-form ref="refForm" :model="model" :rules="rules" class="form">
    <n-form-item label="网页地址" path="url">
      <n-input v-model:value="model.url" placeholder="请输入地址"></n-input>
    </n-form-item>
    <n-form-item label="下载类型" path="type">
      <download-type v-model:value="model.type" :disabled="!isValidUrl"></download-type>
    </n-form-item>
    <n-form-item label="分组组名" path="sectorName" v-if="model.type === EnumUrlType.sector">
      <n-input v-model:value="model.sectorName" placeholder="请输入分组组名" :disabled="!isValidUrl"></n-input>
    </n-form-item>
    <n-form-item label="图片格式">
      <CutImageStyle v-model:value="model.cutImageStyle" placeholder="请选择图片格式" :disabled="!isValidUrl"></CutImageStyle>
    </n-form-item>
    <n-form-item label="使用平台">
      <Platform v-model:value="model.platform" placeholder="请选择使用平台" :disabled="!isValidUrl"></Platform>
    </n-form-item>
    <n-form-item label="图片尺寸">
      <download-scale :platform="model.platform" v-model:value="model.downloadScale" placeholder="请选择图片大小"
        :disabled="!isValidUrl"></download-scale>
    </n-form-item>
    <!-- <n-form-item label="调整尺寸" path="resizeScale">
      <n-input-number
        v-model:value="model.resizeScale"
        placeholder="请输入调整尺寸"
        :max="1"
        :min="0.5"
        :step="0.1"
        :disabled="!isValidUrl"
      ></n-input-number>
    </n-form-item> -->

    <n-form-item label="启用翻译" path="enableTranslation">
      <n-checkbox size="medium" label="启用翻译" v-model:checked="model.enableTranslation" :checked-value="true"
        :disabled="!isValidUrl" />
    </n-form-item>
    <n-form-item label="下载目录" path="targetFolder">
      <n-input placeholder="请输入下载目录" :disabled="!isValidUrl" v-model:value="model.targetFolder"></n-input>
    </n-form-item>

    <n-form-item>
      <n-space justify="center" style="width: 100%">
        <n-popconfirm @positive-click="onToDownload" :disabled="!isValidUrl" negative-text="取消" positive-text="确认">
          <template #trigger>
            <n-button type="primary" :disabled="!isValidUrl">下载切图</n-button>
          </template>
          确认下图切图
        </n-popconfirm>
        <n-button type="error">关闭窗口</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { type FormInst, type FormRules, NForm, NFormItem, NInput, NCheckbox, useMessage, NButton, NSpace, NPopconfirm } from "naive-ui";
import { reactive, ref, watch, onMounted } from "vue";
import type { IFormData } from "./UrlTab.type";
import DownloadType from "./select/DownloadType.vue";
import DownloadScale from "./select/DownloadScale.vue";
import CutImageStyle from "./select/CutImageStyle.vue";
import Platform from "./select/Platform.vue";
import { type ConfigParamsInformation, EnumUrlType, type DownloadOptions, EnumTargetPlatform } from "../types";
import { getDownloadParamsByUrl } from "./utils/index";
import asyncMessenger from "../utils/messenger/index";
const message = useMessage()

const model = reactive<IFormData>({
  url: "",
  type: undefined,
  sectorName: "",
  downloadScale: 1,
  cutImageStyle: "png",
  enableTranslation: false,
  targetFolder: "",
  platform: EnumTargetPlatform.Web
});

const refForm = ref<FormInst | null>(null);

const isValidUrl = ref<boolean>();

const lanhuConfig = reactive<{
  teamId?: string;
}>({})


const rules: FormRules = {
  url: [{
    required: true,
    type: "string",
    validator(_rule, value) {
      const val = `${value}`.trim();
      if (!val.startsWith("https://lanhuapp.com/")) return false;
      const urlInfo = validateUrl(val);
      const isValid = urlInfo.type != EnumUrlType.unknown;
      if (isValid) return;
      return new Error("无效的地址")
    },
    trigger: ["change", "blur"]
  }],
  sectorName: [{
    validator(_rule, value) {
      if (model.type !== EnumUrlType.sector) return true;
      return `${value}`.trim() === "" ? new Error(`请输入分组名`) : true
    },
    trigger: ["change", "blur"]
  }]
}


function validateUrl(url: string) {
  const urlInfo = getDownloadParamsByUrl(url, { teamId: lanhuConfig.teamId || '' });
  return urlInfo
}


watch(() => model.url, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const urlInfo = validateUrl(newValue);
    isValidUrl.value = urlInfo.type != EnumUrlType.unknown;
    if (isValidUrl.value) {
      model.type = urlInfo.type
    }
  }
  console.log(newValue)
  console.log(oldValue)
}, {
  deep: true
})


function getSubmitData(): DownloadOptions {

  return {
    targetFolder: model.targetFolder,
    type: model.type as EnumUrlType,
    /**
     * 下载的图片的切图大小， 1 | 2倍尺寸
     */
    downloadScale: model.downloadScale,
    /**
     * 启用中专英文
     */
    enableTranslation: model.enableTranslation,
    sectorName: model.sectorName,

    cutImageStyle: model.cutImageStyle
  } as DownloadOptions
}

function onToDownload() {
  try {

    refForm.value?.validate(errors => {
      if (errors) return;
      message.success("开始下载");
      const data = getSubmitData();
      const urlInfo = validateUrl(model.url) as ConfigParamsInformation<EnumUrlType.image>;

      data.teamId = urlInfo.params.tid;
      data.projectId = urlInfo.params.pid;
      data.imageId = urlInfo.params.image_id;



      asyncMessenger.startDownload(data)
    })

  } catch (err: any) {
    message.error(`执行失败：${err && err.message}`);
  }
}

onMounted(async () => {
  try {
    const res = await asyncMessenger.getConfig();
    console.log("getConfig:", res);
    model.targetFolder = res?.data?.targetFolder || "";
    lanhuConfig.teamId = res?.data?.teamId;

  } catch (err: any) {
    message.error("onMounted error:", err && err.message);
  }
})

watch(() => model.platform, function (newVal, oldVal) {
  if (newVal != oldVal) {
    model.downloadScale = 1
  }
})
</script>

<style lang="scss" scoped>
.form {
  padding: 20px;
  max-width: 60vw;
  min-width: 500px;
  margin: auto;
}
</style>
