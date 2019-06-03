import React, { useState } from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortDateString } from "../../../utils/date";
import moment from "moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";

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
      antallTimer: number;
      ekspandert: boolean;
    };
  } = {};

  props.timer.map(timerObjekt => {
    const year = moment(timerObjekt.periode!.periodeFra).year();

    if (!initState[year]) {
      initState[year] = {
        timerObjekt: [timerObjekt],
        antallTimer: timerObjekt.antallTimer || 0,
        ekspandert: false
      };
    } else {
      initState[year].timerObjekt.unshift(timerObjekt);
      initState[year].antallTimer += timerObjekt.antallTimer || 0;
    }
  });

  const [data, setData] = useState(initState);

  return (
    <table className="af-detaljert__tabs-innhold af-liste__table">
      <thead>
        <tr className="af-liste__rad">
          <td className="af-liste__kolonne">
            <Element>Periode</Element>
          </td>
          <td className="af-liste__kolonne">
            <Element>Rapporteringsperiode</Element>
          </td>
          <td className="af-liste__kolonne">
            <Element>Antall timer</Element>
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
                    colSpan={2}
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
                  <td>{!value.ekspandert && value.antallTimer}</td>
                </tr>
                {value.ekspandert &&
                  value.timerObjekt.map((time, i) => (
                    <tr className="af-liste__rad" key={`${i}`}>
                      <td className="af-liste__kolonne af-liste__month">
                        {time.periode && (
                          <CheckDateAndPrint
                            data={time.periode.periodeFra}
                            dateFormat="MMMM"
                          />
                        )}
                      </td>
                      <td className="af-liste__kolonne">
                        <CheckAndPrint data={time.rapporteringsperiode} />
                      </td>{" "}
                      <td className="af-liste__kolonne">
                        <CheckAndPrint data={time.antallTimer} />
                      </td>
                    </tr>
                  ))}
                {value.ekspandert && (
                  <tr className="af-liste__rad">
                    <td className="af-liste__kolonne" colSpan={2}>
                      Sum
                    </td>
                    <td className="af-liste__kolonne">{value.antallTimer}</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
      </tbody>
    </table>
  );
};

export default Timer;
