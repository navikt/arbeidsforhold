import React from "react";
import { useIsPdf } from "../../modules/common/useIsPdf";
import { Text } from "@react-pdf/renderer";

interface Props {
  children?: string | number;
}

const TextIfPdf = (props: Props) => {
  const { isPdf } = useIsPdf();

  return isPdf ? <Text>{props.children}</Text> : <>{props.children}</>;
};

export default TextIfPdf;