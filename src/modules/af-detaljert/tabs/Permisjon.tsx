import React from "react";
import Moment from "react-moment";
import { Element } from "nav-frontend-typografi";
import { AFPermisjonPermittering } from "../../../types/arbeidsforhold";

interface Props {
  permisjoner: AFPermisjonPermittering[];
}

const typer = {
  velferdspermisjon: "Velferdspermisjon",
  permisjonMedForeldrepenger: "Permisjon med foreldrepenger"
};

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
      {props.permisjoner.map(permisjon => (
        <tr
          className="af-liste__rad"
          key={`${permisjon.periode.fom}-${permisjon.periode.tom}`}
        >
          <td className="af-liste__kolonne">{typer[permisjon.type]}</td>
          <td className="af-liste__kolonne">{permisjon.prosent}</td>
          <td className="af-liste__kolonne">
            <Moment format="DD.MM.YYYY">{permisjon.periode.fom}</Moment>
            -<br />
            <Moment format="DD.MM.YYYY">{permisjon.periode.tom}</Moment>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Permisjon;
