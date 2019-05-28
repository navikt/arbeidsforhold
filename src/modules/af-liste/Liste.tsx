import React, { useState } from "react";
import { Normaltekst, Element, Undertekst } from "nav-frontend-typografi";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";
import { sortDateString } from "../../utils/date";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, onClick } = props;
  const [visAlle, settVisAlle] = useState(false);
  const toggleVisAlle = () => settVisAlle(!visAlle);

  const sorterteArbeidsforhold = arbeidsforhold
    .sort((a, b) =>
      sortDateString(
        b.ansettelsesPeriode.periodeFra,
        a.ansettelsesPeriode.periodeFra
      )
    )
    .sort((a, b) =>
      sortDateString(
        b.ansettelsesPeriode.periodeTil,
        a.ansettelsesPeriode.periodeTil
      )
    );

  return (
    <div className={`af-liste__container`}>
      <div className="af-liste__table">
        {sorterteArbeidsforhold
          .slice(0, visAlle ? arbeidsforhold.length : 5)
          .map((foretak, counter) => (
            <div
              className="af-liste__flex-rad"
              key={`${foretak.arbeidsforholdId}-${counter}`}
            >
              <div className="af-liste__flex-innhold">
                <div className="af-liste__tekst">
                  <div
                    className={"lenke"}
                    onClick={() => onClick(foretak.navArbeidsforholdId)}
                  >
                    <Element>
                      <CheckAndPrint data={foretak.arbeidsgiver.orgnavn} />
                    </Element>
                  </div>
                </div>
                <div className="af-liste__tekst">
                  <Normaltekst>
                    <CheckAndPrint data={foretak.yrke} />
                  </Normaltekst>
                </div>
                <div className="af-liste__tekst">
                  <Undertekst>
                    <CheckPeriodAndPrint data={foretak.ansettelsesPeriode} />
                  </Undertekst>
                </div>
              </div>
            </div>
          ))}
      </div>
      {arbeidsforhold.length > 5 && (
        <div className="af-liste__vis-flere" onClick={toggleVisAlle}>
          {visAlle ? (
            <span>
              Vis færre arbeidsforhold <OppChevron />
            </span>
          ) : (
            <span>
              Vis flere arbeidsforhold <NedChevron />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Arbeidsforhold;
