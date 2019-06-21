import { Element } from "nav-frontend-typografi";

import React from "react";
import { AFListeOnClick } from "./index";
import { AFSimpel } from "../../types/arbeidsforhold";
import CheckAndPrint from "../../components/check-and-print/CheckAndPrint";

interface Props {
  foretak: AFSimpel;
  onClick: AFListeOnClick;
}

export const ListeTittel = (props: Props) => {
  const { foretak, onClick } = props;

  const replaceId = (path: string, id: number) =>
    path.replace("{id}", id.toString());

  switch (onClick.type) {
    case "INGEN_ON_CLICK":
      return (
        <Element>
          <CheckAndPrint data={foretak.arbeidsgiver.orgnavn} />
        </Element>
      );
    case "LENKE":
      return (
        <Element>
          <a
            className="lenke"
            href={replaceId(onClick.href, foretak.navArbeidsforholdId)}
          >
            <CheckAndPrint data={foretak.arbeidsgiver.orgnavn} />
          </a>
        </Element>
      );
    case "REACT_ROUTER_LENKE":
      return (
        <Element>
          <onClick.Component
            className="lenke"
            to={replaceId(onClick.to, foretak.navArbeidsforholdId)}
          >
            <CheckAndPrint data={foretak.arbeidsgiver.orgnavn} />
          </onClick.Component>
        </Element>
      );
    case "KNAPP":
      return (
        <div
          className="lenke"
          onClick={() => onClick.getId(foretak.navArbeidsforholdId)}
        >
          <Element>
            <CheckAndPrint data={foretak.arbeidsgiver.orgnavn} />
          </Element>
        </div>
      );
  }
};
