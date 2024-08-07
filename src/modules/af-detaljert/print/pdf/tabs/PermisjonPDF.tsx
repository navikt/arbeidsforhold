import { AFPermisjonPermittering } from '@/types/arbeidsforhold';
import { sortPeriodeFraDesc } from '@/utils/date';
import { CheckPeriodAndPrint } from '@/components/check-period-and-print/CheckPeriodAndPrint';
import { sprak } from '@/language/provider';
import { Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '@/modules/common/pdfStyles';
import { useLocale } from '@/modules/common/useLocale';

interface Props {
    permisjoner: AFPermisjonPermittering[];
}

const sortPermisjoner = (left: AFPermisjonPermittering, right: AFPermisjonPermittering) => {
    return sortPeriodeFraDesc(left.periode, right.periode);
};

export const PermisjonPDF = (props: Props) => {
    const { locale } = useLocale();

    const sortedPermisjoner = props.permisjoner.sort(sortPermisjoner);

    return (
        <>
            <View wrap={false}>
                <View style={pdfStyles.tableTitle}>
                    <Text style={pdfStyles.h2}>Permisjon/Permittering</Text>
                </View>
                <View style={pdfStyles.flexRow}>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].type}</Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].periode}</Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.h3}>{sprak[locale].prosent}</Text>
                    </View>
                </View>
            </View>
            {sortedPermisjoner.map((permisjon, i) => (
                <View key={`${i}`} style={pdfStyles.flexRow} wrap={false}>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.normaltekst}>{permisjon.type}</Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.normaltekst}>
                            <CheckPeriodAndPrint data={permisjon.periode} />
                        </Text>
                    </View>
                    <View style={pdfStyles.flexColumn}>
                        <Text style={pdfStyles.normaltekst}>{permisjon.prosent}</Text>
                    </View>
                </View>
            ))}
        </>
    );
};
