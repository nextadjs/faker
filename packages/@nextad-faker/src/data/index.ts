import type { Definition } from "@/definitions";
import site from "./adcom/context/site";
import seat from "./openrtb/bid-response/seat";
import display from "./creative/display";
import app from "./adcom/context/app";
import dooh from "./adcom/context/dooh";
import vast from "./creative/vast";
import title from "./creative/native/title";
import link from "./creative/native/link";
import image from "./creative/native/image";
import video from "./creative/native/video";
import dataNative from "./creative/native/data";
import device from "./adcom/context/device";
import content from "./adcom/context/content";
import user from "./adcom/context/user";
import geo from "./adcom/context/geo";
import deviceFull from "./adcom/context/deviceFull";
import bidV26 from "./openrtb/v26/bid";

export const data: Definition = {
  openrtb: {
    v26: {
      bid: bidV26
    },
    bidResponse: {
      seat: seat,
    },
  },
  adcom: {
    context: {
      site: site,
      app: app,
      dooh: dooh,
      device: device,
      content: content,
      user: user,
      geo: geo,
      deviceFull: deviceFull,
    },
  },
  creative: {
    display: display,
    vast: vast,
    native: {
      title: title,
      image: image,
      video: video,
      data: dataNative,
      link: link,
    },
  },
};
