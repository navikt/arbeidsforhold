import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { AFListeProps, AFListeData } from "./index";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../utils/date";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import sprak from "../../language/provider";
import { ListeTittel } from "./ListeTittel";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ListePDF from "./ListePDF";
import PrinterIcon from "../../assets/icons/printer";

const Arbeidsforhold = (props: AFListeProps & AFListeData) => {
  const { arbeidsforhold, onClick } = props;
  const [visAlle, settVisAlle] = useState<boolean>(false);
  const toggleVisAlle = () => settVisAlle(!visAlle);
  const locale = props.locale;

  const sorterteArbeidsforhold = arbeidsforhold
    .sort((a, b) =>
      sortPeriodeFraDesc(
        a.ansettelsesperiode.periode,
        b.ansettelsesperiode.periode
      )
    )
    .sort((a, b) =>
      sortPeriodeTilDesc(
        a.ansettelsesperiode.periode,
        b.ansettelsesperiode.periode
      )
    );

  return (
    <div className={`af-liste__container`}>
      <div className="af-liste__table">
        {sorterteArbeidsforhold.length > 0 ? (
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
                    <CheckAndPrint data={foretak.yrke} font="typo-normal" />
                  </div>
                  <div className="af-liste__tekst typo-normal">
                    <CheckPeriodAndPrint
                      data={foretak.ansettelsesperiode.periode}
                      maskineltAvsluttet={
                        foretak.ansettelsesperiode.varslingskode
                          ? sprak[props.locale][
                              foretak.ansettelsesperiode.varslingskode
                            ]
                          : null
                      }
                    />
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
        <button
          className="af-liste__vis-flere lenke"
          onClick={toggleVisAlle}
          aria-expanded={visAlle}
        >
          {visAlle ? (
            <Normaltekst>
              {sprak[props.locale].visfaerrearbeidsforhold} <OppChevron />
            </Normaltekst>
          ) : (
            <Normaltekst>
              {sprak[props.locale].visflerearbeidsforhold} <NedChevron />
            </Normaltekst>
          )}
        </button>
      )}
      {props.printActivated && arbeidsforhold.length > 0 && (
        <div className="af-liste__print-button">
          <Normaltekst>
            <PDFDownloadLink
              document={
                <ListePDF
                  locale={locale}
                  arbeidsforhold={arbeidsforhold}
                  printName={props.printName}
                  printSSO={props.printSSN}
                />
              }
              fileName="arbeidsforhold.pdf"
              className={"lenke"}
            >
              {({ loading }) =>
                loading ? null : (
                  <>
                    <PrinterIcon />
                    <span>Skriv ut</span>
                  </>
                )
              }
            </PDFDownloadLink>
          </Normaltekst>
        </div>
      )}
    </div>
  );
};

export default Arbeidsforhold;
