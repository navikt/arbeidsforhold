import React, { useState } from 'react';
import { DownloadPDFLink } from './DownloadPdfLink';
import { useLocale } from '@/modules/common/useLocale';
import { AFUtvidet } from '@/types/arbeidsforhold';
import { sprak } from '@/language/provider';
import { BodyShort, Checkbox, Heading, Modal } from '@navikt/ds-react';
import { PrinterSmallIcon } from '@navikt/aksel-icons';

interface Props {
    arbeidsforhold: AFUtvidet;
    printName: string;
    printSSN: string;
}

export const PrintButton = (props: Props) => {
    const { arbeidsforhold } = props;
    const { arbeidsavtaler, permisjonPermittering } = arbeidsforhold;
    const { antallTimerForTimelonnet, utenlandsopphold } = arbeidsforhold;
    const { locale } = useLocale();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [printGenerellOversikt, settPrintGenerellOversikt] = useState<boolean>(true);
    const [printTimerTimelonnet, settPrintTimerTimelonnet] = useState<boolean>(antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0);
    const [printPermisjon, settPrintPermisjon] = useState<boolean>(permisjonPermittering && permisjonPermittering.length > 0);
    const [printUtenlandsopphold, settPrintUtenlandsopphold] = useState<boolean>(utenlandsopphold && utenlandsopphold.length > 0);
    const [printHistorikk, settPrintHistorikk] = useState<boolean>(arbeidsavtaler && arbeidsavtaler.length > 0);

    return (
        <>
            <div className="af-detaljert__print-button-oversikt">
                <BodyShort>
                    {
                        // Show modal with checkboxes if user has relevant data
                        (antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0) ||
                        (permisjonPermittering && permisjonPermittering.length > 0) ||
                        (utenlandsopphold && utenlandsopphold.length > 0) ||
                        (arbeidsavtaler && arbeidsavtaler.length > 0) ? (
                            <button className={'lenke af-detaljert__print-button'} onClick={() => setOpenModal(true)}>
                                <PrinterSmallIcon aria-hidden="true" />
                                <span>{sprak[locale].skrivut}</span>
                            </button>
                        ) : (
                            <DownloadPDFLink
                                arbeidsforhold={arbeidsforhold}
                                printGenerellOversikt={printGenerellOversikt}
                                printTimerTimelonnet={printTimerTimelonnet}
                                printPermisjon={printPermisjon}
                                printUtenlandsopphold={printUtenlandsopphold}
                                printHistorikk={printHistorikk}
                                printName={props.printName}
                                printSSO={props.printSSN}
                            />
                        )
                    }
                </BodyShort>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} aria-label={sprak[locale].utskriftsvalg}>
                <Modal.Header closeButton={true}>
                    <Heading level="2" size="small" className={'af-detaljert__header'}>
                        {sprak[locale].utskriftsvalg}
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <Checkbox
                        className={'af-detaljert__checkbox'}
                        checked={printGenerellOversikt}
                        onChange={() => settPrintGenerellOversikt(!printGenerellOversikt)}
                    >
                        {sprak[locale].generelleopplysninger}
                    </Checkbox>
                    <Heading level="2" size="small" className={'af-detaljert__header'}>
                        {sprak[locale].tilleggsopplysninger}
                    </Heading>
                    {antallTimerForTimelonnet && antallTimerForTimelonnet.length > 0 && (
                        <Checkbox
                            className={'af-detaljert__checkbox'}
                            checked={printTimerTimelonnet}
                            onChange={() => settPrintTimerTimelonnet(!printTimerTimelonnet)}
                        >
                            {sprak[locale].tabs.timerfortimelonnet}
                        </Checkbox>
                    )}
                    {permisjonPermittering && permisjonPermittering.length > 0 && (
                        <Checkbox className={'af-detaljert__checkbox'} checked={printPermisjon} onChange={() => settPrintPermisjon(!printPermisjon)}>
                            {sprak[locale].tabs.permisjonpermittering}
                        </Checkbox>
                    )}
                    {utenlandsopphold && utenlandsopphold.length > 0 && (
                        <Checkbox
                            className={'af-detaljert__checkbox'}
                            checked={printUtenlandsopphold}
                            onChange={() => settPrintUtenlandsopphold(!printUtenlandsopphold)}
                        >
                            {sprak[locale].tabs.arbeidiutlandet}
                        </Checkbox>
                    )}
                    {arbeidsavtaler && arbeidsavtaler.length > 0 && (
                        <Checkbox className={'af-detaljert__checkbox'} checked={printHistorikk} onChange={() => settPrintHistorikk(!printHistorikk)}>
                            {sprak[locale].tabs.historikk}
                        </Checkbox>
                    )}
                    <div className="af-detaljert__print-button-modal">
                        <DownloadPDFLink
                            arbeidsforhold={arbeidsforhold}
                            printGenerellOversikt={printGenerellOversikt}
                            printTimerTimelonnet={printTimerTimelonnet}
                            printPermisjon={printPermisjon}
                            printUtenlandsopphold={printUtenlandsopphold}
                            printHistorikk={printHistorikk}
                            printName={props.printName}
                            printSSO={props.printSSN}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
