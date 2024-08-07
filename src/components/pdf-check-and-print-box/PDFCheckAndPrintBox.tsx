import { CheckDateAndPrint } from '../check-date-and-print/CheckDateAndPrint';
import { CheckAndPrint } from '../check-and-print/CheckAndPrint';
import { CheckPeriodAndPrint } from '../check-period-and-print/CheckPeriodAndPrint';
import { Text, View } from '@react-pdf/renderer';
import { AFPeriode } from '@/types/arbeidsforhold';
import { pdfStyles } from '../../modules/common/pdfStyles';

type Props = {
    title: string;
    children?: string | JSX.Element | JSX.Element[];
    format?: string;
    period?: boolean;
} & (
    | {
          date?: undefined;
          period?: undefined;
          data?: string | number;
      }
    | {
          date: true;
          period?: undefined;
          data?: string | number;
      }
    | {
          date?: undefined;
          period: true;
          data?: AFPeriode;
      }
);

export const PDFCheckAndPrintBox = (props: Props) => {
    return props.data ? (
        <View style={[pdfStyles.twoColumns, pdfStyles.section]}>
            <Text style={pdfStyles.h3}>{props.title}</Text>
            <Text style={pdfStyles.normaltekst}>
                {props.date && <CheckDateAndPrint data={props.data} format={props.format} />}
                {props.period && <CheckPeriodAndPrint data={props.data} format={props.format} />}
                {!props.date && !props.period && <CheckAndPrint data={props.data} format={props.format} />}
            </Text>
            {props.children}
        </View>
    ) : null;
};
