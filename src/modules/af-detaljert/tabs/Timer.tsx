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
    <div className="af-detaljert__tableWrapper">
      <table className="af-detaljert__tabs-innhold af-detaljert__table">
        <thead>
          <tr>
            <th className="af-detaljert__rapporteringsperiode">
              <Heading as="p" size="xsmall">
                {sprak[locale].rapporteringsperiode}
              </Heading>
            </th>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].opptjeningsperiode}
              </Heading>
            </th>
            <th>
              <Heading as="p" size="xsmall">
                {sprak[locale].antalltimer}
              </Heading>
            </th>
          </tr>
        </thead>
        <tbody>
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
                  <tr  key={year}>
                    <td colSpan={3}>
                      <button
                        className="af-liste__ekspander"
                        onClick={onClick}
                      >
                        {year}{" "}
                        {value.ekspandert ? (
                          <ChevronUpIcon aria-hidden="true" />
                        ) : (
                          <ChevronDownIcon aria-hidden="true" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {value.ekspandert &&
                    value.timerObjekt.map((time, i) => (
                      <tr  key={`${i}`}>
                        <td className=" af-liste__month">
                          {time.periode && (
                            <CheckDateAndPrint
                              data={time.rapporteringsperiode}
                              dateFormat="MMMM"
                            />
                          )}
                        </td>
                        <td>
                          <CheckPeriodAndPrint data={time.periode} />
                        </td>
                        <td>
                          <CheckAndPrint data={time.antallTimer} />
                        </td>
                      </tr>
                    ))}
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
