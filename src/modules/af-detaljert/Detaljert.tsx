import React, { useState } from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrintBox from "../../components/check-and-print-box/CheckAndPrintBox";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import sprak from "../../language/provider";
import { Checkbox, CheckboxGruppe } from "nav-frontend-skjema";
import ArbeidsavtaleFelter from "../../components/arbeidsavtale/ArbeidsavtaleFelter";
import { orgnr } from "../../utils/orgnr";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";
import PrinterIcon from "../../assets/icons/printer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DetaljertPDF from "./pdf/DetaljertPDF";
import ModalWrapper from "nav-frontend-modal";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AFUtvidet } from "../../types/arbeidsforhold";
import { DetaljertTabs } from "./DetaljertTabs";
import { useLocale } from "../common/useLocale";
import { useIsPdf } from "../common/useIsPdf";

const Detaljert = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold } = props;
  const { arbeidsavtaler, permisjonPermittering } = arbeidsforhold;
  const { antallTimerForTimelonnet, utenlandsopphold } = arbeidsforhold;
  const { locale } = useLocale();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [printGenerellOversikt, settPrintGenerellOversikt] =
    useState<boolean>(true);
  const [printTimerTimelonnet, settPrintTimerTimelonnet] = useState<boolean>(
    antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0
  );
  const [printPermisjon, settPrintPermisjon] = useState<boolean>(
    permisjonPermittering && permisjonPermittering.length > 0
  );
  const [printUtenlandsopphold, settPrintUtenlandsopphold] = useState<boolean>(
    utenlandsopphold && utenlandsopphold.length > 0
  );
  const [printHistorikk, settPrintHistorikk] = useState<boolean>(
    arbeidsavtaler && arbeidsavtaler.length > 0
  );

  return (
    <div className={`af-detaljert__container`}>
      <div className="af-detaljert__header">
        <div className="af-detaljert__kolonne">
          <div className="af-detaljert__arbeidsgiver">
            <Undertittel>
              <ArbeidsgiverTittel
                overskrift={true}
                arbeidsgiver={arbeidsforhold.arbeidsgiver}
              />
            </Undertittel>
            {arbeidsforhold.arbeidsgiver.type === "Organisasjon" && (
              <div className="af-detaljert__orgnr">
                <Normaltekst>
                  <CheckAndPrint
                    data={orgnr(arbeidsforhold.arbeidsgiver.orgnr)}
                    format={`${sprak[locale].organisasjonsnummer} %s`}
                  />
                </Normaltekst>
              </div>
            )}
          </div>
        </div>
        {arbeidsforhold.ansettelsesperiode && (
          <div className="af-detaljert__kolonne af-detaljert__periode">
            <div className="af-detaljert__arbeidsgiver">
              <Undertittel>
                <span className="typo-element">
                  {sprak[locale].ansettelsesperiode}
                </span>
              </Undertittel>
              <div className="af-detaljert__orgnr">
                <Normaltekst>
                  <CheckPeriodAndPrint
                    data={arbeidsforhold.ansettelsesperiode.periode}
                  />
                  <CheckAndPrint
                    data={arbeidsforhold.ansettelsesperiode?.sluttaarsak}
                    format={`(${sprak[locale].sluttaarsak}: %s)`}
                  />
                </Normaltekst>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="af-detaljert__innhold">
        {arbeidsforhold.opplysningspliktigarbeidsgiver.type ===
          "Organisasjon" && (
          <CheckAndPrintBox
            title={sprak[locale].hovedenhet}
            data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnavn}
          >
            <Normaltekst>
              <CheckAndPrint
                data={orgnr(
                  arbeidsforhold.opplysningspliktigarbeidsgiver.orgnr
                )}
                format={`${sprak[locale].organisasjonsnummer} %s`}
              />
            </Normaltekst>
          </CheckAndPrintBox>
        )}
        <CheckAndPrintBox
          title={sprak[locale].yrke}
          data={arbeidsforhold.yrke}
        />
        <CheckAndPrintBox
          title={sprak[locale].typearbeidsforhold}
          data={arbeidsforhold.type}
        />
        <CheckAndPrintBox
          title={sprak[locale].arbeidsforholdid}
          data={arbeidsforhold.eksternArbeidsforholdId}
        />
        <ArbeidsavtaleFelter data={arbeidsforhold} />
        <CheckAndPrintBox
          title={sprak[locale].sistbekreftet}
          data={arbeidsforhold.sistBekreftet}
          date={true}
        />
      </div>
      <DetaljertTabs arbeidsforhold={arbeidsforhold} />
      <AlertStripeInfo>
        {sprak[locale].hvisfeil1}
        <br />
        {sprak[locale].hvisfeil2}
      </AlertStripeInfo>

      {props.printActivated && (
        <div className="af-detaljert__print-button-oversikt">
          <Normaltekst>
            {
              // Show modal with checkboxes if user has relevant data
              (antallTimerForTimelonnet &&
                antallTimerForTimelonnet.length > 0) ||
              (permisjonPermittering && permisjonPermittering.length > 0) ||
              (utenlandsopphold && utenlandsopphold.length > 0) ||
              (arbeidsavtaler && arbeidsavtaler.length > 0) ? (
                <button
                  className={"lenke af-detaljert__print-button"}
                  onClick={() => setOpenModal(true)}
                >
                  <PrinterIcon />
                  <span>Skriv ut</span>
                </button>
              ) : (
                <DownloadPDFLink
                  arbeidsforhold={arbeidsforhold}
                  printGenerellOversikt={printGenerellOversikt}
                  printTimerTimelonnet={printTimerTimelonnet}
                  printPermisjon={printPermisjon}
                  printUtenlandsopphold={printUtenlandsopphold}
                  printHistorikk={printHistorikk}
                  printName={props.printName}
                  printSSO={props.printSSN}
                />
              )
            }
          </Normaltekst>
        </div>
      )}

      {props.printActivated && (
        <ModalWrapper
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          contentLabel="Utskriftsvalg"
          closeButton={true}
        >
          <div style={{ padding: "2rem 2.5rem" }}>
            <CheckboxGruppe
              legend={sprak[locale].utskriftsvalg}
              className={"af-detaljert__checkboxes"}
            >
              <Checkbox
                label={sprak[locale].generelleopplysninger}
                className={"af-detaljert__checkbox"}
                checked={printGenerellOversikt}
                onChange={() =>
                  settPrintGenerellOversikt(!printGenerellOversikt)
                }
              />
            </CheckboxGruppe>
            <CheckboxGruppe
              legend={sprak[locale].tilleggsopplysninger}
              className={"af-detaljert__checkboxes"}
            >
              {antallTimerForTimelonnet &&
                antallTimerForTimelonnet.length > 0 && (
                  <Checkbox
                    label={sprak[locale].tabs.timerfortimelonnet}
                    className={"af-detaljert__checkbox"}
                    checked={printTimerTimelonnet}
                    onChange={() =>
                      settPrintTimerTimelonnet(!printTimerTimelonnet)
                    }
                  />
                )}
              {permisjonPermittering && permisjonPermittering.length > 0 && (
                <Checkbox
                  label={sprak[locale].tabs.permisjonpermittering}
                  className={"af-detaljert__checkbox"}
                  checked={printPermisjon}
                  onChange={() => settPrintPermisjon(!printPermisjon)}
                />
              )}
              {utenlandsopphold && utenlandsopphold.length > 0 && (
                <Checkbox
                  label={sprak[locale].tabs.arbeidiutlandet}
                  className={"af-detaljert__checkbox"}
                  checked={printUtenlandsopphold}
                  onChange={() =>
                    settPrintUtenlandsopphold(!printUtenlandsopphold)
                  }
                />
              )}
              {arbeidsavtaler && arbeidsavtaler.length > 0 && (
                <Checkbox
                  label={sprak[locale].tabs.historikk}
                  className={"af-detaljert__checkbox"}
                  checked={printHistorikk}
                  onChange={() => settPrintHistorikk(!printHistorikk)}
                />
              )}
            </CheckboxGruppe>
            <div className="af-detaljert__print-button-modal">
              <Normaltekst>
                <DownloadPDFLink
                  arbeidsforhold={arbeidsforhold}
                  printGenerellOversikt={printGenerellOversikt}
                  printTimerTimelonnet={printTimerTimelonnet}
                  printPermisjon={printPermisjon}
                  printUtenlandsopphold={printUtenlandsopphold}
                  printHistorikk={printHistorikk}
                  printName={props.printName}
                  printSSO={props.printSSN}
                />
              </Normaltekst>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

interface DownloadPDFLinkProps {
  arbeidsforhold: AFUtvidet;
  printGenerellOversikt: boolean;
  printTimerTimelonnet: boolean;
  printPermisjon: boolean;
  printUtenlandsopphold: boolean;
  printHistorikk: boolean;
  printName: string;
  printSSO: string;
}

const DownloadPDFLink = (props: DownloadPDFLinkProps) => {
  const { IsPdfProvider } = useIsPdf();
  const { locale, LocaleProvider } = useLocale();
  return (
    <PDFDownloadLink
      key={Math.random()}
      document={
        <IsPdfProvider value={true}>
          {/* LocaleProvider-wrapper nødvendig for å få med locale i PDF-rendering */}
          <LocaleProvider value={locale}>
            <DetaljertPDF
              arbeidsforhold={props.arbeidsforhold}
              printGenerellOversikt={props.printGenerellOversikt}
              printTimerTimelonnet={props.printTimerTimelonnet}
              printPermisjon={props.printPermisjon}
              printUtenlandsopphold={props.printUtenlandsopphold}
              printHistorikk={props.printHistorikk}
              printName={props.printName}
              printSSO={props.printSSO}
            />
          </LocaleProvider>
        </IsPdfProvider>
      }
      fileName="arbeidsforhold.pdf"
      className={"lenke"}
    >
      {({ loading }) =>
        loading ? (
          <NavFrontendSpinner type={"XXS"} />
        ) : (
          <>
            <PrinterIcon />
            <span>Skriv ut</span>
          </>
        )
      }
    </PDFDownloadLink>
  );
};

export default Detaljert;
