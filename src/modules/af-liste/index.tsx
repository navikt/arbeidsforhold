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

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFSimpel[] }
  | { status: "ERROR"; error: HTTPError };

export interface AFListeProps {
  miljo: "LOCAL" | "DEV" | "PROD";
  classNameContainer?: string;
  onClick: (arbeidsforholdId: string) => void;
}

export interface AFListeData {
  arbeidsforhold: AFSimpel[];
}

// Lagre i minne og ikke i
// sessionStorage pga sensitive data
let persistState: State = { status: "LOADING" };

const ListeMedArbeidsforhold = (props: AFListeProps) => {
  const [state, setState] = useState(persistState);
  Environment.settEnv(props.miljo as Miljo);

  useEffect(() => {
    if (state.status !== "RESULT") {
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
      return <Error error={state.error} />;
  }
};

export default ListeMedArbeidsforhold;
