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
                {tabs.map(tab => (
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
        <div dangerouslySetInnerHTML={{ __html: sprak[locale].hvisfeil }} />
      </AlertStripeInfo>
    </div>
  );
};

export default Arbeidsforhold;
