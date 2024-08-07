import { AFUtvidet } from '@/types/arbeidsforhold';
import { Timer } from './Timer';
import { Permisjon } from './Permisjon';
import { Utenlandsopphold } from './Utenlandsopphold';
import { Historikk } from './Historikk';
import { DetaljertTabType } from './DetaljertTabs';

type Props = {
    type: DetaljertTabType;
    arbeidsforhold: AFUtvidet;
};

export const TabContent = ({ type, arbeidsforhold }: Props) => {
    const { antallTimerForTimelonnet, permisjonPermittering, utenlandsopphold, arbeidsavtaler } = arbeidsforhold;

    switch (type) {
        case 'timer':
            return <Timer timer={antallTimerForTimelonnet} />;
        case 'permisjon':
            return <Permisjon permisjoner={permisjonPermittering} />;
        case 'utenlandsopphold':
            return <Utenlandsopphold utenlandsopphold={utenlandsopphold} />;
        case 'historikk':
            return <Historikk arbeidsavtaler={arbeidsavtaler} />;
        default:
            return null;
    }
};
