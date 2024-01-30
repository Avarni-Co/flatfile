// import { MyWorkbook } from "./index.js";
import { spendWorkbook, fuelWorkbook, energyWorkbook, travelWorkbook } from "./index"
import { dxpConfigure } from "@flatfile/plugin-dxp-configure";
import { FlatfileListener } from "@flatfile/listener";
import { xlsxExtractorPlugin } from "@flatfile/plugin-xlsx-extractor";

export default (listener: FlatfileListener) => {

  listener.namespace(['*:spend'], (spend) =>
    spend.use(dxpConfigure(spendWorkbook))
  )

  listener.namespace(['*:fuel'], (fuel) => 
    fuel.use(dxpConfigure(fuelWorkbook))
  )

  listener.namespace(['*:energy'], (energy) =>
    energy.use(dxpConfigure(energyWorkbook))
  )

  listener.namespace(['*:travel'], (travel) =>
    travel.use(dxpConfigure(travelWorkbook))
  )
  
  listener.use(xlsxExtractorPlugin())

  };