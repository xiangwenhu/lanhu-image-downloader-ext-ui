import { EnumUrlType, type ConfigParamsInformation } from "@/types";

export function getQueryStringObject(url: string) {
    const qs = url.split('?')[1] || ''; // 获取url中"?"符后的字串
    const qsMap = new Map<string, string>();
    const strs = qs.split('&');
    for (let i = 0; i < strs.length; i++) {
        const arr = strs[i].split('=');
        qsMap.set(decodeURIComponent(arr[0]), decodeURIComponent(arr[1]))
    }

    return qsMap;
}

function createUnknownDownloadParams(message: string) {
    return {
        type: EnumUrlType.unknown,
        params: {
            message
        }
    }
}

export function getTypeByUrl(urlValue: string): EnumUrlType {
    const url = urlValue.toLowerCase();
    const qsMap = getQueryStringObject(url);
    const image_id = qsMap.get("image_id");
    if (image_id) return EnumUrlType.image;
    return EnumUrlType.sector;
}

export function getDownloadParamsByUrl(urlValue: string, config: {
    teamId?: string
}): ConfigParamsInformation<EnumUrlType> {

    const url = urlValue.toLowerCase();
    const qsMap = getQueryStringObject(url);

    const tid = qsMap.get("tid") || config.teamId;
    const pid = qsMap.get("pid") || qsMap.get("project_id");
    const image_id = qsMap.get("image_id");

    if (!tid || !pid || pid.length <= 30 || tid.length <= 30) {
        return createUnknownDownloadParams("url缺少必要参数 tid 或者 pid")
    }

    const type = getTypeByUrl(urlValue);

    switch (type) {
        case EnumUrlType.project:
        case EnumUrlType.sector:
            return {
                type,
                params: {
                    tid,
                    pid
                }
            };
        case EnumUrlType.image:
            if (!image_id || image_id.length <= 30)
                return createUnknownDownloadParams("url缺少必要参数 image_id")

            return {
                type,
                params: {
                    tid,
                    pid,
                    image_id
                }
            }
        default:
            return createUnknownDownloadParams("错误的EnumUrlType值")
    }

}