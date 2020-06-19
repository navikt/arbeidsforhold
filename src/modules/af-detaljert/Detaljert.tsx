import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { Undertittel, Normaltekst, Element } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Tabs from "nav-frontend-tabs";
import Historikk from "./tabs/Historikk";
import Permisjon from "./tabs/Permisjon";
import Timer from "./tabs/Timer";
import Utenlandsopphold from "./tabs/Utenlandsopphold";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrintBox from "../../components/check-and-print-box/CheckAndPrintBox";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import sprak from "../../language/provider";
import { Select } from "nav-frontend-skjema";
import ArbeidsavtaleFelter from "../../components/arbeidsavtale/Felter";
import { orgnr } from "../../utils/orgnr";
import ArbeidsgiverTittel from "../../components/arbeidsgiver/ArbeidsgiverTittel";
import PrinterIcon from "../../assets/icons/printer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CheckboxGruppe, Checkbox } from "nav-frontend-skjema";
import DetaljertPDF from "./DetaljertPDF";
import ModalWrapper from "nav-frontend-modal";
import NavFrontendSpinner from "nav-frontend-spinner";
import { AFUtvidet } from "../../types/arbeidsforhold";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, locale } = props;
  const { arbeidsavtaler, permisjonPermittering } = arbeidsforhold;
  const { antallTimerForTimelonnet, utenlandsopphold } = arbeidsforhold;

  const tabs = [] as { label: string }[];
  if (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) {
    tabs.push({ label: sprak[locale].tabs.timerfortimelonnet });
  }
  if (permisjonPermittering && permisjonPermittering.length > 0) {
    tabs.push({ label: sprak[locale].tabs.permisjonpermittering });
  }
  if (utenlandsopphold && utenlandsopphold.length > 0) {
    tabs.push({ label: sprak[locale].tabs.arbeidiutlandet });
  }
  if (arbeidsavtaler && arbeidsavtaler.length > 0) {
    tabs.push({ label: sprak[locale].tabs.historikk });
  }

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [printGenerellOversikt, settPrintGenerellOversikt] = useState<boolean>(
    true
  );
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
  const [visTab, settVisTab] = useState(
    tabs.length > 0 ? tabs[0].label : "Ugyldig tab"
  );

  const selectOnClick = (event: ChangeEvent<HTMLSelectElement>) =>
    settVisTab(event.currentTarget.value);

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
        <ArbeidsavtaleFelter locale={locale} data={arbeidsforhold} />
        <CheckAndPrintBox
          title={sprak[locale].sistbekreftet}
          data={arbeidsforhold.sistBekreftet}
          date={true}
        />
      </div>
      {tabs.length > 0 && (
        <>
          <div className="af-detaljert__tabs">
            <Tabs
              tabs={tabs}
              onChange={(
                _event: SyntheticEvent<EventTarget, Event>,
                index: number
              ) => settVisTab(tabs[index].label)}
            />
          </div>
          <div className="af-detaljert__select">
            <hr className="af-detaljert__hr" />
            {tabs.length > 1 ? (
              <Select label="" onChange={selectOnClick}>
                {tabs.map((tab) => (
                  <option key={tab.label} value={tab.label}>
                    {tab.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Element>{tabs[0].label}</Element>
            )}
          </div>
          {(() => {
            switch (visTab) {
              case sprak[locale].tabs.timerfortimelonnet:
                return (
                  <Timer timer={antallTimerForTimelonnet} locale={locale} />
                );
              case sprak[locale].tabs.permisjonpermittering:
                return (
                  <Permisjon
                    permisjoner={permisjonPermittering}
                    locale={locale}
                  />
                );
              case sprak[locale].tabs.arbeidiutlandet:
                return (
                  <Utenlandsopphold
                    utenlandsopphold={utenlandsopphold}
                    locale={locale}
                  />
                );
              case sprak[locale].tabs.historikk:
                return (
                  <Historikk arbeidsavtaler={arbeidsavtaler} locale={locale} />
                );
              default:
                return null;
            }
          })()}
        </>
      )}
      <AlertStripeInfo>
        {sprak[locale].hvisfeil1}
        <br />
        {sprak[locale].hvisfeil2}
      </AlertStripeInfo>
      <div className="af-detaljert__print-button-oversikt">
        <Normaltekst>
          {
            // Show modal with checkboxes if user has relevant data
            (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) ||
            (permisjonPermittering && permisjonPermittering.length > 0) ||
            (utenlandsopphold && utenlandsopphold.length > 0) ||
            (arbeidsavtaler && arbeidsavtaler.length > 0) ? (
              <a className={"lenke"} onClick={() => setOpenModal(true)}>
                <PrinterIcon />
                <span>Skriv ut</span>
              </a>
            ) : (
              <DownloadPDFLink
                locale={locale}
                arbeidsforhold={arbeidsforhold}
                printGenerellOversikt={printGenerellOversikt}
                printTimerTimelonnet={printTimerTimelonnet}
                printPermisjon={printPermisjon}
                printUtenlandsopphold={printUtenlandsopphold}
                printHistorikk={printHistorikk}
              />
            )
          }
          <a className={"lenke"} onClick={() => setOpenModal(true)}>
            <PrinterIcon />
            <span>Skriv ut</span>
          </a>
        </Normaltekst>
      </div>

      <ModalWrapper
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        contentLabel="Utskriftsvalg"
        closeButton={true}
      >
        <div style={{ padding: "2rem 2.5rem" }}>
          <CheckboxGruppe
            legend="Utskriftsvalg"
            className={"af-detaljert__checkboxes"}
          >
            <Checkbox
              label={"Generelle opplysninger"}
              className={"af-detaljert__checkbox"}
              checked={printGenerellOversikt}
              onChange={() => settPrintGenerellOversikt(!printGenerellOversikt)}
            />
          </CheckboxGruppe>
          <CheckboxGruppe
            legend="Velg hvilke tilleggsopplysninger du vil skrive ut"
            className={"af-detaljert__checkboxes"}
          >
            {antallTimerForTimelonnet &&
              antallTimerForTimelonnet.length > 0 && (
                <Checkbox
                  label={"Timer for timelønnet"}
                  className={"af-detaljert__checkbox"}
                  checked={printTimerTimelonnet}
                  onChange={() =>
                    settPrintTimerTimelonnet(!printTimerTimelonnet)
                  }
                />
              )}
            {permisjonPermittering && permisjonPermittering.length > 0 && (
              <Checkbox
                label={"Permisjon / permittering"}
                className={"af-detaljert__checkbox"}
                checked={printPermisjon}
                onChange={() => settPrintPermisjon(!printPermisjon)}
              />
            )}
            {utenlandsopphold && utenlandsopphold.length > 0 && (
              <Checkbox
                label={"Arbeid i utlandet"}
                className={"af-detaljert__checkbox"}
                checked={printUtenlandsopphold}
                onChange={() =>
                  settPrintUtenlandsopphold(!printUtenlandsopphold)
                }
              />
            )}
            {arbeidsavtaler && arbeidsavtaler.length > 0 && (
              <Checkbox
                label={"Historikk"}
                className={"af-detaljert__checkbox"}
                checked={printHistorikk}
                onChange={() => settPrintHistorikk(!printHistorikk)}
              />
            )}
          </CheckboxGruppe>
          <div className="af-detaljert__print-button-modal">
            <Normaltekst>
              <DownloadPDFLink
                locale={locale}
                arbeidsforhold={arbeidsforhold}
                printGenerellOversikt={printGenerellOversikt}
                printTimerTimelonnet={printTimerTimelonnet}
                printPermisjon={printPermisjon}
                printUtenlandsopphold={printUtenlandsopphold}
                printHistorikk={printHistorikk}
              />
            </Normaltekst>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

interface DownloadPDFLinkProps {
  locale: "nb" | "en";
  arbeidsforhold: AFUtvidet;
  printGenerellOversikt: boolean;
  printTimerTimelonnet: boolean;
  printPermisjon: boolean;
  printUtenlandsopphold: boolean;
  printHistorikk: boolean;
}

const DownloadPDFLink = (props: DownloadPDFLinkProps) => {
  const locale = props.locale;
  const arbeidsforhold = props.arbeidsforhold;
  const printGenerellOversikt = props.printGenerellOversikt;
  const printTimerTimelonnet = props.printTimerTimelonnet;
  const printPermisjon = props.printPermisjon;
  const printUtenlandsopphold = props.printUtenlandsopphold;
  const printHistorikk = props.printHistorikk;

  return (
    <PDFDownloadLink
      key={Math.random()}
      document={
        <DetaljertPDF
          locale={locale}
          arbeidsforhold={arbeidsforhold}
          printGenerellOversikt={printGenerellOversikt}
          printTimerTimelonnet={printTimerTimelonnet}
          printPermisjon={printPermisjon}
          printUtenlandsopphold={printUtenlandsopphold}
          printHistorikk={printHistorikk}
        />
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

export default Arbeidsforhold;
