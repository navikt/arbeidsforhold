import React, { useState, SyntheticEvent } from "react";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Tabs from "nav-frontend-tabs";
import Historikk from "./tabs/Historikk";
import Permisjon from "./tabs/Permisjon";
import Timer from "./tabs/Timer";
import Utenlandsopphold from "./tabs/Utenlandsopphold";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrintBox from "../../components/check-and-print-box/CheckAndPrintBox";
import CheckDateAndPrint from "../../components/check-date-and-print/CheckDateAndPrint";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import sprak from "../../language/provider";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, locale } = props;
  const { arbeidsavtaler, permisjonPermitteringer } = arbeidsforhold;
  const { antallTimerForTimeloennet, utenlandsopphold } = arbeidsforhold;

  const tabs = [] as { label: string }[];
  if (antallTimerForTimeloennet && antallTimerForTimeloennet.length > 0) {
    tabs.push({ label: sprak[locale].tabs.timerfortimelonnet });
  }
  if (permisjonPermitteringer && permisjonPermitteringer.length > 0) {
    tabs.push({ label: sprak[locale].tabs.permisjonpermittering });
  }
  if (utenlandsopphold && utenlandsopphold.length > 0) {
    tabs.push({ label: sprak[locale].tabs.arbeidiutlandet });
  }
  if (arbeidsavtaler && arbeidsavtaler.length > 0) {
    tabs.push({ label: sprak[locale].tabs.historikk });
  }
  const [visTab, settVisTab] = useState(tabs[0].label);

  return (
    <div className={`af-detaljert__container`}>
      <div className="af-detaljert__header">
        <div className="af-detaljert__kolonne">
          <div className="af-detaljert__arbeidsgiver">
            <Undertittel>{arbeidsforhold.arbeidsgiver.orgnavn}</Undertittel>
            <div className="af-detaljert__orgnr">
              <Normaltekst>
                {`${sprak[locale].organisasjonsnummer} ${
                  arbeidsforhold.arbeidsgiver.orgnr
                }`}
              </Normaltekst>
            </div>
          </div>
        </div>
        <div className="af-detaljert__kolonne af-detaljert__periode">
          {arbeidsforhold.ansettelsesperiode &&
            !arbeidsforhold.ansettelsesperiode.periodeTil && (
              <div className="af-detaljert__status">
                <EtikettSuksess>{sprak[locale].navaerendejobb}</EtikettSuksess>
              </div>
            )}
          <div className="af-detaljert__periode-content">
            <Normaltekst>
              <CheckPeriodAndPrint data={arbeidsforhold.ansettelsesperiode} />
            </Normaltekst>
          </div>
        </div>
      </div>
      <hr />
      <div className="af-detaljert__innhold">
        <CheckAndPrintBox
          title={sprak[locale].hovedenhet}
          data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnavn}
        >
          <Normaltekst>
            <CheckAndPrint
              data={arbeidsforhold.opplysningspliktigarbeidsgiver.orgnr}
              format={`${sprak[locale].organisasjonsnummer} %s`}
            />
          </Normaltekst>
        </CheckAndPrintBox>
        <CheckAndPrintBox
          title={sprak[locale].stillingsprosent}
          data={arbeidsforhold.stillingsprosent}
        >
          <Normaltekst>
            <CheckDateAndPrint
              data={arbeidsforhold.sisteStillingsendring}
              format={`(${sprak[locale].endretstillingsprosent} %s)`}
            />
          </Normaltekst>
        </CheckAndPrintBox>
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
          data={arbeidsforhold.navArbeidsforholdId}
        />
        <CheckAndPrintBox
          title={sprak[locale].arbeidstidsordning}
          data={arbeidsforhold.arbeidstidsordning}
        />
        <CheckAndPrintBox
          title={sprak[locale].sistelonnsendring}
          data={arbeidsforhold.sisteLoennsendring}
          date={true}
        />
        <CheckAndPrintBox
          title={sprak[locale].timerifullstilling}
          data={arbeidsforhold.antallTimerPrUke}
        />
        <CheckAndPrintBox
          title={sprak[locale].skipsregister}
          data={arbeidsforhold.skipsregister}
        />
        <CheckAndPrintBox
          title={sprak[locale].skipstype}
          data={arbeidsforhold.skipstype}
        />
        <CheckAndPrintBox
          title={sprak[locale].fartsomraade}
          data={arbeidsforhold.fartsomraade}
        />
        <CheckAndPrintBox
          title={sprak[locale].sistbekreftet}
          data={arbeidsforhold.sistBekreftet}
          date={true}
        />
      </div>
      <div className="af-detaljert__tabs">
        <Tabs
          tabs={tabs}
          onChange={(
            _event: SyntheticEvent<EventTarget, Event>,
            index: number
          ) => settVisTab(tabs[index].label)}
        />
      </div>
      {(() => {
        switch (visTab) {
          case sprak[locale].tabs.timerfortimelonnet:
            return <Timer timer={antallTimerForTimeloennet} />;
          case sprak[locale].tabs.permisjonpermittering:
            return <Permisjon permisjoner={permisjonPermitteringer} />;
          case sprak[locale].tabs.arbeidiutlandet:
            return <Utenlandsopphold utenlandsopphold={utenlandsopphold} />;
          case sprak[locale].tabs.historikk:
            return <Historikk arbeidsavtaler={arbeidsavtaler} />;
          default:
            return null;
        }
      })()}
      <AlertStripeInfo>{sprak[locale].hvisfeil}</AlertStripeInfo>
    </div>
  );
};

export default Arbeidsforhold;
