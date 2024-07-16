import React from 'react';
import { AFDetaljertData, AFDetaljertProps } from './index';
import { sprak } from '../../language/provider';
import { ArbeidsavtaleFelter } from './detaljer/ArbeidsavtaleFelter';
import { DetaljertTabs } from './tabs/DetaljertTabs';
import { useLocale } from '../common/useLocale';
import { DetaljertHeader } from './detaljer/DetaljertHeader';
import { PrintButton } from './print/PrintButton';
import { Alert } from '@navikt/ds-react';

export const Detaljert = (props: AFDetaljertProps & AFDetaljertData) => {
    const { arbeidsforhold } = props;
    const { locale } = useLocale();

    return (
        <div className={`af-detaljert__container`}>
            <DetaljertHeader arbeidsforhold={arbeidsforhold} />
            <hr />
            <ArbeidsavtaleFelter data={arbeidsforhold} isUtvidet={true} />
            <DetaljertTabs arbeidsforhold={arbeidsforhold} />
            <Alert variant="info">
                {sprak[locale].hvisfeil1}
                <br />
                {sprak[locale].hvisfeil2}
            </Alert>
            {props.printActivated && <PrintButton arbeidsforhold={arbeidsforhold} printName={props.printName} printSSN={props.printSSN} />}
        </div>
    );
};
