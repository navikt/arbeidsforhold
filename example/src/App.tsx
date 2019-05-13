import React, { Component } from "react";

import Arbeidsforhold from "@navikt/arbeidsforhold";

export default class App extends Component {
  render() {
    return (
      <div className="example__app">
        <div className="example__content">
          <Arbeidsforhold />
        </div>
      </div>
    );
  }
}
