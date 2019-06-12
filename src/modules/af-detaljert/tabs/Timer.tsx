import React, { useState, Fragment } from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../../language/provider";

interface Props {
  timer: AFTimerForTimelonnet[];
  locale: string;
}

const Timer = (props: Props) => {
  const { locale } = props;

  props.timer.sort((left, right) =>
    sortPeriodeFraDesc(right.periode, left.periode)
  );

  const initState: {
    [key: string]: {
      timerObjekt: AFTimerForTimelonnet[];
      ekspandert: boolean;
    };
  } = {};

  props.timer.map(timerObjekt => {
    const year = moment(timerObjekt.rapporteringsperiode).year();

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
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne af-detaljert__rapporteringsperiode">
          <Element>{sprak[locale].rapporteringsperiode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].opptjeningsperiode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].antalltimer}</Element>
        </div>
      </div>
      {Object.keys(data)
        .reverse()
        .map(year => {
          const value = data[year];

          const onClick = () =>
            setData({
              ...data,
              [year]: {
                ...data[year],
                ekspandert: !data[year].ekspandert
              }
            });

          return (
            <Fragment key={year}>
              <div className="af-detaljert__flex-rad" key={year}>
                <div
                  className="af-detaljert__flex-kolonne af-liste__ekspander"
                  onClick={onClick}
                >
                  {year} {value.ekspandert ? <OppChevron /> : <NedChevron />}
                </div>
                <div />
              </div>
              {value.ekspandert &&
                value.timerObjekt.map((time, i) => (
                  <div className="af-detaljert__flex-rad" key={`${i}`}>
                    <div className="af-detaljert__flex-kolonne af-liste__month af-detaljert__heading">
                      {time.periode && (
                        <CheckDateAndPrint
                          data={time.rapporteringsperiode}
                          dateFormat="MMMM"
                        />
                      )}
                    </div>
                    <div className="af-detaljert__flex-kolonne">
                      <CheckPeriodAndPrint data={time.periode} />
                    </div>
                    <div className="af-detaljert__flex-kolonne">
                      <CheckAndPrint data={time.antallTimer} />
                    </div>
                  </div>
                ))}
            </Fragment>
          );
        })}
    </div>
  );
};

export default Timer;
