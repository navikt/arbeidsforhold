import React, { useState } from "react";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { HoyreChevron, NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, classNameContainer, onClick } = props;
  const [visAlle, settVisAlle] = useState(false);
  const toggleVisAlle = () => settVisAlle(!visAlle);
  return (
    <div
      className={`af-liste__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="af-liste__table">
        {arbeidsforhold
          .slice(0, visAlle ? arbeidsforhold.length : 5)
          .map(foretak => (
            <div className="af-liste__flex-rad" key={foretak.arbeidsforholdId}>
              <div className="af-liste__flex-innhold">
                <div>
                  <Element>{foretak.arbeidsgiver.orgnavn}</Element>
                </div>
                <div>
                  <Normaltekst>{foretak.yrke}</Normaltekst>
                </div>
                <div>
                  <Normaltekst>
                    {foretak.ansettelsesPeriode.periodeFra}-
                    {foretak.ansettelsesPeriode.periodeTil}
                  </Normaltekst>
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
    </div>
  );
};

export default Arbeidsforhold;
