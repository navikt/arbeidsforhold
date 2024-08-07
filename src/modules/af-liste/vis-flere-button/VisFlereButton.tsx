import { sprak } from '@/language/provider';
import { useLocale } from '@/modules/common/useLocale';
import { ChevronUpIcon, ChevronDownIcon } from '@navikt/aksel-icons';

interface Props {
    toggleVisAlle: () => void;
    visAlle: boolean;
}

export const VisFlereButton = (props: Props) => {
    const { locale } = useLocale();
    return (
        <button className="af-liste__vis-flere" onClick={props.toggleVisAlle} aria-expanded={props.visAlle}>
            {props.visAlle ? (
                <>
                    {sprak[locale].visfaerrearbeidsforhold} <ChevronUpIcon aria-hidden="true" />
                </>
            ) : (
                <>
                    {sprak[locale].visflerearbeidsforhold} <ChevronDownIcon aria-hidden="true" />
                </>
            )}
        </button>
    );
};
