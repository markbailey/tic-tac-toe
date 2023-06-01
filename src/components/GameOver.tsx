import { createPortal } from 'react-dom';

import { Player } from '../common';
import { mount } from '../utilities/show';
import { ReactComponent as XIcon } from '../assets/icons/x.svg';
import { ReactComponent as OIcon } from '../assets/icons/o.svg';

export type Winner = keyof typeof Player | 'draw';
type GameOverProps = { winner: Winner | null };

function GameOver({ winner }: GameOverProps) {
  const show = winner !== null;
  const isDraw = winner === 'draw';
  const showX = winner === Player.X || isDraw;
  const showO = winner === Player.O || isDraw;

  return mount(
    show,
    createPortal(
      <div className="gameover">
        <div>
          {mount(showX, <XIcon width={64} height={64} className="x" />)}
          {mount(showO, <OIcon width={64} height={64} className="o" />)}
        </div>

        {mount(isDraw, <h1>Draw!</h1>)}
        {mount(!isDraw, <h1>Winner!</h1>)}
      </div>,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('portal')!
    )
  );
}

export default GameOver;
