import React, { Component } from "react";

import {
  ListeMedArbeidsforhold,
  DetaljertArbeidsforhold
} from "@navikt/arbeidsforhold";

export default class App extends Component {
  render() {
    return (
      <div className="example__app">
        <div className="example__content">
          <div className="example__section">
            <ListeMedArbeidsforhold />
          </div>
          <div className="example__section">
            <DetaljertArbeidsforhold />
          </div>
        </div>
      </div>
    );
  }
}
