import type { AdCOMDefinition } from './adcom';
import type { OpenRTBDefinition } from './openrtb';

export type Definition = {
    openrtb: OpenRTBDefinition;
    adcom: AdCOMDefinition;
};