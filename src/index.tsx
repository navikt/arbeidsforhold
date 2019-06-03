import "@babel/polyfill";
import "core-js";
import "./index.less";

import { setUpMock } from "./clients/apiMock";
import Environment from "./utils/environment";

import ListeMedArbeidsforhold from "./modules/af-liste";
import DetaljertArbeidsforhold from "./modules/af-detaljert";

import moment from "moment";
import "moment/locale/nb";
moment.locale("nb");

if (process.env.NODE_ENV === "development") {
  Environment.settEnv("LOCAL");
  setUpMock();
}

export { ListeMedArbeidsforhold, DetaljertArbeidsforhold };
export default ListeMedArbeidsforhold;
