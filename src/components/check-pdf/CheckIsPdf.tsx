import { useIsPdf } from "../../modules/common/useIsPdf";
import { Text } from "@react-pdf/renderer";

interface Props {
  children?: string | number;
}

const CheckIsPdf = (props: Props) => {
  const { isPdf } = useIsPdf();

  return isPdf ? <Text>{props.children} </Text> : <>{props.children}</>;
};

export default CheckIsPdf;