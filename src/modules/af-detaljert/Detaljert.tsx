import React from "react";
import { AFDetaljertData, AFDetaljertProps } from "./index";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import sprak from "../../language/provider";
import ArbeidsavtaleFelter from "./detaljer/ArbeidsavtaleFelter";
import { DetaljertTabs } from "./tabs/DetaljertTabs";
import { useLocale } from "../common/useLocale";
import { DetaljertHeader } from "./detaljer/DetaljertHeader";
import { PrintButtonOversikt } from "./print/PrintButtonOversikt";

const Detaljert = (props: AFDetaljertProps & AFDetaljertData) => {
  const { arbeidsforhold } = props;
  const { locale } = useLocale();

  return (
    <div className={`af-detaljert__container`}>
      <DetaljertHeader arbeidsforhold={arbeidsforhold} />
      <hr />
      <ArbeidsavtaleFelter data={arbeidsforhold} />
      <DetaljertTabs arbeidsforhold={arbeidsforhold} />
      <AlertStripeInfo>
        {sprak[locale].hvisfeil1}
        <br />
        {sprak[locale].hvisfeil2}
      </AlertStripeInfo>
      <PrintButtonOversikt {...props} />
    </div>
  );
};

export default Detaljert;
