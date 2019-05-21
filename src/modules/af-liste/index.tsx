import "@babel/polyfill";
import "core-js";
import React, { Component } from "react";
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

class ListeMedArbeidsforhold extends Component<AFListeProps, State> {
  static state: State = {
    status: "LOADING"
  };

  constructor(props: AFListeProps) {
    super(props);
    Environment.settEnv(props.miljo as Miljo);
  }

  componentDidMount = () => {
    if (ListeMedArbeidsforhold.state.status !== "RESULT") {
      hentListeMedArbeidsforhold()
        .then(arbeidsforhold => {
          ListeMedArbeidsforhold.state = {
            status: "RESULT",
            arbeidsforhold: arbeidsforhold as AFSimpel[]
          };
        })
        .catch((error: HTTPError) => {
          ListeMedArbeidsforhold.state = {
            status: "ERROR",
            error
          };
        })
        .then(() => this.forceUpdate());
    }
  };

  render = () => {
    switch (ListeMedArbeidsforhold.state.status) {
      case "LOADING":
        return <Spinner />;
      case "RESULT":
        return (
          <Liste
            arbeidsforhold={ListeMedArbeidsforhold.state.arbeidsforhold}
            {...this.props}
          />
        );
      case "ERROR":
        return <Error error={ListeMedArbeidsforhold.state.error} />;
    }
  };
}

export default ListeMedArbeidsforhold;
