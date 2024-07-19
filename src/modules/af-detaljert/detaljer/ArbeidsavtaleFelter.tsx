import React from 'react';
import { CheckAndPrintBox } from '@/components/check-and-print-box/CheckAndPrintBox';
import { CheckDateAndPrint } from '@/components/check-date-and-print/CheckDateAndPrint';
import { AFArbeidsavtaler, AFUtvidet } from '@/types/arbeidsforhold';
import { sprak } from '@/language/provider';
import { useLocale } from '../../common/useLocale';
import { CheckAndPrint } from '@/components/check-and-print/CheckAndPrint';
import { orgnr } from '@/utils/orgnr';
import { BodyShort } from '@navikt/ds-react';

interface PropsStandard {
    data: AFArbeidsavtaler;
    isUtvidet?: false;
}

interface PropsUtvidet {
    data: AFUtvidet;
    isUtvidet?: true;
}

export const ArbeidsavtaleFelter = (props: PropsStandard | PropsUtvidet) => {
    const { locale } = useLocale();
    return (
        <dl className="af-detaljert__arbeidsavtaleinnhold">
            {props.isUtvidet && (
                <>
                    <>
                        {props.data.opplysningspliktigarbeidsgiver.type === 'Organisasjon' && (
                            <CheckAndPrintBox title={sprak[locale].hovedenhet} data={props.data.opplysningspliktigarbeidsgiver.orgnavn}>
                                <BodyShort>
                                    <CheckAndPrint
                                        data={orgnr(props.data.opplysningspliktigarbeidsgiver.orgnr)}
                                        format={`${sprak[locale].organisasjonsnummer} %s`}
                                    />
                                </BodyShort>
                            </CheckAndPrintBox>
                        )}
                    </>
                    <CheckAndPrintBox title={sprak[locale].yrke} data={props.data.yrke} />
                    <CheckAndPrintBox title={sprak[locale].typearbeidsforhold} data={props.data.type} />
                    <CheckAndPrintBox title={sprak[locale].arbeidsforholdid} data={props.data.eksternArbeidsforholdId} />
                </>
            )}
            <CheckAndPrintBox title={sprak[locale].arbeidstidsordning} data={props.data.arbeidstidsordning} />
            <CheckAndPrintBox title={sprak[locale].ansettelsesform} data={props.data.ansettelsesform} />
            <CheckAndPrintBox title={sprak[locale].sistelonnsendring} data={props.data.sisteLoennsendring} date={true} />
            <CheckAndPrintBox title={sprak[locale].stillingsprosent} data={props.data.stillingsprosent}>
                <BodyShort>
                    <CheckDateAndPrint data={props.data.sisteStillingsendring} format={`(${sprak[locale].endretstillingsprosent} %s)`} />
                </BodyShort>
            </CheckAndPrintBox>
            <CheckAndPrintBox title={sprak[locale].timerperuke} data={props.data.antallTimerPrUke} />
            <CheckAndPrintBox title={sprak[locale].skipsregister} data={props.data.skipsregister} />
            <CheckAndPrintBox title={sprak[locale].skipstype} data={props.data.skipstype} />
            <CheckAndPrintBox title={sprak[locale].fartsomraade} data={props.data.fartsomraade} />
            {props.isUtvidet && <CheckAndPrintBox title={sprak[locale].sistbekreftet} data={props.data.sistBekreftet} date={true} />}
        </dl>
    );
};
