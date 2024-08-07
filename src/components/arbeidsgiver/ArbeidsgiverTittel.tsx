import { AFArbeidsgiver } from '@/types/arbeidsforhold';
import { CheckAndPrint } from '../check-and-print/CheckAndPrint';
import { fnr } from '@/utils/fnr';

interface Props {
    arbeidsgiver: AFArbeidsgiver;
}

export const ArbeidsgiverTittel = (props: Props) => {
    return <CheckAndPrint data={props.arbeidsgiver.type === 'Person' ? fnr(props.arbeidsgiver.fnr) : props.arbeidsgiver.orgnavn} />;
};
