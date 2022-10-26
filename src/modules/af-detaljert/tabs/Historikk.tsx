import React, { Fragment, useState } from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { Element } from "nav-frontend-typografi";
import { CheckAndPrint } from "../../../components/check-and-print/CheckAndPrint";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../../utils/date";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import sprak from "../../../language/provider";
import { ArbeidsavtaleFelter } from "../detaljer/ArbeidsavtaleFelter";
import { useLocale } from "../../common/useLocale";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

export const Historikk = (props: Props) => {
  const { locale } = useLocale();

  props.arbeidsavtaler
    .sort((left, right) =>
      sortPeriodeFraDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    )
    .sort((left, right) =>
      sortPeriodeTilDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    );

  const [data, setData] = useState(
    props.arbeidsavtaler.map((arbeidsavtale) => ({
      arbeidsavtale: arbeidsavtale,
      ekspandert: false,
    }))
  );

  return (
    <div className="af-detaljert__tabs-innhold af-detaljert__flex-table">
      <div className="af-detaljert__flex-rad af-detaljert__head">
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].yrke}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne">
          <Element>{sprak[locale].periode}</Element>
        </div>
        <div className="af-detaljert__flex-kolonne" />
      </div>
      {data.map((innslag, counter) => {
        const { arbeidsavtale, ekspandert } = innslag;

        const onClick = () =>
          setData(
            data.map((values, i) =>
              i === counter
                ? { ...values, ekspandert: !data[i].ekspandert }
                : values
            )
          );

        return (
          <Fragment key={counter}>
            <div className="af-detaljert__flex-rad" key={counter}>
              <div className="af-detaljert__flex-kolonne af-detaljert__heading">
                <CheckAndPrint data={arbeidsavtale.yrke} />
              </div>
              <div className="af-detaljert__flex-kolonne">
                <CheckPeriodAndPrint data={arbeidsavtale.gyldighetsperiode} />
              </div>
              <button
                className="af-detaljert__flex-kolonne af-liste__ekspander lenke"
                onClick={onClick}
              >
                {!ekspandert ? (
                  <span>
                    {sprak[locale].apne} <NedChevron />
                  </span>
                ) : (
                  <span>
                    {sprak[locale].lukke} <OppChevron />
                  </span>
                )}
              </button>
            </div>
            {ekspandert && (
              <div className="af-detaljert__flex-rad">
                <div className="af-detaljert__flex-kolonne">
                  <ArbeidsavtaleFelter data={arbeidsavtale} isUtvidet={false} />
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
