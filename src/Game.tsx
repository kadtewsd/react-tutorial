// アルファベット順は from 以下の方で決まるらしい
import * as React from 'react';
import Board from './Board';
import './Game.css';
import IBoardState from './IBoardState';

interface IProp {
    xIsNext: boolean;
}
interface IState {
    // Array<T>' is forbidden for simple types. Use 'T[]' instead. -> 単純な配列にしろ、と。
    // history: Array<IBoardState>
    history: IBoardState[];
}
class Game extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                xIsNext: true,
            }],
        };
        // props.xIsNext = true;
    }
    public render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
            </div>
        );
    }
}
export default Game;
