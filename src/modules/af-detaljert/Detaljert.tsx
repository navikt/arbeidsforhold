import React from "react";
import { Normaltekst, Undertittel, Element } from "nav-frontend-typografi";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { EtikettSuksess } from "nav-frontend-etiketter";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Tabs from "nav-frontend-tabs";

const Arbeidsforhold = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold, classNameContainer } = props;
  const sisteArbeidsavtale = arbeidsforhold.arbeidsavtaler[0];
  return (
    <div
      className={`af-detaljert__container ${
        classNameContainer ? classNameContainer : ""
      }`}
    >
      <div className="af-detaljert__header">
        <div className="af-detaljert__kolonne">
          <div className="af-detaljert__arbeidsgiver">
            <Undertittel>
              {arbeidsforhold.arbeidsgiver.organisasjonsnavn}
            </Undertittel>
          </div>
          <Normaltekst>
            Startdato: {arbeidsforhold.ansettelsesperiode.periode.fom}
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
          <Normaltekst>
            {arbeidsforhold.arbeidsgiver.organisasjonsnummer}
          </Normaltekst>
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
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Timer i full stilling</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Sist bekreftet av arbeidsgiver</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
        <div className="af-detaljert__boks">
          <Element>Oppdatert</Element>
          <Normaltekst>{arbeidsforhold.type}</Normaltekst>
        </div>
      </div>
      <div className="af-detaljert__tabs">
        <Tabs
          tabs={[
            { label: "Historikk" },
            { label: "Permisjon/Permittering" },
            { label: "Timer for timelønnet" },
            { label: "Utenlandsopphold" }
          ]}
          onChange={() => {}}
        />
      </div>
      <div className="af-detaljert__tabs-innhold">Innhold i tabs</div>
      <AlertStripeInfo>
        Hvis noe er feil med et arbeidsforhold må du kontakte arbeidsgiveren det
        gjelder, slik at de kan rette det opp.
      </AlertStripeInfo>
    </div>
  );
};

export default Arbeidsforhold;
