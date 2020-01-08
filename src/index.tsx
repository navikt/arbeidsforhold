import "./index.less";

import Environment from "./utils/environment";

import ListeMedArbeidsforhold, { AFListeOnClick } from "./modules/af-liste";
import DetaljertArbeidsforhold from "./modules/af-detaljert";
import "./language/provider";

if (process.env.NODE_ENV === "development") {
  Environment.settEnv("LOCAL");
}

export { ListeMedArbeidsforhold, DetaljertArbeidsforhold, AFListeOnClick };
export default ListeMedArbeidsforhold;
