import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "components/error/Error";
import { AFUtvidet } from "types/arbeidsforhold";
import {
  hentDetaljertArbeidsforholdArbeidsgiver,
  hentDetaljertArbeidsforholdArbeidstaker,
} from "clients/apiClient";
import Spinner from "components/spinner/Spinner";
import DetaljerArbeidsforhold from "./Detaljert";
import Environment from "utils/environment";
import Miljo from "types/miljo";
import moment from "moment";
import "moment/locale/nb";
import "moment/locale/nn";
import { AFPrint } from "../../types/print";
import { Locale } from "../../types/locale";
import { useLocale } from "../common/useLocale";

type State =
  | { status: "READY" }
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFUtvidet }
  | { status: "ERROR"; error: HTTPError };

export type AFDetaljertProps = AFPrint &
  (
    | {
        rolle: "ARBEIDSTAKER";
        locale: Locale;
        miljo: "LOCAL" | "DEV" | "PROD";
        navArbeidsforholdId: number;
        customApiUrl?: string;
      }
    | {
        rolle: "ARBEIDSGIVER";
        locale: Locale;
        miljo: "LOCAL" | "DEV" | "PROD";
        navArbeidsforholdId: number;
        fnrArbeidstaker: string;
        customApiUrl?: string;
      }
  );

export interface AFDetaljertData {
  arbeidsforhold: AFUtvidet;
}

const DetaljertArbeidsforhold = (props: AFDetaljertProps) => {
  const { locale } = props;
  const [state, setState] = useState<State>({ status: "READY" });

  const { LocaleProvider } = useLocale();

  useEffect(() => {
    Environment.settEnv(props.miljo as Miljo);
    moment.locale(locale);
  }, [locale]);

  useEffect(() => {
    if (props.navArbeidsforholdId) {
      setState({ status: "LOADING" });

      // Arbeidstakere
      if (props.rolle === "ARBEIDSTAKER") {
        hentDetaljertArbeidsforholdArbeidstaker(
          props.navArbeidsforholdId,
          props.customApiUrl
        )
          .then((arbeidsforhold) =>
            setState({
              status: "RESULT",
              arbeidsforhold: arbeidsforhold as AFUtvidet,
            })
          )
          .catch((error: HTTPError) =>
            setState({
              status: "ERROR",
              error,
            })
          );
      }

      // Arbeidsgivere
      if (props.rolle === "ARBEIDSGIVER") {
        hentDetaljertArbeidsforholdArbeidsgiver(
          props.fnrArbeidstaker,
          props.navArbeidsforholdId,
          props.customApiUrl
        )
          .then((arbeidsforhold) =>
            setState({
              status: "RESULT",
              arbeidsforhold: arbeidsforhold as AFUtvidet,
            })
          )
          .catch((error: HTTPError) =>
            setState({
              status: "ERROR",
              error,
            })
          );
      }
    }
  }, [props.navArbeidsforholdId]);

  switch (state.status) {
    case "READY":
      return null;
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return (
        <LocaleProvider value={props.locale}>
          <DetaljerArbeidsforhold
            arbeidsforhold={state.arbeidsforhold}
            {...props}
          />
        </LocaleProvider>
      );
    case "ERROR":
      return <Error error={state.error} />;
  }
};

export default DetaljertArbeidsforhold;
