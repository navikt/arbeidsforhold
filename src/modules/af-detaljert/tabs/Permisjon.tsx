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
    <div className="af-detaljert__tableWrapper">
      <table className="af-detaljert__tabs-innhold af-detaljert__table">
        <thead>
          <tr>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].type}
              </Heading>
            </th>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].periode}
              </Heading>
            </th>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].prosent}
              </Heading>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.permisjoner.map((permisjon, i) => (
            <tr
              key={`${permisjon.permisjonPermitteringId}-${i}`}
            >
              <td >
                {permisjon.type}
              </td>
              <td>
                <CheckPeriodAndPrint data={permisjon.periode} />
              </td>
              <td>{permisjon.prosent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
