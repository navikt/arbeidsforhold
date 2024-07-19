import React from 'react';
import { ArbeidsgiverTittel } from '@/components/arbeidsgiver/ArbeidsgiverTittel';
import { CheckAndPrint } from '@/components/check-and-print/CheckAndPrint';
import { orgnr } from '@/utils/orgnr';
import { sprak } from '@/language/provider';
import { CheckPeriodAndPrint } from '@/components/check-period-and-print/CheckPeriodAndPrint';
import { useLocale } from '@/modules/common/useLocale';
import { AFUtvidet } from '@/types/arbeidsforhold';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    arbeidsforhold: AFUtvidet;
}

export const DetaljertHeader = (props: Props) => {
    const { arbeidsforhold } = props;
    const { locale } = useLocale();

    return (
        <div className="af-detaljert__intro">
            <div className="af-detaljert__seksjon">
                <div className="af-detaljert__arbeidsgiver">
                    <Heading level={'2'} size={'small'}>
                        <ArbeidsgiverTittel overskrift={true} arbeidsgiver={arbeidsforhold.arbeidsgiver} />
                    </Heading>
                    {arbeidsforhold.arbeidsgiver.type === 'Organisasjon' && (
                        <div className="af-detaljert__orgnr">
                            <BodyShort>
                                <CheckAndPrint data={orgnr(arbeidsforhold.arbeidsgiver.orgnr)} format={`${sprak[locale].organisasjonsnummer} %s`} />
                            </BodyShort>
                        </div>
                    )}
                </div>
            </div>
            {arbeidsforhold.ansettelsesperiode && (
                <div className="af-detaljert__seksjon af-detaljert__periode">
                    <div className="af-detaljert__arbeidsgiver">
                        <Heading level={'2'} size={'xsmall'}>
                            {sprak[locale].ansettelsesperiode}
                        </Heading>
                        <div className="af-detaljert__orgnr">
                            <BodyShort>
                                <CheckPeriodAndPrint data={arbeidsforhold.ansettelsesperiode.periode} />
                                <CheckAndPrint data={arbeidsforhold.ansettelsesperiode?.sluttaarsak} format={`(${sprak[locale].sluttaarsak}: %s)`} />
                            </BodyShort>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
