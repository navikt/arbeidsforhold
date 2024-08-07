import { AFListeOnClick } from '@/index';
import { AFSimpel } from '@/types/arbeidsforhold';
import { ArbeidsgiverTittel } from '@/components/arbeidsgiver/ArbeidsgiverTittel';

interface Props {
    foretak: AFSimpel;
    onClick: AFListeOnClick;
}

export const ListeTittel = (props: Props) => {
    const { foretak, onClick } = props;

    const replaceId = (path: string, id: number) => path.replace('{id}', id.toString());

    switch (onClick.type) {
        case 'INGEN_ON_CLICK':
            return <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />;
        case 'LENKE':
            return (
                <a href={replaceId(onClick.href, foretak.navArbeidsforholdId)}>
                    <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
                </a>
            );
        case 'REACT_ROUTER_LENKE':
            return (
                <onClick.Component to={replaceId(onClick.to, foretak.navArbeidsforholdId)}>
                    <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
                </onClick.Component>
            );
        case 'KNAPP':
            return (
                <button className="af-liste__knapp" onClick={() => onClick.getId(foretak.navArbeidsforholdId)}>
                    <ArbeidsgiverTittel arbeidsgiver={foretak.arbeidsgiver} />
                </button>
            );
    }
};
