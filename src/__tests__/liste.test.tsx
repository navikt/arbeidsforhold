import { fireEvent, screen } from "@testing-library/react";
import afListe from "../clients/apiMock/af-liste.json";
import "@testing-library/jest-dom";
import { formatDate, renderListeOverArbeidsforhold } from "./testutils";

jest.mock("@react-pdf/renderer", () => ({
  Text: () => <div>Text</div>,
  StyleSheet: {
    create: () => {},
  },
}));

beforeEach(() => {
  renderListeOverArbeidsforhold();
});

describe("Liste over arbeidsforhold", () => {
  test("inneholder all data", () => {
    fireEvent.click(screen.getByText("Vis flere arbeidsforhold"));

    afListe.forEach((arbeidsforhold) => {
      arbeidsforhold.arbeidsgiver.type === "Organisasjon" &&
        expect(
          screen.getByText(arbeidsforhold.arbeidsgiver.orgnavn)
        ).toBeInTheDocument();
      expect(screen.getAllByText(arbeidsforhold.yrke).length).toBeGreaterThan(
        0
      );
      expect(
        screen.getAllByText(
          formatDate(arbeidsforhold.ansettelsesperiode.periode.periodeFra)
        ).length
      ).toBeGreaterThan(0);
      arbeidsforhold.ansettelsesperiode.periode.periodeTil &&
        expect(
          screen.getAllByText(
            formatDate(arbeidsforhold.ansettelsesperiode.periode.periodeTil)
          ).length
        ).toBeGreaterThan(0);
    });
  });
});
