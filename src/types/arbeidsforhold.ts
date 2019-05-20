export interface AFSimpel {
  arbeidsforholdId: string;
  arbeidsgiver: {
    organisasjonsnummer: string;
    organisasjonsnavn: string;
  };
  ansettelsesPeriode: {
    periodeFra?: string;
    periodeTil?: string;
  };
  yrke: string;
}

export interface AFArbeidsavtaler {
  antallTimerPrUke: number;
  arbeidstidsordning: string;
  beregnetAntallTimerPrUke: number;
  bruksperiode: {
    fom: string;
    tom: string;
  };
  gyldighetsperiode: {
    fom: string;
    tom: string;
  };
  sistLoennsendring: string;
  sistStillingsendring: string;
  stillingsprosent: number;
  yrke: number;
}

export interface AFUtvidet {
  ansettelsesperiode: {
    bruksperiode: {
      fom: string;
      tom: string;
    };
    periode: {
      fom: string;
      tom: string;
    };
    varslingskode: string;
  };
  antallTimerForTimeloennet: [
    {
      antallTimer: number;
      periode: {
        fom: string;
        tom: string;
      };
      rapporteringsperiode: string;
    }
  ];
  arbeidsavtaler: AFArbeidsavtaler[];
  arbeidsforholdId: string;
  arbeidsgiver: {
    organisasjonsnummer: string;
    organisasjonsnavn: string;
  };
  arbeidstaker: {
    type: string;
    aktoerId: number;
    offentligIdent: number;
  };
  innrapportertEtterAOrdningen: boolean;
  navArbeidsforholdId: number;
  opplysningspliktig: {
    type: string;
  };
  permisjonPermitteringer: [
    {
      periode: {
        fom: string;
        tom: string;
      };
      permisjonPermitteringId: string;
      prosent: number;
      type: string;
    }
  ];
  registrert: string;
  sistBekreftet: string;
  type: string;
  utenlandsopphold: [
    {
      landkode: string;
      periode: {
        fom: string;
        tom: string;
      };
      rapporteringsperiode: string;
    }
  ];
}
