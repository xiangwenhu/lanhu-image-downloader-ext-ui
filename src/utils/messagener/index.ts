import { BaseAsyncMessenger, type BaseReqData, type GlobalReqOptions } from "async-messenger-js";
import { EnumActionType } from "./index.types";

const vscode = typeof acquireVsCodeApi === "function" ? acquireVsCodeApi() : window;

function postMessageToVSCode(msg: any) {
    // console.log("webview post message to vs:", msg);
    // const vscode = acquireVsCodeApi();
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

    private invokeOnly = (data: RequestData) => {
        return this.invoke(data, {
            sendOnly: true
        })
    }

    /**
     * 开始下载
     */
    startDownload() {
        this.invoke({
            type: EnumActionType.StartDownload
        })
    }

    getConfig() {
        return this.invoke({
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