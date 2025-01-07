import type { AdCOMDefinition } from './adcom';
import type { OpenRTBV26Definition } from './openrtbv26';

export type Definition = {
    openrtb: {
        v26: OpenRTBV26Definition;
    }
    adcom: AdCOMDefinition;
};