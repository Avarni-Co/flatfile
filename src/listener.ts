import { MyWorkbook } from "./index.js";
import { dxpConfigure } from "@flatfile/plugin-dxp-configure";
import { FlatfileListener } from "@flatfile/listener";

export default (listener: FlatfileListener) => {
    listener.use(dxpConfigure(MyWorkbook));
  };