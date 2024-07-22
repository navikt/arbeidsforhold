import { Text, View } from '@react-pdf/renderer';
import { sprak } from '@/language/provider';
import dayjs from 'dayjs';
import { useLocale } from './useLocale';
import { pdfStyles } from './pdfStyles';

export const PdfFooter = () => {
    const { locale } = useLocale();

    return (
        <View style={pdfStyles.footer} fixed={true}>
            <Text>{sprak[locale].pdfFooter1}</Text>
            <Text>{sprak[locale].pdfFooter2(dayjs().format('DD.MM.YYYY'))}</Text>
        </View>
    );
};
