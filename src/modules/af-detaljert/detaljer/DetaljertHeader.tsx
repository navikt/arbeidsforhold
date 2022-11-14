import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { ArbeidsgiverTittel } from "../../../components/arbeidsgiver/ArbeidsgiverTittel";
import { CheckAndPrint } from "../../../components/check-and-print/CheckAndPrint";
import { orgnr } from "../../../utils/orgnr";
import { sprak } from "../../../language/provider";
import { CheckPeriodAndPrint } from "../../../components/check-period-and-print/CheckPeriodAndPrint";
import { useLocale } from "../../common/useLocale";
import { AFUtvidet } from "../../../types/arbeidsforhold";
import { Heading } from "@navikt/ds-react";

interface Props {
  arbeidsforhold: AFUtvidet;
}

export const DetaljertHeader = (props: Props) => {
  const { arbeidsforhold } = props;
  const { locale } = useLocale();

  return (
    <div className="af-detaljert__header">
      <div className="af-detaljert__kolonne">
        <div className="af-detaljert__arbeidsgiver">
          <Heading level={"2"} size={"small"}>
            <ArbeidsgiverTittel
              overskrift={true}
              arbeidsgiver={arbeidsforhold.arbeidsgiver}
            />
          </Heading>
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
                <CheckAndPrint
                  data={arbeidsforhold.ansettelsesperiode?.sluttaarsak}
                  format={`(${sprak[locale].sluttaarsak}: %s)`}
                />
              </Normaltekst>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
