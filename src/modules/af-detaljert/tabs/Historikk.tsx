import React, { useState, Fragment } from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { Element, Normaltekst } from "nav-frontend-typografi";
import CheckAndPrint from "../../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import { sortDateString } from "../../../utils/date";
import CheckAndPrintBox from "../../../components/check-and-print-box/CheckAndPrintBox";
import { NedChevron, OppChevron } from "nav-frontend-chevron";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
}

const Historikk = (props: Props) => {
  props.arbeidsavtaler.sort((left, right) =>
    left.gyldighetsperiode && right.gyldighetsperiode
      ? sortDateString(
          left.gyldighetsperiode.periodeFra,
          right.gyldighetsperiode.periodeFra
        )
      : 0
  );

  const [data, setData] = useState(
    props.arbeidsavtaler.map(arbeidsavtale => ({
      arbeidsavtale: arbeidsavtale,
      ekspandert: false
    }))
  );

  console.log(data);

  return (
    <table className="af-detaljert__tabs-innhold af-liste__table">
      <thead>
        <tr className="af-liste__rad">
          <td className="af-liste__kolonne">
            <Element>Yrke</Element>
          </td>
          <td className="af-liste__kolonne">
            <Element>Periode</Element>
          </td>
          <td className="af-liste__kolonne" />
        </tr>
      </thead>
      <tbody>
        {data.map((innslag, counter) => {
          const { arbeidsavtale, ekspandert } = innslag;
          return (
            <Fragment key={counter}>
              <tr className="af-liste__rad" key={counter}>
                <td className="af-liste__kolonne">
                  <CheckAndPrint data={arbeidsavtale.yrke} />
                </td>
                <td className="af-liste__kolonne">
                  <CheckPeriodAndPrint
                    data={arbeidsavtale.gyldighetsperiode}
                    twoLines={true}
                  />
                </td>
                <td
                  className="af-liste__kolonne af-liste__ekspander"
                  onClick={() =>
                    setData(
                      data.map((values, i) =>
                        i === counter
                          ? { ...values, ekspandert: !data[i].ekspandert }
                          : values
                      )
                    )
                  }
                >
                  {!ekspandert ? (
                    <span>
                      Åpne <NedChevron />
                    </span>
                  ) : (
                    <span>
                      Lukk <OppChevron />
                    </span>
                  )}
                </td>
              </tr>
              {ekspandert && (
                <tr className="af-liste__rad">
                  <td className="af-liste__kolonne" colSpan={3}>
                    <div className="af-detaljert__innhold">
                      <CheckAndPrintBox
                        title="Arbeidsavtale"
                        data={arbeidsavtale.stillingsprosent}
                      >
                        <Normaltekst>
                          <CheckDateAndPrint
                            data={arbeidsavtale.sisteStillingsendring}
                            format="(Endret stillingsprosent %s)"
                          />
                        </Normaltekst>
                      </CheckAndPrintBox>
                      <CheckAndPrintBox
                        title="Arbeidstidsordning"
                        data={arbeidsavtale.arbeidstidsordning}
                      />
                      <CheckAndPrintBox
                        title="Siste lønnsendring"
                        data={arbeidsavtale.sisteLoennsendring}
                        date={true}
                      />
                      <CheckAndPrintBox
                        title="Timer i full stilling"
                        data={arbeidsavtale.antallTimerPrUke}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Historikk;
