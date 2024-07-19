import React from 'react';
import { ListeTittel } from '../tittel/ListeTittel';
import { CheckAndPrint } from '@/components/check-and-print/CheckAndPrint';
import { CheckPeriodAndPrint } from '@/components/check-period-and-print/CheckPeriodAndPrint';
import { sprak } from '@/language/provider';
import { useLocale } from '../../common/useLocale';
import { AFSimpel } from '@/types/arbeidsforhold';
import { AFListeOnClick } from '../index';

interface Props {
    foretak: AFSimpel;
    onClick: AFListeOnClick;
}

export const ListeInnslag = (props: Props) => {
    const { locale } = useLocale();

    return (
        <div className="af-liste__flex-rad">
            <div className="af-liste__flex-innhold">
                <div className="af-liste__tekst">
                    <ListeTittel foretak={props.foretak} onClick={props.onClick} />
                </div>
                <div className="af-liste__tekst">
                    <CheckAndPrint data={props.foretak.yrke} />
                </div>
                <div className="af-liste__tekst">
                    <CheckPeriodAndPrint
                        data={props.foretak.ansettelsesperiode.periode}
                        maskineltAvsluttet={
                            props.foretak.ansettelsesperiode.varslingskode ? sprak[locale][props.foretak.ansettelsesperiode.varslingskode] : null
                        }
                    />
                </div>
            </div>
        </div>
    );
};
