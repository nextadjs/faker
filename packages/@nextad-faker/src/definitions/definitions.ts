import type { AdCOMDefinition } from './adcom';
import type { CreativeDefinition } from './creative';
import type { OpenRTBDefinition } from './openrtb';

export type Definition = {
    openrtb: OpenRTBDefinition;
    adcom: AdCOMDefinition;
    creative: CreativeDefinition;
};