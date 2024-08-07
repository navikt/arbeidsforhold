import { useState } from 'react';
import { AFListeData, AFListeProps } from './index';
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from '@/utils/date';
import { sprak } from '@/language/provider';
import { useLocale } from '@/modules/common/useLocale';
import { ListeInnslag } from './innslag/ListeInnslag';
import { VisFlereButton } from './vis-flere-button/VisFlereButton';
import { PrintButton } from './print/PrintButton';
import { BodyShort } from '@navikt/ds-react';

export const Liste = (props: AFListeProps & AFListeData) => {
    const { arbeidsforhold, onClick } = props;
    const [visAlle, settVisAlle] = useState<boolean>(false);
    const { locale } = useLocale();

    const sorterteArbeidsforhold = arbeidsforhold
        .sort((a, b) => sortPeriodeFraDesc(a.ansettelsesperiode.periode, b.ansettelsesperiode.periode))
        .sort((a, b) => sortPeriodeTilDesc(a.ansettelsesperiode.periode, b.ansettelsesperiode.periode));

    return (
        <div className={'af-liste__container'}>
            <div className="af-liste__table">
                {sorterteArbeidsforhold.length > 0 &&
                    sorterteArbeidsforhold
                        .slice(0, visAlle ? arbeidsforhold.length : 5)
                        .map((foretak, counter) => <ListeInnslag foretak={foretak} onClick={onClick} key={counter} />)}
                {sorterteArbeidsforhold.length === 0 && (
                    <div className="af-liste__flex-rad">
                        <BodyShort>{sprak[locale].ingenarbeidsforhold}</BodyShort>
                    </div>
                )}
            </div>
            {arbeidsforhold.length > 5 && <VisFlereButton toggleVisAlle={() => settVisAlle(!visAlle)} visAlle={visAlle} />}
            {props.printActivated && arbeidsforhold.length > 0 && (
                <PrintButton arbeidsforhold={arbeidsforhold} printSSN={props.printSSN} printName={props.printName} />
            )}
        </div>
    );
};
