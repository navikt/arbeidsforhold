import React from "react";
import { AFArbeidsavtaler } from "../../../types/arbeidsforhold";
import { sortPeriodeFraDesc, sortPeriodeTilDesc } from "../../../utils/date";
import { Text, View } from "@react-pdf/renderer";
import PDFCheckAndPrintBox from "../../../components/pdf-check-and-print-box/PDFCheckAndPrintBox";
import sprak from "../../../language/provider";
import CheckDateAndPrint from "../../../components/check-date-and-print/CheckDateAndPrint";
import { pdfStyles } from "../../common/pdf-styles";

interface Props {
  arbeidsavtaler: AFArbeidsavtaler[];
  locale: string;
}

const HistorikkPDF = ({ arbeidsavtaler, locale }: Props) => {
  arbeidsavtaler
    .sort((left, right) =>
      sortPeriodeFraDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    )
    .sort((left, right) =>
      sortPeriodeTilDesc(left.gyldighetsperiode, right.gyldighetsperiode)
    );

  return (
    <View style={pdfStyles.flexTable}>
      {arbeidsavtaler.map((arbeidsavtale, i) => {
        return (
          <View
            key={i}
            wrap={false}
            style={{
              ...pdfStyles.flexGrid,
              ...(!i && {
                borderTop: "1px solid black",
              }),
              borderBottom: "1px solid black",
            }}
          >
            <PDFCheckAndPrintBox
              title={sprak[locale].periode}
              period={true}
              data={arbeidsavtale.gyldighetsperiode}
            />

            <PDFCheckAndPrintBox
              title={sprak[locale].yrke}
              data={arbeidsavtale.yrke}
            />

            <PDFCheckAndPrintBox
              title={sprak[locale].arbeidstidsordning}
              data={arbeidsavtale.arbeidstidsordning}
            />
            <PDFCheckAndPrintBox
              title={sprak[locale].sistelonnsendring}
              data={arbeidsavtale.sisteLoennsendring}
              date={true}
            />
            <PDFCheckAndPrintBox
              title={sprak[locale].stillingsprosent}
              data={arbeidsavtale.stillingsprosent}
            >
              <Text style={pdfStyles.normaltekst}>
                <CheckDateAndPrint
                  data={arbeidsavtale.sisteStillingsendring}
                  format={`(${sprak[locale].endretstillingsprosent} %s)`}
                />
              </Text>
            </PDFCheckAndPrintBox>
            <PDFCheckAndPrintBox
              title={sprak[locale].timerperuke}
              data={arbeidsavtale.antallTimerPrUke}
            />
            <PDFCheckAndPrintBox
              title={sprak[locale].skipsregister}
              data={arbeidsavtale.skipsregister}
            />
            <PDFCheckAndPrintBox
              title={sprak[locale].skipstype}
              data={arbeidsavtale.skipstype}
            />
            <PDFCheckAndPrintBox
              title={sprak[locale].fartsomraade}
              data={arbeidsavtale.fartsomraade}
            />
          </View>
        );
      })}
    </View>
  );
};

export default HistorikkPDF;
