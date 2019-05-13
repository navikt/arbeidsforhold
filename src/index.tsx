import "@babel/polyfill";
import "core-js";

import React, { Component } from "react";
import Error, { HTTPError } from "./components/error/Error";
import { Arbeidsforhold } from "./types/arbeidsforhold";
import { hentArbeidsforhold } from "./clients/apiClient";
import Spinner from "./components/spinner/Spinner";
import VisArbeidsforhold from "./Arbeidsforhold";

import { setUpMock } from "./clients/apiMock";

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; arbeidsforhold: Arbeidsforhold }
  | { status: "ERROR"; error: HTTPError };

export interface AppProps {
  classNameContainer?: string;
}

class App extends Component<AppProps, State> {
  state: State = {
    status: "LOADING"
  };

  componentDidMount = () =>
    hentArbeidsforhold()
      .then((arbeidsforhold: Arbeidsforhold) =>
        this.setState({
          status: "RESULT",
          arbeidsforhold
        })
      )
      .catch((error: HTTPError) =>
        this.setState({
          status: "ERROR",
          error
        })
      );

  render = () => {
    switch (this.state.status) {
      case "LOADING":
        return <Spinner />;
      case "RESULT":
        return (
          <VisArbeidsforhold
            arbeidsforhold={this.state.arbeidsforhold}
            {...this.props}
          />
        );
      case "ERROR":
        return <Error error={this.state.error} />;
    }
  };
}

export default App;
