import React from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortDateString } from "../../../utils/date";

interface Props {
  timer: AFTimerForTimelonnet[];
}

const Timer = (props: Props) => {
  const sorterteTimer = props.timer.sort((left, right) =>
    left.periode && right.periode
      ? sortDateString(left.periode.periodeFra, right.periode.periodeFra)
      : 0
  );

  return (
    <table className="af-detaljert__tabs-innhold af-liste__table">
      <thead>
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
      </thead>
      <tbody>
        {sorterteTimer.map((time, i) => (
          <tr className="af-liste__rad" key={`${i}`}>
            <td className="af-liste__kolonne">
              <CheckAndPrint data={time.antallTimer} />
            </td>
            <td className="af-liste__kolonne">
              <CheckAndPrint data={time.rapporteringsperiode} />
            </td>
            <td className="af-liste__kolonne">
              <CheckPeriodAndPrint data={time.periode} twoLines={true} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Timer;
