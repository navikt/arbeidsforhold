import React from "react";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sprak } from "../../../language/provider";
import { sortPeriodeFraDesc } from "../../../utils/date";
import { useLocale } from "../../common/useLocale";
import { Heading } from "@navikt/ds-react";

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
          <Heading as="p" size="xsmall">
            {sprak[locale].type}
          </Heading>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].periode}
          </Heading>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].prosent}
          </Heading>
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
