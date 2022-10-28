import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ListePDF } from "./pdf/ListePDF";
import { PrinterIcon } from "../../../assets/icons/PrinterIcon";
import { useLocale } from "../../common/useLocale";
import { useIsPdf } from "../../common/useIsPdf";
import { AFSimpel } from "../../../types/arbeidsforhold";

interface Props {
  arbeidsforhold: AFSimpel[];
  printName: string;
  printSSN: string;
}

export const PrintButton = (props: Props) => {
  const { locale, LocaleProvider } = useLocale();
  const { IsPdfProvider } = useIsPdf();

  return (
    <div className="af-liste__print-button">
      <Normaltekst>
        <PDFDownloadLink
          document={
            <IsPdfProvider value={true}>
              {/* LocaleProvider-wrapper nødvendig for å få med locale i PDF-rendering */}
              <LocaleProvider value={locale}>
                <ListePDF
                  arbeidsforhold={props.arbeidsforhold}
                  printName={props.printName}
                  printSSO={props.printSSN}
                />
              </LocaleProvider>
            </IsPdfProvider>
          }
          fileName="arbeidsforhold.pdf"
          className={"lenke"}
        >
          {({ loading }) =>
            loading ? null : (
              <>
                <PrinterIcon />
                <span>Skriv ut</span>
              </>
            )
          }
        </PDFDownloadLink>
      </Normaltekst>
    </div>
  );
};
