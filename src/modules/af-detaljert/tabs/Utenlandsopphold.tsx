import React from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";

interface Props {
  utenlandsopphold: AFUtenlandsopphold[];
}

const Utenlandsopphold = (props: Props) => (
  <table className="af-detaljert__tabs-innhold af-liste__table">
    <thead>
      <tr className="af-liste__rad">
        <td className="af-liste__kolonne">
          <Element>Landkode</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Rapporteringsperiode</Element>
        </td>
        <td className="af-liste__kolonne">
          <Element>Periode</Element>
        </td>
      </tr>
    </thead>
    <tbody>
      {props.utenlandsopphold.map((opphold, i) => (
        <tr className="af-liste__rad" key={`${i}`}>
          <td className="af-liste__kolonne">
            <CheckAndPrint data={opphold.landkode} />
          </td>
          <td className="af-liste__kolonne">
            <CheckAndPrint data={opphold.rapporteringsperiode} />
          </td>
          <td className="af-liste__kolonne">
            <CheckPeriodAndPrint data={opphold.periode} twoLines={true} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Utenlandsopphold;
