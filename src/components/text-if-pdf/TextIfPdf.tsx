import { useIsPdf } from '../../modules/common/useIsPdf';
import { Text } from '@react-pdf/renderer';

interface Props {
    children?: string | number;
}

export const TextIfPdf = (props: Props) => {
    const { isPdf } = useIsPdf();

    return isPdf ? <Text>{props.children}</Text> : <>{props.children}</>;
};
