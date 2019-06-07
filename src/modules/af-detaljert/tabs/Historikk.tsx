import React, { useState, Fragment } from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { Element, Normaltekst } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import { sortDateString } from "../../../utils/date";
import CheckAndPrintBox from "../../../components/check-and-print-box/CheckAndPrintBox";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import sprak from "../../../language/provider";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
  locale: string;
}

const Historikk = (props: Props) => {
  const { locale } = props;

  props.arbeidsavtaler
    .sort((left, right) =>
      left.gyldighetsperiode && right.gyldighetsperiode
        ? sortDateString(
            left.gyldighetsperiode.periodeFra,
            right.gyldighetsperiode.periodeFra
          )
        : 0
    )
    .sort((left, right) =>
      left.gyldighetsperiode && right.gyldighetsperiode
        ? sortDateString(
            right.gyldighetsperiode.periodeTil,
            left.gyldighetsperiode.periodeTil
          )
        : 0
    );

  const [data, setData] = useState(
    props.arbeidsavtaler.map(arbeidsavtale => ({
      arbeidsavtale: arbeidsavtale,
      ekspandert: false
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
              <div
                className="af-detaljert__flex-kolonne af-liste__ekspander"
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
              </div>
            </div>
            {ekspandert && (
              <div className="af-detaljert__flex-rad">
                <div className="af-detaljert__flex-kolonne">
                  <div className="af-detaljert__innhold">
                    <CheckAndPrintBox
                      title={sprak[locale].arbeidsavtale}
                      data={arbeidsavtale.stillingsprosent}
                    >
                      <Normaltekst>
                        <CheckDateAndPrint
                          data={arbeidsavtale.sisteStillingsendring}
                          format={`(${
                            sprak[locale].endretstillingsprosent
                          } %s)`}
                        />
                      </Normaltekst>
                    </CheckAndPrintBox>
                    <CheckAndPrintBox
                      title={sprak[locale].arbeidstidsordning}
                      data={arbeidsavtale.arbeidstidsordning}
                    />
                    <CheckAndPrintBox
                      title={sprak[locale].sistelonnsendring}
                      data={arbeidsavtale.sisteLoennsendring}
                      date={true}
                    />
                    <CheckAndPrintBox
                      title={sprak[locale].timerperuke}
                      data={arbeidsavtale.antallTimerPrUke}
                    />
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Historikk;
