import React from "react";
import CheckAndPrintBox from "../check-and-print-box/CheckAndPrintBox";
import CheckDateAndPrint from "../check-date-and-print/CheckDateAndPrint";
import { AFArbeidsavtaler, AFUtvidet } from "../../types/arbeidsforhold";
import { Normaltekst } from "nav-frontend-typografi";
import sprak from "../../language/provider";

interface Props {
  locale: string;
  data: AFArbeidsavtaler | AFUtvidet;
}

const ArbeidsavtaleFelter = (props: Props) => {
  const { locale, data } = props;
  return (
    <>
      <CheckAndPrintBox
        title={sprak[locale].arbeidstidsordning}
        data={data.arbeidstidsordning}
      />
      <CheckAndPrintBox
        title={sprak[locale].sistelonnsendring}
        data={data.sisteLoennsendring}
        date={true}
      />
      <CheckAndPrintBox
        title={sprak[locale].stillingsprosent}
        data={data.stillingsprosent}
      >
        <Normaltekst>
          <CheckDateAndPrint
            data={data.sisteStillingsendring}
            format={`(${sprak[locale].endretstillingsprosent} %s)`}
          />
        </Normaltekst>
      </CheckAndPrintBox>
      <CheckAndPrintBox
        title={sprak[locale].timerperuke}
        data={data.antallTimerPrUke}
      />
      <CheckAndPrintBox
        title={sprak[locale].skipsregister}
        data={data.skipsregister}
      />
      <CheckAndPrintBox title={sprak[locale].skipstype} data={data.skipstype} />
      <CheckAndPrintBox
        title={sprak[locale].fartsomraade}
        data={data.fartsomraade}
      />
    </>
  );
};

export default ArbeidsavtaleFelter;
