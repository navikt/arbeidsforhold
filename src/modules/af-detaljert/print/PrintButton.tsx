import React, { useState } from "react";
import { PrinterIcon } from "../../../assets/icons/PrinterIcon";
import { DownloadPDFLink } from "./DownloadPdfLink";
import { sprak } from "../../../language/provider";
import { useLocale } from "../../common/useLocale";
import { AFUtvidet } from "../../../types/arbeidsforhold";
import { BodyShort, Checkbox, CheckboxGroup, Modal } from "@navikt/ds-react";

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
        <BodyShort>
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
        </BodyShort>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeButton={true}
      >
        <Modal.Content style={{ padding: "2rem 2.5rem" }}>
          <CheckboxGroup
            legend={sprak[locale].utskriftsvalg}
            className={"af-detaljert__checkboxes"}
          >
            <Checkbox
              className={"af-detaljert__checkbox"}
              checked={printGenerellOversikt}
              onChange={() => settPrintGenerellOversikt(!printGenerellOversikt)}
            >
              {sprak[locale].generelleopplysninger}
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup
            legend={sprak[locale].tilleggsopplysninger}
            className={"af-detaljert__checkboxes"}
          >
            {antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0 && (
              <Checkbox
                className={"af-detaljert__checkbox"}
                checked={printTimerTimelonnet}
                onChange={() => settPrintTimerTimelonnet(!printTimerTimelonnet)}
              >
                {sprak[locale].tabs.timerfortimelonnet}
              </Checkbox>
            )}
            {permisjonPermittering && permisjonPermittering.length > 0 && (
              <Checkbox
                className={"af-detaljert__checkbox"}
                checked={printPermisjon}
                onChange={() => settPrintPermisjon(!printPermisjon)}
              >
                {sprak[locale].tabs.permisjonpermittering}
              </Checkbox>
            )}
            {utenlandsopphold && utenlandsopphold.length > 0 && (
              <Checkbox
                className={"af-detaljert__checkbox"}
                checked={printUtenlandsopphold}
                onChange={() =>
                  settPrintUtenlandsopphold(!printUtenlandsopphold)
                }
              >
                {sprak[locale].tabs.arbeidiutlandet}
              </Checkbox>
            )}
            {arbeidsavtaler && arbeidsavtaler.length > 0 && (
              <Checkbox
                className={"af-detaljert__checkbox"}
                checked={printHistorikk}
                onChange={() => settPrintHistorikk(!printHistorikk)}
              >
                {sprak[locale].tabs.historikk}
              </Checkbox>
            )}
          </CheckboxGroup>
          <div className="af-detaljert__print-button-modal">
            <BodyShort>
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
            </BodyShort>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
