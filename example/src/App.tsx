import React, { Component } from "react";

import Arbeidsforhold from "@navikt/arbeidsforhold";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="content">
          <Arbeidsforhold />
        </div>
      </div>
    );
  }
}
