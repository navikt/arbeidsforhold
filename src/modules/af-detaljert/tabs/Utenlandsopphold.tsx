import React, { Fragment, useState } from "react";
import { AFUtenlandsopphold } from "../../../types/arbeidsforhold";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { CheckAndPrint } from "../../../components/check-and-print/CheckAndPrint";
import { sortPeriodeFraDesc } from "../../../utils/date";
import moment from "moment";
import { CheckDateAndPrint } from "../../../components/check-date-and-print/CheckDateAndPrint";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { Collapse, Expand } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";

interface Props {
  utenlandsopphold: AFUtenlandsopphold[];
}

export const Utenlandsopphold = (props: Props) => {
  const { locale } = useLocale();

  props.utenlandsopphold.sort((left, right) =>
    sortPeriodeFraDesc(left.periode, right.periode)
  );

  const initState: {
    [key: string]: {
      opphold: AFUtenlandsopphold[];
      ekspandert: boolean;
    };
  } = {};

  props.utenlandsopphold.map((opphold, i) => {
    const year = moment(opphold.periode.periodeFra).year();

    if (!initState[year]) {
      initState[year] = {
        opphold: [opphold],
        ekspandert: !i,
      };
    } else {
      initState[year].opphold.push(opphold);
    }
  });

  const [data, setData] = useState(initState);
  return (
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].periode}
          </Heading>
        </div>
        <div className="af-detaljert__flex-kolonne" />
        <div className="af-detaljert__flex-kolonne">
          <Heading as="p" size="xsmall">
            {sprak[locale].land}
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
                  className="af-detaljert__flex-kolonne af-liste__ekspander lenke"
                  onClick={onClick}
                >
                  {year} {value.ekspandert ? <Collapse /> : <Expand />}
                </button>
                <div />
              </div>
              {value.ekspandert &&
                value.opphold.map((time, i) => (
                  <div className="af-detaljert__flex-rad" key={`${i}`}>
                    <div className="af-detaljert__flex-kolonne af-liste__month  af-detaljert__heading">
                      <CheckDateAndPrint
                        data={time.periode.periodeFra}
                        dateFormat="MMMM"
                      />
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
