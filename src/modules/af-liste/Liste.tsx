import React, { useState } from "react";
import { Normaltekst, Element, Undertekst } from "nav-frontend-typografi";
import { HoyreChevron, NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";
import Moment from "react-moment";
import { sortDateString } from "../../utils/date";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, classNameContainer, onClick } = props;
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
    <div
      className={`af-liste__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="af-liste__table">
        {sorterteArbeidsforhold
          .slice(0, visAlle ? arbeidsforhold.length : 5)
          .map(foretak => (
            <div className="af-liste__flex-rad" key={foretak.arbeidsforholdId}>
              <div className="af-liste__flex-innhold">
                <div className="af-liste__tekst">
                  <Element>{foretak.arbeidsgiver.orgnavn}</Element>
                </div>
                <div className="af-liste__tekst">
                  <Normaltekst>{foretak.yrke}</Normaltekst>
                </div>
                <div className="af-liste__tekst">
                  <Undertekst>
                    <Moment format="DD.MM.YYYY">
                      {foretak.ansettelsesPeriode.periodeFra}
                    </Moment>
                    {` - `}
                    {foretak.ansettelsesPeriode.periodeTil && (
                      <Moment format="DD.MM.YYYY">
                        {foretak.ansettelsesPeriode.periodeTil}
                      </Moment>
                    )}
                  </Undertekst>
                </div>
              </div>
              <div
                onClick={() => onClick(foretak.arbeidsforholdId)}
                className="af-liste__lenke"
              >
                Detaljer <HoyreChevron />
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
