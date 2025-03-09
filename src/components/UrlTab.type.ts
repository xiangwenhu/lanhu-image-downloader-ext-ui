import type { EnumTargetPlatform, EnumUrlType } from "@/types";

export interface IFormData {
    url: string;
    type: EnumUrlType | undefined;
    sectorName?: string;
    cutImageStyle: string;
    downloadScale: number;
    enableTranslation: boolean;
    targetFolder: string;
    platform: EnumTargetPlatform;
}