import React, { Component } from "react";

import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";

interface State {
  valgtArbeidsforholdId: string;
}
export default class App extends Component {
  state: State = {
    valgtArbeidsforholdId: "konvertert_af709505-128e-45dc-a241-7e14180f787d"
  };

  arbeidsforholdOnClick = (arbeidsforoldId: string) =>
    this.setState({ valgtArbeidsforholdId: arbeidsforoldId });

  render() {
    return (
      <div className="example__app">
        <div className="example__content">
          <div className="example__section">
            <ListeMedArbeidsforhold
              miljo="LOCAL"
              onClick={this.arbeidsforholdOnClick}
            />
          </div>
          <div className="example__section">
            <DetaljertArbeidsforhold
              miljo="LOCAL"
              arbeidsforholdId={this.state.valgtArbeidsforholdId}
            />
          </div>
        </div>
      </div>
    );
  }
}
