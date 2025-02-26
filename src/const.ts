import { EnumUrlType } from "./types";

export const DownloadTypeList = [
    {
        label: "整个项目",
        value: EnumUrlType.project
    }, {
        label: "项目分组",
        value: EnumUrlType.sector
    }, {
        label: "单个设计稿",
        value: EnumUrlType.image
    }
];


export const DownloadScaleList = [{
    label: "1倍图",
    value: 1
}, {
    label: "2倍图",
    value: 2
}]