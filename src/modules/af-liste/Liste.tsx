import React, { useState } from "react";
import { Normaltekst, Element, Undertekst } from "nav-frontend-typografi";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../utils/date";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../language/provider";

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

  const replaceId = (path: string, id: number) =>
    path.replace("{id}", id.toString());

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
                  {(() => {
                    switch (onClick.type) {
                      case "INGEN_ON_CLICK":
                        return (
                          <Element>
                            <CheckAndPrint
                              data={foretak.arbeidsgiver.orgnavn}
                            />
                          </Element>
                        );
                      case "LENKE":
                        return (
                          <Element>
                            <a
                              className="lenke"
                              href={replaceId(
                                onClick.href,
                                foretak.navArbeidsforholdId
                              )}
                            >
                              <CheckAndPrint
                                data={foretak.arbeidsgiver.orgnavn}
                              />
                            </a>
                          </Element>
                        );
                      case "REACT_ROUTER_LENKE":
                        return (
                          <Element>
                            <onClick.Component
                              className="lenke"
                              to={replaceId(
                                onClick.to,
                                foretak.navArbeidsforholdId
                              )}
                            >
                              <CheckAndPrint
                                data={foretak.arbeidsgiver.orgnavn}
                              />
                            </onClick.Component>
                          </Element>
                        );
                      case "KNAPP":
                        return (
                          <div
                            className="lenke"
                            onClick={() =>
                              onClick.getId(foretak.navArbeidsforholdId)
                            }
                          >
                            <Element>
                              <CheckAndPrint
                                data={foretak.arbeidsgiver.orgnavn}
                              />
                            </Element>
                          </div>
                        );
                    }
                  })()}
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
          ))}
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
