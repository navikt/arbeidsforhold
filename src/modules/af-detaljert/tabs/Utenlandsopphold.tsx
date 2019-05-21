import React from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import Moment from "react-moment";

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
      {props.utenlandsopphold.map(opphold => (
        <tr
          className="af-liste__rad"
          key={`${opphold.periode.fom}-${opphold.periode.tom}`}
        >
          <td className="af-liste__kolonne">{opphold.landkode}</td>
          <td className="af-liste__kolonne">
            <Moment format="MM.YYYY">{opphold.rapporteringsperiode}</Moment>
          </td>
          <td className="af-liste__kolonne">
            <Moment format="DD.MM.YYYY">{opphold.periode.fom}</Moment>
            -<br />
            <Moment format="DD.MM.YYYY">{opphold.periode.tom}</Moment>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Utenlandsopphold;
