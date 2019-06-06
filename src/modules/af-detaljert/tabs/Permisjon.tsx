import React from "react";
import { Element } from "nav-frontend-typografi";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";

interface Props {
  permisjoner: AFPermisjonPermittering[];
}

const Permisjon = (props: Props) => (
  <table className="af-detaljert__tabs-innhold af-liste__table">
    <thead>
      <tr className="af-liste__rad">
        <td className="af-liste__kolonne">
          <Element>Type</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Prosent</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Periode</Element>
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
          <td className="af-liste__kolonne">{permisjon.prosent}</td>
          <td className="af-liste__kolonne">
            <CheckPeriodAndPrint data={permisjon.periode} twoLines={true} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Permisjon;
