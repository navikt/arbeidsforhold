import "@babel/polyfill";
import "core-js";
import React, { PureComponent } from "react";
import Error, { HTTPError } from "../../components/error/Error";
import { AFUtvidet } from "../../types/arbeidsforhold";
import { hentDetaljertArbeidsforhold } from "../../clients/apiClient";
import Spinner from "../../components/spinner/Spinner";
import DetaljerArbeidsforhold from "./Detaljert";
import Environment from "../../utils/environment";
import { MILJO } from "../../types/miljo";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: AFUtvidet }
  | { status: "ERROR"; error: HTTPError };

export interface AFDetaljertProps {
  miljo: MILJO;
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
    new Environment(props.miljo);
  }

  componentDidMount = () => this.hentData();
  componentWillReceiveProps = (props: AFDetaljertProps) => {
    if (this.props.arbeidsforholdId !== props.arbeidsforholdId) {
      console.log(`Nye props, arbeidsforhold ${props.arbeidsforholdId}`);
      this.hentData();
    }
  };

  hentData = () =>
    this.setState(initState, () =>
      hentDetaljertArbeidsforhold(this.props.arbeidsforholdId)
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
