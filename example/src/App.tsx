import { useState } from 'react';
import { Miljo } from '../../src/types/miljo';
import { DetaljertArbeidsforhold, ListeMedArbeidsforhold, initLocalMock } from '@navikt/arbeidsforhold';
import { InfoBoks } from './components/InfoBoks';
import { SprakVelger } from './components/SprakVelger';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AFListeOnClick } from '../../src/modules/af-liste';
import { OnClickVelger } from './components/OnClickVelger';
import { Locale } from './types/locale';

import '@navikt/ds-css';
import { BodyLong } from '@navikt/ds-react';

initLocalMock();

const App = () => {
    const locales: Locale[] = ['nb', 'nn', 'en'];
    const host = window.location.host;
    const isDev = host.split(`.`)[1] === 'dev';
    const miljo = (isDev ? 'DEV' : 'LOCAL') as Miljo;

    const printActivated = true;
    const printName = 'Ola Nordmann';
    const printSSN = '12345678911';

    const [valgtArbeidsforholdId, settValgtArbeidsforholdId] = useState<number>();
    const [valgtLocale, settValgtLocale] = useState<Locale>('nb');

    const arbeidsforholdOnClick = (navArbeidsforholdId: number) => {
        console.log(`Clicked on ${navArbeidsforholdId}`);
        settValgtArbeidsforholdId(navArbeidsforholdId);
    };

    const onClicks = [
        {
            type: 'KNAPP',
            getId: arbeidsforholdOnClick,
        },
        {
            type: 'LENKE',
            href: '/arbeidsforhold/{id}',
        },
        {
            type: 'REACT_ROUTER_LENKE',
            Component: Link,
            to: '/arbeidsforhold/{id}',
        },
        {
            type: 'INGEN_ON_CLICK',
        },
    ] as AFListeOnClick[];

    const [valgtOnClick, settValgtOnClick] = useState(onClicks[0]);
    return (
        <div className="example__app">
            <div className="example__content">
                <Router>
                    <div className={'example__header'}>
                        <h2>Arbeidstakere</h2>
                    </div>
                    <SprakVelger locales={locales} valgtLocale={valgtLocale} settValgtLocale={settValgtLocale} />
                    <OnClickVelger onClicks={onClicks} valgtOnClick={valgtOnClick} settValgtOnClick={settValgtOnClick} />
                    <div className="example__section">
                        <ListeMedArbeidsforhold
                            miljo={miljo}
                            locale={valgtLocale}
                            onClick={valgtOnClick}
                            printActivated={printActivated}
                            printName={printName}
                            printSSN={printSSN}
                        />
                    </div>
                    <div className="example__section">
                        {valgtArbeidsforholdId ? (
                            <DetaljertArbeidsforhold
                                rolle={'ARBEIDSTAKER'}
                                miljo={miljo}
                                locale={valgtLocale}
                                navArbeidsforholdId={valgtArbeidsforholdId}
                                printActivated={printActivated}
                                printName={printName}
                                printSSN={printSSN}
                            />
                        ) : (
                            <InfoBoks />
                        )}
                    </div>
                    <div className={'example__header'}>
                        <h2>Arbeidsgivere</h2>
                        <BodyLong>
                            Logg inn med 16120101181. <br />
                            Viser arbeidsforhold 47720602 for arbeidstaker 27127424204
                        </BodyLong>
                    </div>
                    <div className="example__section">
                        <DetaljertArbeidsforhold
                            rolle={'ARBEIDSGIVER'}
                            miljo={miljo}
                            locale={valgtLocale}
                            fnrArbeidstaker={`${27127424204}`}
                            navArbeidsforholdId={47720602}
                            printActivated={printActivated}
                            printName={printName}
                            printSSN={printSSN}
                        />
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default App;
