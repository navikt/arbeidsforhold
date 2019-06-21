import React, { useState } from "react";
import { Normaltekst, Undertekst } from "nav-frontend-typografi";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../utils/date";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../language/provider";
import { ListeTittel } from "./ListeTittel";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, onClick } = props;
  const [visAlle, settVisAlle] = useState(false);
  const toggleVisAlle = () => settVisAlle(!visAlle);

  const sorterteArbeidsforhold = arbeidsforhold
    .sort((a, b) =>
      sortPeriodeFraDesc(a.ansettelsesperiode, b.ansettelsesperiode)
    )
    .sort((a, b) =>
      sortPeriodeTilDesc(a.ansettelsesperiode, b.ansettelsesperiode)
    );

  return (
    <div className={`af-liste__container`}>
      <div className="af-liste__table">
        {sorterteArbeidsforhold.length > 1 ? (
          sorterteArbeidsforhold
            .slice(0, visAlle ? arbeidsforhold.length : 5)
            .map((foretak, counter) => (
              <div
                className="af-liste__flex-rad"
                key={`${foretak.arbeidsforholdId}-${counter}`}
              >
                <div className="af-liste__flex-innhold">
                  <div className="af-liste__tekst">
                    <ListeTittel foretak={foretak} onClick={onClick} />
                  </div>
                  <div className="af-liste__tekst">
                    <Normaltekst>
                      <CheckAndPrint data={foretak.yrke} />
                    </Normaltekst>
                  </div>
                  <div className="af-liste__tekst">
                    <Undertekst>
                      <CheckPeriodAndPrint data={foretak.ansettelsesperiode} />
                    </Undertekst>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="af-liste__flex-rad">
            <Normaltekst>{sprak[props.locale].ingenarbeidsforhold}</Normaltekst>
          </div>
        )}
      </div>
      {arbeidsforhold.length > 5 && (
        <div className="af-liste__vis-flere" onClick={toggleVisAlle}>
          {visAlle ? (
            <span>
              {sprak[props.locale].visfaerrearbeidsforhold} <OppChevron />
            </span>
          ) : (
            <span>
              {sprak[props.locale].visflerearbeidsforhold} <NedChevron />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Arbeidsforhold;
