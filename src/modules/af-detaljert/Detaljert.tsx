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
import moment from "moment";
import Moment from "react-moment";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, classNameContainer } = props;
  const { arbeidsavtaler, permisjonPermitteringer } = arbeidsforhold;
  const { antallTimerForTimeloennet, utenlandsopphold } = arbeidsforhold;
  const [visTab, settVisTab] = useState("Historikk");
  const sorterteArbeidsavtaler = arbeidsavtaler.sort((left, right) =>
    moment.utc(left.bruksperiode.fom).diff(moment.utc(right.bruksperiode.fom))
  );
  const sisteArbeidsavtale = sorterteArbeidsavtaler[0];
  const tabs = [
    { label: "Historikk" },
    { label: "Permisjon/Permittering" },
    { label: "Timer for timelønnet" },
    { label: "Utenlandsopphold" }
  ];
  return (
    <div
      className={`af-detaljert__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="af-detaljert__header">
        <div className="af-detaljert__kolonne">
          <div className="af-detaljert__arbeidsgiver">
            <Undertittel>{arbeidsforhold.arbeidsgiver.orgnavn}</Undertittel>
          </div>
          <Normaltekst>
            Startdato:
            <Moment format="DD.MM.YYYY">
              {arbeidsforhold.ansettelsesperiode.periode.fom}
            </Moment>
          </Normaltekst>
        </div>
        <div className="af-detaljert__kolonne af-detaljert__status">
          <EtikettSuksess>Nåværende jobb</EtikettSuksess>
        </div>
      </div>
      <hr />
      <div className="af-detaljert__innhold">
        <div className="af-detaljert__boks">
          <Element>Lokal enhet</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Organisasjonsnumer</Element>
          <Normaltekst>{arbeidsforhold.arbeidsgiver.orgnr}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Yrke</Element>
          <Normaltekst>{sisteArbeidsavtale.yrke}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Stilling</Element>
          <Normaltekst>{sisteArbeidsavtale.stillingsprosent}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Type arbeidsforhold</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Arbeidstidsordning</Element>
          <Normaltekst>{sisteArbeidsavtale.arbeidstidsordning}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Sist bekreftet av arbeidsgiver</Element>
          <Normaltekst>
            <Moment format="DD.MM.YYYY">{arbeidsforhold.sistBekreftet}</Moment>
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
