import { Module } from "@/module";
import type { BidResponseV26 } from "@/types/openrtb";

export class BidResponseV26Module extends Module {
  public minimal(): BidResponseV26 {
    return {
      id: this.helper.generateUUID(),
      seatbid: [
        {
          bid: [
            {
              id: "1",
              impid: "1",
              price: this.helper.generateRandomDecimal(0, 10),
              w: 300,
              h: 250,
              adm: "<div>banner ad</div>",
              mtype: 1,
            },
          ],
          seat: this.helper.selectRandomArrayItem<string>(
            this.definitions.openrtb.bidResponse.seat
          ),
        },
      ],
    };
  }
}
