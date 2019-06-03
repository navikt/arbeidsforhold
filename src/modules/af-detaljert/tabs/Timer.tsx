import React, { useState } from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortDateString } from "../../../utils/date";
import moment from "moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";

interface Props {
  timer: AFTimerForTimelonnet[];
}

const Timer = (props: Props) => {
  props.timer.sort((left, right) =>
    left.periode && right.periode
      ? sortDateString(left.periode.periodeFra, right.periode.periodeFra)
      : 0
  );

  const initState: {
    [key: string]: {
      timerObjekt: AFTimerForTimelonnet[];
      ekspandert: boolean;
    };
  } = {};

  props.timer.map((timerObjekt, i) => {
    const year = moment(timerObjekt.periode!.periodeFra).year();

    if (!initState[year]) {
      initState[year] = {
        timerObjekt: [timerObjekt],
        ekspandert: false
      };
    } else {
      initState[year].timerObjekt.unshift(timerObjekt);
    }
  });

  const [data, setData] = useState(initState);

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
        {Object.keys(data)
          .reverse()
          .map(year => {
            const value = data[year];
            return (
              <React.Fragment key={year}>
                <tr className="af-liste__rad" key={year}>
                  <td
                    className="af-liste__kolonne af-liste__ekspander"
                    colSpan={3}
                    onClick={() =>
                      setData({
                        ...data,
                        [year]: {
                          ...data[year],
                          ekspandert: !data[year].ekspandert
                        }
                      })
                    }
                  >
                    {year} {value.ekspandert ? <OppChevron /> : <NedChevron />}
                  </td>
                </tr>
                {value.ekspandert &&
                  value.timerObjekt.map((time, i) => (
                    <tr className="af-liste__rad" key={`${i}`}>
                      <td className="af-liste__kolonne">
                        <CheckAndPrint data={time.antallTimer} />
                      </td>
                      <td className="af-liste__kolonne">
                        <CheckAndPrint data={time.rapporteringsperiode} />
                      </td>
                      <td className="af-liste__kolonne">
                        <CheckPeriodAndPrint
                          data={time.periode}
                          twoLines={true}
                        />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
      </tbody>
    </table>
  );
};

export default Timer;
