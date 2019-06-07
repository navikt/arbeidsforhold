import React, { useState, Fragment } from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import { sortDateString } from "../../../utils/date";
import moment from "moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import sprak from "../../../language/provider";

interface Props {
  utenlandsopphold: AFUtenlandsopphold[];
  locale: string;
}

const Utenlandsopphold = (props: Props) => {
  const { locale } = props;

  props.utenlandsopphold.sort((left, right) =>
    left.periode && right.periode
      ? sortDateString(left.periode.periodeFra, right.periode.periodeFra)
      : 0
  );

  const initState: {
    [key: string]: {
      opphold: AFUtenlandsopphold[];
      ekspandert: boolean;
    };
  } = {};

  props.utenlandsopphold.map(opphold => {
    const year = moment(opphold.rapporteringsperiode).year();

    if (!initState[year]) {
      initState[year] = {
        opphold: [opphold],
        ekspandert: false
      };
    } else {
      initState[year].opphold.unshift(opphold);
    }
  });

  const [data, setData] = useState(initState);
  return (
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].rapporteringsperiode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].periode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].land}</Element>
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
                value.opphold.map((time, i) => (
                  <div className="af-detaljert__flex-rad" key={`${i}`}>
                    <div className="af-detaljert__flex-kolonne af-liste__month">
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
                      <CheckAndPrint data={time.land} />
                    </div>
                  </div>
                ))}
            </Fragment>
          );
        })}
    </div>
  );
};

export default Utenlandsopphold;
