import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import afDetaljert from '@/assets/mockdata/af-detaljert.json';
import '@testing-library/jest-dom';
import { orgnr } from '@/utils/orgnr';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/date';
import { Detaljert } from '../modules/af-detaljert/Detaljert';
import { AFUtvidet } from '@/types/arbeidsforhold';

vi.mock('@react-pdf/renderer', () => ({
    Text: () => <div>Text</div>,
    StyleSheet: {
        create: () => {},
    },
}));

beforeEach(() => {
    render(
        <Detaljert
            rolle={'ARBEIDSTAKER'}
            locale={'nb'}
            miljo={'LOCAL'}
            navArbeidsforholdId={1}
            printActivated={false}
            arbeidsforhold={afDetaljert as AFUtvidet}
        />
    );
});

describe('Detaljert arbeidsforhold', () => {
    test('inneholder data fra DetaljertHeader-komponent', () => {
        expect(screen.getByText(afDetaljert.arbeidsgiver.orgnavn)).toBeInTheDocument();
        expect(screen.getAllByText('Organisasjonsnummer ' + orgnr(afDetaljert.arbeidsgiver.orgnr))).toHaveLength(2);
        expect(screen.getByText(formatDate(afDetaljert.ansettelsesperiode.periode.periodeFra))).toBeInTheDocument();
        expect(screen.getByText('(Sluttårsak: ' + afDetaljert.ansettelsesperiode.sluttaarsak + ')')).toBeInTheDocument();
    });

    test('inneholder data fra ArbeidsavtaleFelter-komponent', () => {
        expect(screen.getByText(afDetaljert.opplysningspliktigarbeidsgiver.orgnavn)).toBeInTheDocument();
        expect(screen.getAllByText('Organisasjonsnummer ' + orgnr(afDetaljert.arbeidsgiver.orgnr))).toHaveLength(2);
        expect(screen.getByText(afDetaljert.yrke)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.type)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.eksternArbeidsforholdId)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.arbeidstidsordning)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.ansettelsesform)).toBeInTheDocument();
        expect(screen.getByText(formatDate(afDetaljert.sisteLoennsendring))).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.stillingsprosent)).toBeInTheDocument();
        expect(screen.getByText('(Endret stillingsprosent ' + formatDate(afDetaljert.sisteStillingsendring) + ')')).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.antallTimerPrUke)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.skipsregister)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.skipstype)).toBeInTheDocument();
        expect(screen.getByText(afDetaljert.fartsomraade)).toBeInTheDocument();
        expect(screen.getByText(formatDate(afDetaljert.sistBekreftet))).toBeInTheDocument();
    });

    test('inneholder data fra Timer-komponent', () => {
        fireEvent.click(screen.getAllByText('Timer for timelønnet')[0]);

        afDetaljert.antallTimerForTimelonnet.forEach((timer) => {
            expect(screen.getAllByText(formatDate(timer.rapporteringsperiode, 'MMMM')).length).toBeGreaterThan(0);
            expect(screen.getAllByText(formatDate(timer.periode.periodeFra)).length).toBeGreaterThan(0);
            expect(screen.getAllByText(formatDate(timer.periode.periodeTil)).length).toBeGreaterThan(0);
            if (timer.antallTimer > 0) {
                expect(screen.getAllByText(timer.antallTimer).length).toBeGreaterThan(0);
            }
        });
    });

    test('inneholder data fra Permisjon-komponent', async () => {
        fireEvent.click(screen.getByRole('tab', { name: 'Permisjon/Permittering' }));

        const promiseMap = [];

        // Note: forEach doesn't work with waitFor and expect for some reason
        // so need to do a for-of
        for (const permisjon of afDetaljert.permisjonPermittering) {
            const waitPromise = waitFor(() => {
                expect(screen.getAllByText(permisjon.type).length).toBeGreaterThanOrEqual(1);
                expect(screen.getAllByText(formatDate(permisjon.periode.periodeFra)).length).toBeGreaterThan(0);
                expect(screen.getAllByText(formatDate(permisjon.periode.periodeTil)).length).toBeGreaterThan(0);
                expect(screen.getAllByText(permisjon.prosent).length).toBeGreaterThan(0);
            });

            promiseMap.push(waitPromise);
        }

        await Promise.all(promiseMap);
    });

    test('inneholder data fra Utenlandsopphold-komponent', () => {
        fireEvent.click(screen.getByRole('tab', { name: 'Arbeid i utlandet' }));

        // Expand all years
        const uniqueYears = new Set(afDetaljert.utenlandsopphold.map((utenlandsopphold) => dayjs(utenlandsopphold.periode.periodeFra).year()));
        uniqueYears.forEach(async (year) => {
            if (year !== Math.max(...uniqueYears)) {
                await waitFor(() => {
                    fireEvent.click(screen.getByText(year));
                });
            }
        });

        afDetaljert.utenlandsopphold.forEach(async (utenlandsopphold) => {
            await waitFor(() => {
                expect(screen.getAllByText(formatDate(utenlandsopphold.periode.periodeFra, 'MMMM')).length).toBeGreaterThan(0);
                expect(screen.getAllByText(formatDate(utenlandsopphold.periode.periodeFra)).length).toBeGreaterThan(0);
                expect(screen.getAllByText(formatDate(utenlandsopphold.periode.periodeTil)).length).toBeGreaterThan(0);
                expect(screen.getAllByText(utenlandsopphold.land).length).toBeGreaterThan(0);
            });
        });
    });

    test('inneholder data fra Historikk-komponent', () => {
        fireEvent.click(screen.getAllByText('Historikk')[0]);

        // Expand all
        [...afDetaljert.arbeidsavtaler.keys()].forEach(async () => {
            await waitFor(() => {
                fireEvent.click(screen.getAllByText('Åpne')[0]);
            });
        });

        afDetaljert.arbeidsavtaler.forEach(async (arbeidsavtale) => {
            await waitFor(() => {
                expect(screen.getAllByText(arbeidsavtale.yrke).length).toBeGreaterThan(0);
                expect(screen.getAllByText(formatDate(arbeidsavtale.gyldighetsperiode.periodeFra)).length).toBeGreaterThan(0);
                if (arbeidsavtale.gyldighetsperiode.periodeTil) {
                    expect(screen.getAllByText(formatDate(arbeidsavtale.gyldighetsperiode.periodeTil)).length).toBeGreaterThan(0);
                }
                expect(screen.getAllByText(arbeidsavtale.arbeidstidsordning).length).toBeGreaterThan(0);
                if (arbeidsavtale.ansettelsesform) {
                    expect(screen.getAllByText(arbeidsavtale.ansettelsesform).length).toBeGreaterThan(0);
                }
                expect(screen.getAllByText(formatDate(arbeidsavtale.sisteLoennsendring)).length).toBeGreaterThan(0);
                expect(screen.getAllByText(arbeidsavtale.stillingsprosent).length).toBeGreaterThan(0);
                expect(
                    screen.getAllByText('(Endret stillingsprosent ' + formatDate(arbeidsavtale.sisteStillingsendring) + ')').length
                ).toBeGreaterThan(0);
                expect(screen.getAllByText(arbeidsavtale.antallTimerPrUke).length).toBeGreaterThan(0);
                if (arbeidsavtale.skipsregister) {
                    expect(screen.getAllByText(arbeidsavtale.skipsregister).length).toBeGreaterThan(0);
                }

                if (arbeidsavtale.skipstype) {
                    expect(screen.getAllByText(arbeidsavtale.skipstype).length).toBeGreaterThan(0);
                }
                if (arbeidsavtale.fartsomraade) {
                    expect(screen.getAllByText(arbeidsavtale.fartsomraade).length).toBeGreaterThan(0);
                }
            });
        });
    });
});
