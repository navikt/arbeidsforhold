import "@babel/polyfill";
import "core-js";
import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "../../components/error/Error";
import { AFSimpel } from "../../types/arbeidsforhold";
import { hentListeMedArbeidsforhold } from "../../clients/apiClient";
import Spinner from "../../components/spinner/Spinner";
import Liste from "./Liste";
import Environment from "../../utils/environment";
import Miljo from "../../types/miljo";
import moment from "moment";
import "moment/locale/nb";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFSimpel[] }
  | { status: "ERROR"; error: HTTPError };

export interface AFListeProps {
  locale: "nb" | "en";
  miljo: "LOCAL" | "DEV" | "PROD";
  onClick: (navArbeidsforholdId: number) => void;
}

export interface AFListeData {
  arbeidsforhold: AFSimpel[];
}

// Lagre i minne og ikke i
// sessionStorage pga sensitive data
let persistState: State = { status: "LOADING" };

const ListeMedArbeidsforhold = (props: AFListeProps) => {
  const { locale } = props;
  const [state, setState] = useState(persistState);

  useEffect(() => {
    Environment.settEnv(props.miljo as Miljo);
    moment.locale(locale);
  }, [locale]);

  useEffect(() => {
    if (state.status === "LOADING") {
      hentListeMedArbeidsforhold()
        .then(arbeidsforhold =>
          setState({
            status: "RESULT",
            arbeidsforhold: arbeidsforhold as AFSimpel[]
          })
        )
        .catch((error: HTTPError) =>
          setState({
            status: "ERROR",
            error: error
          })
        );
    }
    return () => {
      persistState = state;
    };
  }, [state]);

  switch (state.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return <Liste arbeidsforhold={state.arbeidsforhold} {...props} />;
    case "ERROR":
      return <Error error={state.error} locale={props.locale} />;
  }
};

export default ListeMedArbeidsforhold;
