import "@babel/polyfill";
import "core-js";
import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "../../components/error/Error";
import { AFUtvidet } from "../../types/arbeidsforhold";
import { hentDetaljertArbeidsforhold } from "../../clients/apiClient";
import Spinner from "../../components/spinner/Spinner";
import DetaljerArbeidsforhold from "./Detaljert";
import Environment from "../../utils/environment";
import Miljo from "../../types/miljo";
import moment from "moment";
import "moment/locale/nb";

type State =
  | { status: "READY" }
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFUtvidet }
  | { status: "ERROR"; error: HTTPError };

export interface AFDetaljertProps {
  locale: "nb" | "en";
  miljo: "LOCAL" | "DEV" | "PROD";
  navArbeidsforholdId: number;
}

export interface AFDetaljertData {
  arbeidsforhold: AFUtvidet;
}

const DetaljertArbeidsforhold = (props: AFDetaljertProps) => {
  const { locale } = props;
  const [state, setState] = useState({ status: "READY" } as State);

  useEffect(() => {
    Environment.settEnv(props.miljo as Miljo);
    moment.locale(locale);
  }, [locale]);

  useEffect(() => {
    if (props.navArbeidsforholdId) {
      setState({ status: "LOADING" });
      hentDetaljertArbeidsforhold(props.navArbeidsforholdId)
        .then(arbeidsforhold =>
          setState({
            status: "RESULT",
            arbeidsforhold: arbeidsforhold as AFUtvidet
          })
        )
        .catch((error: HTTPError) =>
          setState({
            status: "ERROR",
            error
          })
        );
    }
  }, [props.navArbeidsforholdId]);

  switch (state.status) {
    case "READY":
      return null;
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return (
        <DetaljerArbeidsforhold
          arbeidsforhold={state.arbeidsforhold}
          {...props}
        />
      );
    case "ERROR":
      return <Error error={state.error} locale={locale} />;
  }
};

export default DetaljertArbeidsforhold;
