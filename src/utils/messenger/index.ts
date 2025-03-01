import { BaseAsyncMessenger, type BaseReqData, type GlobalReqOptions } from "async-messenger-js";
import { EnumActionType } from "./index.types";
import type { DownloadOptions } from "@/types";

const isInVScode = typeof acquireVsCodeApi === "function";
const vscode = isInVScode ? acquireVsCodeApi() : window.parent;
const mDomain = isInVScode ? "*" : "https://web.com";

function postMessageToVSCode(msg: any) {
    // console.log("webview post message to vs:", msg);
    // const vscode = acquireVsCodeApi();

    msg.source = isInVScode ? "VSCodePage" : "IframePage";

    vscode.postMessage(msg, "*");
}

type RequestData = BaseReqData;
type ResponseData = RequestData;


class AsyncMessenger extends BaseAsyncMessenger {
    constructor(options: GlobalReqOptions = {}) {
        super(options);
    }

    subscribe() {
        const onVSCodeMessage = (ev: MessageEvent<ResponseData>) => {
            console.log("receive message from vscode:", ev.data);
            this.onMessage(ev.data)
        }
        window.addEventListener("message", onVSCodeMessage);
        return () => {
            window.removeEventListener("message", onVSCodeMessage);
        }
    }

    protected request(data: RequestData) {
        console.log("send message to vscode:", data);
        postMessageToVSCode(data);
    }

    /**
     * 开始下载
     */
    startDownload(data: DownloadOptions) {
        this.invoke({
            type: EnumActionType.StartDownload,
            data
        })
    }

    getConfig() {
        return this.invoke<unknown, {
            targetFolder: string;
            teamId?: string;
        }>({
            type: EnumActionType.GetConfig
        })
    }

    closeWebview() {
        return this.invoke({
            type: EnumActionType.CloseWebview
        })
    }
}

const asyncMessenger = new AsyncMessenger({
});
asyncMessenger.subscribe();

export default asyncMessenger