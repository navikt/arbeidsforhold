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

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFUtvidet }
  | { status: "ERROR"; error: HTTPError };

export interface AFDetaljertProps {
  miljo: "LOCAL" | "DEV" | "PROD";
  arbeidsforholdId: string;
}

export interface AFDetaljertData {
  arbeidsforhold: AFUtvidet;
}

const DetaljertArbeidsforhold = (props: AFDetaljertProps) => {
  const [state, setState] = useState({ status: "LOADING" } as State);
  Environment.settEnv(props.miljo as Miljo);

  useEffect(() => {
    if (state.status === "LOADING") {
      hentDetaljertArbeidsforhold(props.arbeidsforholdId)
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
  }, [state]);

  switch (state.status) {
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
      return <Error error={state.error} />;
  }
};

export default DetaljertArbeidsforhold;
