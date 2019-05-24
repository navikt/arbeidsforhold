import React, { useState, SyntheticEvent } from "react";
import { Normaltekst, Undertittel, Element } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Tabs from "nav-frontend-tabs";
import Historikk from "./tabs/Historikk";
import Permisjon from "./tabs/Permisjon";
import Timer from "./tabs/Timer";
import Utenlandsopphold from "./tabs/Utenlandsopphold";
import { sortDateString } from "../../utils/date";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold } = props;
  const { arbeidsavtaler, permisjonPermitteringer } = arbeidsforhold;
  const { antallTimerForTimeloennet, utenlandsopphold } = arbeidsforhold;
  const [visTab, settVisTab] = useState("Historikk");

  // Arbeidsavtaler
  const sorterteArbeidsavtaler = arbeidsavtaler.sort((left, right) =>
    left.gyldighetsperiode && right.gyldighetsperiode
      ? sortDateString(
          left.gyldighetsperiode.periodeFra,
          right.gyldighetsperiode.periodeFra
        )
      : 0
  );
  const sisteArbeidsavtale = sorterteArbeidsavtaler[0];

  // Tabs
  const tabs = [] as { label: string }[];
  if (arbeidsavtaler && arbeidsavtaler.length > 0) {
    tabs.push({ label: "Historikk" });
  }
  if (permisjonPermitteringer && permisjonPermitteringer.length > 0) {
    tabs.push({ label: "Permisjon/Permittering" });
  }
  if (antallTimerForTimeloennet && antallTimerForTimeloennet.length > 0) {
    tabs.push({ label: "Timer for timelønnet" });
  }
  if (utenlandsopphold && utenlandsopphold.length > 0) {
    tabs.push({ label: "Utenlandsopphold" });
  }

  return (
    <div className={`af-detaljert__container`}>
      <div className="af-detaljert__header">
        <div className="af-detaljert__kolonne">
          <div className="af-detaljert__arbeidsgiver">
            <Undertittel>{arbeidsforhold.arbeidsgiver.orgnavn}</Undertittel>
          </div>
          <CheckPeriodAndPrint data={arbeidsforhold.ansettelsesPeriode} />
        </div>
        <div className="af-detaljert__kolonne af-detaljert__status">
          <EtikettSuksess>Nåværende jobb</EtikettSuksess>
        </div>
      </div>
      <hr />
      <div className="af-detaljert__innhold">
        <div className="af-detaljert__boks">
          <Element>Organisasjonsnumer</Element>
          <Normaltekst>
            <CheckAndPrint data={arbeidsforhold.arbeidsgiver.orgnr} />
          </Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Yrke</Element>
          <Normaltekst>
            <CheckAndPrint data={sisteArbeidsavtale.yrke} />
          </Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Stilling</Element>
          <Normaltekst>
            <CheckAndPrint data={sisteArbeidsavtale.stillingsprosent} />
          </Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Type arbeidsforhold</Element>
          <Normaltekst>
            <CheckAndPrint data={arbeidsforhold.type} />
          </Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Arbeidstidsordning</Element>
          <Normaltekst>
            <CheckAndPrint data={sisteArbeidsavtale.arbeidstidsordning} />
          </Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Sist bekreftet av arbeidsgiver</Element>
          <Normaltekst>
            <CheckAndPrint data={arbeidsforhold.sistBekreftet} />
          </Normaltekst>
        </div>
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
          case "Historikk":
            return <Historikk arbeidsavtaler={sorterteArbeidsavtaler} />;
          case "Permisjon/Permittering":
            return <Permisjon permisjoner={permisjonPermitteringer} />;
          case "Timer for timelønnet":
            return <Timer timer={antallTimerForTimeloennet} />;
          case "Utenlandsopphold":
            return <Utenlandsopphold utenlandsopphold={utenlandsopphold} />;
          default:
            return null;
        }
      })()}
      <AlertStripeInfo>
        Hvis noe er feil med et arbeidsforhold må du kontakte arbeidsgiveren det
        gjelder, slik at de kan rette det opp.
      </AlertStripeInfo>
    </div>
  );
};

export default Arbeidsforhold;
