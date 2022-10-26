import React from "react";
import { Element } from "nav-frontend-typografi";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sprak } from "../../../language/provider";
import { sortPeriodeFraDesc } from "../../../utils/date";
import { useLocale } from "../../common/useLocale";

interface Props {
  permisjoner: AFPermisjonPermittering[];
}

export const Permisjon = (props: Props) => {
  const { locale } = useLocale();

  props.permisjoner.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  return (
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].type}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].periode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].prosent}</Element>
        </div>
      </div>
      {props.permisjoner.map((permisjon, i) => (
        <div
          className="af-detaljert__flex-rad"
          key={`${permisjon.permisjonPermitteringId}-${i}`}
        >
          <div className="af-detaljert__flex-kolonne af-detaljert__heading">
            {permisjon.type}
          </div>
          <div className="af-detaljert__flex-kolonne">
            <CheckPeriodAndPrint data={permisjon.periode} />
          </div>
          <div className="af-detaljert__flex-kolonne">{permisjon.prosent}</div>
        </div>
      ))}
    </div>
  );
};
