import { MyWorkbook } from "./index.js";
import { dxpConfigure } from "@flatfile/plugin-dxp-configure";
import { FlatfileListener } from "@flatfile/listener";
import { xlsxExtractorPlugin } from "@flatfile/plugin-xlsx-extractor";

export default (listener: FlatfileListener) => {
    
    listener.use(xlsxExtractorPlugin());

    listener.use(dxpConfigure(MyWorkbook));
  };