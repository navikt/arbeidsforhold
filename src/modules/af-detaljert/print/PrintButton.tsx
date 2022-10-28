import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { PrinterIcon } from "../../../assets/icons/PrinterIcon";
import { DownloadPDFLink } from "./DownloadPdfLink";
import ModalWrapper from "nav-frontend-modal";
import { Checkbox, CheckboxGruppe } from "nav-frontend-skjema";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { AFUtvidet } from "../../../types/arbeidsforhold";

interface Props {
  arbeidsforhold: AFUtvidet;
  printName: string;
  printSSN: string;
}

export const PrintButton = (props: Props) => {
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
    <>
      <div className="af-detaljert__print-button-oversikt">
        <Normaltekst>
          {
            // Show modal with checkboxes if user has relevant data
            (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) ||
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
              onChange={() => settPrintGenerellOversikt(!printGenerellOversikt)}
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
    </>
  );
};
