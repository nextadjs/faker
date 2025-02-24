import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { bidRequestSchema } from "@nextad/openrtb/schema/v26";
import { AudioVideoCreativeSubtype } from "iab-adcom";
import { Asset } from "iab-native";
import { NoBidReasonCode } from "iab-openrtb/v26";
import { Faker } from '@nextad/faker/instance';

const app = new Hono();    

app.post("/openrtb/v26", zValidator("json", bidRequestSchema), (c) => {
  const validatedBidRequest = c.req.valid("json");

  const faker = new Faker();
  let bidResponse = faker.openrtb.v26.bidResponse;

  bidResponse.beginSeatBid("nextadjs");
  for (let imp of validatedBidRequest.imp) {
    if (imp?.banner) {
      const defaultFormat = { w: 300, h: 250 };
      const format = imp.banner?.format?.[0] || defaultFormat;

      const width = imp.banner?.w || format.w || 300;
      const height = imp.banner?.h || format.h || 250;

      bidResponse.addBannerBid({
        impid: imp.id,
        adm: faker.creative.display.size(width, height),
        attr: [12],
      });
    } else if (imp?.video) {
      bidResponse.addVideoBid({
        impid: imp.id,
        adm: faker.creative.vast.v42(), // TODO: support to version switch
        protocol: AudioVideoCreativeSubtype.VAST_4_2,
        // TODO: support to api framework
      });
    } else if (imp?.native) {     
      bidResponse.addNativeBid(
        faker.creative.native.request(
          JSON.parse(imp.native.request).assets as unknown as Asset[]
        ),
        {
          impid: imp.id,
        }
      );
    }
  }

  faker.reset();

  return c.json(bidResponse.make());
});

// nbr point
app.post("openrtb/v26/nbr/:nbr", (c) => {
  const nbr = (Number(c.req.query("nbr")) || 0) as unknown as NoBidReasonCode;
  const faker = new Faker();
  let bidResponse = faker.openrtb.v26.bidResponse;
  return c.json(bidResponse.nbr(nbr));
});

// probility point

export default app;
