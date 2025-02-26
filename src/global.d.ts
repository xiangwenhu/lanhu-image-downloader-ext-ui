
// 定义 VsCode API 的类型声明
declare function acquireVsCodeApi(): VsCodeApi;

interface VsCodeApi {
    // postMessage 用于向 VS Code 发送消息
    postMessage(message: any): void;

    // setState 用于设置扩展的状态数据
    setState(data: any): void;

    // getState 获取之前存储的扩展状态数据
    getState(): any;

    // asWebviewUri 将本地资源 URI 转换为可以安全地在 webview 中使用的 URI
    asWebviewUri(localResource: Uri): Uri;
}

// 如果需要，定义 Uri 类型的接口
interface Uri {
    // 这里仅作示意，实际 Uri 接口应包含更多属性和方法
    readonly scheme: string;
    readonly authority: string;
    readonly path: string;
    // ... 其他可能的属性
}
declare global {
    namespace globalThis {

    }

}

