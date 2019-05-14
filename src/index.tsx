import "@babel/polyfill";
import "core-js";
import "./index.less";

import ListeMedArbeidsforhold from "./modules/af-liste";
import DetaljertArbeidsforhold from "./modules/af-detaljert";
import { setUpMock } from "./clients/apiMock";

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

export { ListeMedArbeidsforhold, DetaljertArbeidsforhold };
export default ListeMedArbeidsforhold;
