import { EnumCutImageStyle, EnumTargetPlatform, EnumUrlType } from "./types";

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


export const WebScaleList = [{
    label: "Web @1x",
    value: 1
}, {
    label: "Web @2x",
    value: 2
}];

export const IOSScaleList = [{
    label: "标准点 @1X",
    value: 1
}, {
    label: "视网膜 @2x",
    value: 2
}, {
    label: "高淸视网膜 @3X",
    value: 3
}];


export const AndroidScaleList = [{
    label: "mipmap-mdpi",
    value: 1
}, {
    label: "mipmap-hdpi",
    value: 1.5
}, {
    label: "mipmap-xhdpi",
    value: 2
}, {
    label: "mipmap-xxhdpi",
    value: 3
}, {
    label: "mipmap-xxxhdpi",
    value: 4
}];


export const ScaleMap: Record<EnumTargetPlatform, {label: string, value: number}[]> = {
    [EnumTargetPlatform.Web]: WebScaleList,
    [EnumTargetPlatform.IOS]: IOSScaleList,
    [EnumTargetPlatform.Android]: AndroidScaleList
}



//     PNG = 'png',JPG = 'jpg',WebP = 'webp',SVG = 'svg',PDF = 'pdf'

export const CutImageStyleList = [{
    label: "PNG",
    value: EnumCutImageStyle.PNG
}, {
    label: "JPG",
    value: EnumCutImageStyle.JPG
}, {
    label: "WebP",
    value: EnumCutImageStyle.WebP
}];


export const PlatformList = [{
    label: "IOS",
    value: EnumTargetPlatform.IOS
}, {
    label: "Android",
    value: EnumTargetPlatform.Android
}, {
    label: "Web",
    value: EnumTargetPlatform.Web
}]