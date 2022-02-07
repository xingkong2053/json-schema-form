import { CommonWidgetComponentType, SelectWidgetComponentType, SelectWidgetNames, Theme } from "../../lib/types";
import SelectWidget from "./SelectWidget";
import NumberWidget from "./NumberWidget";
import StringWidget from "./StringWidget";

const theme: Theme = {
  widgets: {
    StringWidget: StringWidget as CommonWidgetComponentType,
    NumberWidget: NumberWidget as CommonWidgetComponentType,
    [SelectWidgetNames.SelectWidget]: SelectWidget as SelectWidgetComponentType,
  }
}

export default theme