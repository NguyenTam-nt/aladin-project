import {isTabletDevice} from '@configs';

interface MultipleScreenViewProps {
  phoneView?: JSX.Element | null
  tableVew?: JSX.Element | null
}

export const MultipleScreenView = ({
  phoneView = null,
  tableVew = null,
}: MultipleScreenViewProps) => {
  return !isTabletDevice ? phoneView : tableVew;
};
