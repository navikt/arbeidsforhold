import React, { Fragment, useState } from "react";
import { AFTimerForTimelonnet } from "../../../types/arbeidsforhold";
import { CheckAndPrint } from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import { CheckDateAndPrint } from "../../../components/check-date-and-print/CheckDateAndPrint";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { ChevronUpIcon, ChevronDownIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";

interface Props {
  timer: AFTimerForTimelonnet[];
}

export const Timer = (props: Props) => {
  const { locale } = useLocale();

  props.timer.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  const initState: {
    [key: string]: {
      timerObjekt: AFTimerForTimelonnet[];
      ekspandert: boolean;
    };
  } = {};

  props.timer.map((timerObjekt, i) => {
    const year = moment(timerObjekt.rapporteringsperiode).year();

    if (!initState[year]) {
      initState[year] = {
        timerObjekt: [timerObjekt],
        ekspandert: !i,
      };
    } else {
      initState[year].timerObjekt.push(timerObjekt);
    }
  });

  const [data, setData] = useState(initState);

  return (
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne af-detaljert__rapporteringsperiode">
          <Heading as="p" size="xsmall">
            {sprak[locale].rapporteringsperiode}
          </Heading>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].opptjeningsperiode}
          </Heading>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].antalltimer}
          </Heading>
        </div>
      </div>
      {Object.keys(data)
        .reverse()
        .map((year) => {
          const value = data[year];

          const onClick = () =>
            setData({
              ...data,
              [year]: {
                ...data[year],
                ekspandert: !data[year].ekspandert,
              },
            });

          return (
            <Fragment key={year}>
              <div className="af-detaljert__flex-rad" key={year}>
                <button
                  className="af-detaljert__flex-kolonne af-liste__ekspander"
                  onClick={onClick}
                >
                  {year}{" "}
                  {value.ekspandert ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
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
