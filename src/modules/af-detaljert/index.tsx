import "@babel/polyfill";
import "core-js";
import React, { PureComponent } from "react";
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
  classNameContainer?: string;
}

export interface AFDetaljertData {
  arbeidsforhold: AFUtvidet;
}

const initState: State = {
  status: "LOADING"
};

class DetaljertArbeidsforhold extends PureComponent<AFDetaljertProps, State> {
  state = initState;

  constructor(props: AFDetaljertProps) {
    super(props);
    Environment.settEnv(props.miljo as Miljo);
  }

  componentDidMount = () => this.hentData(this.props.arbeidsforholdId);
  componentWillReceiveProps = (props: AFDetaljertProps) => {
    if (this.props.arbeidsforholdId !== props.arbeidsforholdId) {
      this.hentData(props.arbeidsforholdId);
    }
  };

  hentData = (arbeidsforholdId: string) =>
    this.setState(initState, () =>
      hentDetaljertArbeidsforhold(arbeidsforholdId)
        .then(arbeidsforhold =>
          this.setState({
            status: "RESULT",
            arbeidsforhold: arbeidsforhold as AFUtvidet
          })
        )
        .catch((error: HTTPError) =>
          this.setState({
            status: "ERROR",
            error
          })
        )
    );

  render = () => {
    switch (this.state.status) {
      case "LOADING":
        return <Spinner />;
      case "RESULT":
        return (
          <DetaljerArbeidsforhold
            arbeidsforhold={this.state.arbeidsforhold}
            {...this.props}
          />
        );
      case "ERROR":
        return <Error error={this.state.error} />;
    }
  };
}

export default DetaljertArbeidsforhold;
