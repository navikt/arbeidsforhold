import React, { useState, SyntheticEvent } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Tabs from "nav-frontend-tabs";
import Historikk from "./tabs/Historikk";
import Permisjon from "./tabs/Permisjon";
import Timer from "./tabs/Timer";
import Utenlandsopphold from "./tabs/Utenlandsopphold";
import { sortDateString } from "../../utils/date";
import CheckPeriodAndPrint from "../../components/check-period-and-print/CheckPeriodAndPrint";
import CheckAndPrintBox from "../../components/check-and-print-box/CheckAndPrintBox";

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
        {arbeidsforhold.ansettelsesPeriode &&
          arbeidsforhold.ansettelsesPeriode.periodeTil}
        <div className="af-detaljert__kolonne af-detaljert__status">
          <EtikettSuksess>Nåværende jobb</EtikettSuksess>
        </div>
        }
      </div>
      <hr />
      <div className="af-detaljert__innhold">
        <CheckAndPrintBox
          title="Organisasjonsnummer"
          data={arbeidsforhold.arbeidsgiver.orgnr}
        />
        <CheckAndPrintBox title="Yrke" data={sisteArbeidsavtale.yrke} />
        <CheckAndPrintBox
          title="Stilling"
          data={sisteArbeidsavtale.stillingsprosent}
        />
        <CheckAndPrintBox
          title="Type Arbeidsforhold"
          data={arbeidsforhold.type}
        />
        <CheckAndPrintBox
          title="Arbeidstidsordning"
          data={sisteArbeidsavtale.arbeidstidsordning}
        />
        <CheckAndPrintBox
          title="Sist bekreftet av arbeidsgiver"
          data={arbeidsforhold.sistBekreftet}
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
