import type { EnumUrlType } from "@/types";

export interface ModelType {
    url: string;
    type: EnumUrlType | undefined;
    sectorName?: string;
    downloadScale: 1 | 2;
    resizeScale?: number;
    enableTranslation: boolean;
    targetFolder: string;
}