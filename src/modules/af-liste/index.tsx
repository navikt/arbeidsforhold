import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "../../components/error/Error";
import { AFSimpel } from "../../types/arbeidsforhold";
import { hentListeMedArbeidsforhold } from "../../clients/apiClient";
import Spinner from "../../components/spinner/Spinner";
import Liste from "./Liste";
import Environment from "../../utils/environment";
import { Link } from "react-router-dom";
import Miljo from "../../types/miljo";
import moment from "moment";
import "moment/locale/nb";
import { AFPrint } from "../../types/print";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFSimpel[] }
  | { status: "ERROR"; error: HTTPError };

export type AFListeOnClick =
  | {
      type: "INGEN_ON_CLICK";
    }
  | {
      type: "LENKE";
      href: string;
    }
  | {
      type: "REACT_ROUTER_LENKE";
      Component: typeof Link;
      to: string;
    }
  | {
      type: "KNAPP";
      getId: (navArbeidsforholdId: number) => void;
    };

export type AFListeProps = AFPrint & {
  locale: "nb" | "en";
  miljo: "LOCAL" | "DEV" | "PROD";
  onClick: AFListeOnClick;
  customApiUrl?: string;
};

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
      hentListeMedArbeidsforhold(props.customApiUrl)
        .then((arbeidsforhold) =>
          setState({
            status: "RESULT",
            arbeidsforhold: arbeidsforhold as AFSimpel[],
          })
        )
        .catch((error: HTTPError) =>
          setState({
            status: "ERROR",
            error: error,
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
