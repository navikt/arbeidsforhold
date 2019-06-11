export interface AFSimpel {
  arbeidsforholdId: string;
  arbeidsgiver: AFArbeidsgiver;
  ansettelsesperiode: AFPeriode;
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
  land: string;
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
  ansettelsesperiode?: AFPeriode;
  antallTimerForTimeloennet: AFTimerForTimelonnet[];
  arbeidsavtaler: AFArbeidsavtaler[];
  arbeidsforholdId: string;
  arbeidsgiver: AFArbeidsgiver;
  arbeidstaker?: {
    type: string;
    aktoerId: number;
    offentligIdent: number;
  };
  fartsomraade?: string;
  innrapportertEtterAOrdningen: boolean;
  navArbeidsforholdId: number;
  opplysningspliktigarbeidsgiver: AFArbeidsgiver;
  permisjonPermitteringer: AFPermisjonPermittering[];
  registrert?: string;
  skipsregister?: string;
  skipstype?: string;
  sistBekreftet?: string;
  type?: string;
  utenlandsopphold: AFUtenlandsopphold[];
}
