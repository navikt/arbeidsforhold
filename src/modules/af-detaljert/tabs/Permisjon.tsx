import React from "react";
import { Element } from "nav-frontend-typografi";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";

interface Props {
  permisjoner: AFPermisjonPermittering[];
  locale: string;
}

const Permisjon = (props: Props) => {
  const { locale } = props;
  return (
    <table className="af-detaljert__tabs-innhold af-liste__table">
      <thead>
        <tr className="af-liste__rad">
          <td className="af-liste__kolonne">
            <Element>{sprak[locale].type}</Element>
          </td>
          <td className="af-liste__kolonne">
            <Element>{sprak[locale].periode}</Element>
          </td>
          <td className="af-liste__kolonne">
            <Element>{sprak[locale].prosent}</Element>
          </td>
        </tr>
      </thead>
      <tbody>
        {props.permisjoner.map((permisjon, i) => (
          <tr
            className="af-liste__rad"
            key={`${permisjon.permisjonPermitteringId}-${i}`}
          >
            <td className="af-liste__kolonne">{permisjon.type}</td>
            <td className="af-liste__kolonne">
              <CheckPeriodAndPrint data={permisjon.periode} />
            </td>
            <td className="af-liste__kolonne">{permisjon.prosent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Permisjon;
