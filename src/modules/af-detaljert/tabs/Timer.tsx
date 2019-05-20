import React from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import Moment from "react-moment";

interface Props {
  timer: AFTimerForTimelonnet[];
}

const Timer = (props: Props) => (
  <table className="af-detaljert__tabs-innhold af-liste__table">
    <tr className="af-liste__rad">
      <td className="af-liste__kolonne">
        <Element>Antall timer</Element>
      </td>
      <td className="af-liste__kolonne">
        <Element>Rapporteringsperiode</Element>
      </td>
      <td className="af-liste__kolonne">
        <Element>Periode</Element>
      </td>
    </tr>
    {props.timer.map(time => (
      <tr
        className="af-liste__rad"
        key={`${time.periode.fom}-${time.periode.tom}`}
      >
        <td className="af-liste__kolonne">{time.antallTimer}</td>
        <td className="af-liste__kolonne">
          <Moment format="MM.YYYY">{time.rapporteringsperiode}</Moment>
        </td>
        <td className="af-liste__kolonne">
          <Moment format="DD.MM.YYYY">{time.periode.fom}</Moment>
          -<br />
          <Moment format="DD.MM.YYYY">{time.periode.tom}</Moment>
        </td>
      </tr>
    ))}
  </table>
);

export default Timer;
