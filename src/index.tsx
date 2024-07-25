import './index.less';
import { setUpMock } from './clients/apiMock';
import { Environment } from './utils/environment';

import ListeMedArbeidsforhold, { AFListeOnClick } from './modules/af-liste';
import DetaljertArbeidsforhold from './modules/af-detaljert';
import './language/provider';

if (import.meta.env.VITE_ENV === 'local') {
    Environment.settEnv('LOCAL');
    setUpMock();
}

export { ListeMedArbeidsforhold, DetaljertArbeidsforhold, AFListeOnClick };
