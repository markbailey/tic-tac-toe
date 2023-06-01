import { KeyboardEvent } from 'react';
import { ReactComponent as XIcon } from '../assets/icons/x.svg';
import { ReactComponent as OIcon } from '../assets/icons/o.svg';
import { Player } from '../common';
import { mount } from '../utilities/show';

export type SquareValue = keyof typeof Player | undefined;
interface SquareProps {
  index: number;
  value: SquareValue;
  onClick: (index: number) => void;
}

const handleKeyUp =
  (index: number, callback: (index: number) => void) =>
  (event: KeyboardEvent<HTMLTableCellElement>) =>
    (event.key === 'Enter' || event.key === ' ') && callback(index);

function Square(props: SquareProps) {
  const { index, value, onClick } = props;
  const interactiveProps =
    value === undefined
      ? {
          tabIndex: 0,
          role: 'button',
          onClick: () => onClick(index),
          onKeyUp: handleKeyUp(index, onClick),
        }
      : {};

  return (
    <td {...interactiveProps} className="square" aria-label={value}>
      {mount(value === Player.X, <XIcon />)}
      {mount(value === Player.O, <OIcon />)}
    </td>
  );
}

export default Square;
