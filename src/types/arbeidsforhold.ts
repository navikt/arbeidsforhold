export interface AFSimpel {
  arbeidsforholdId: string;
  arbeidsgiver: AFArbeidsgiver;
  ansettelsesPeriode: AFPeriode;
  navArbeidsforholdId: number;
  yrke: string;
}

export interface AFArbeidsavtaler {
  antallTimerPrUke?: number;
  arbeidstidsordning?: string;
  beregnetAntallTimerPrUke?: number;
  gyldighetsperiode?: AFPeriode;
  sisteLoennsendring?: string;
  sisteStillingsendring?: string;
  stillingsprosent?: number;
  yrke?: number;
}

export interface AFPermisjonPermittering {
  periode?: AFPeriode;
  permisjonPermitteringId: string;
  prosent?: number;
  type: string;
}

export interface AFTimerForTimelonnet {
  antallTimer?: number;
  periode?: AFPeriode;
  rapporteringsperiode?: string;
}

export interface AFUtenlandsopphold {
  landkode: string;
  periode: AFPeriode;
  rapporteringsperiode: string;
}

export interface AFPeriode {
  periodeFra: string;
  periodeTil?: string;
}

export interface AFArbeidsgiver {
  orgnr: string;
  orgnavn: string;
}

export interface AFUtvidet extends AFArbeidsavtaler {
  ansettelsesPeriode?: AFPeriode;
  antallTimerForTimeloennet: AFTimerForTimelonnet[];
  arbeidsavtaler: AFArbeidsavtaler[];
  arbeidsforholdId: string;
  arbeidsgiver: AFArbeidsgiver;
  arbeidstaker?: {
    type: string;
    aktoerId: number;
    offentligIdent: number;
  };
  innrapportertEtterAOrdningen: boolean;
  navArbeidsforholdId: number;
  opplysningspliktig: {
    type: string;
  };
  permisjonPermitteringer: AFPermisjonPermittering[];
  registrert?: string;
  sistBekreftet?: string;
  type?: string;
  utenlandsopphold: AFUtenlandsopphold[];
}
