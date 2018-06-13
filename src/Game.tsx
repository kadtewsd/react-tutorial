// アルファベット順は from 以下の方で決まるらしい
import * as React from 'react';
import Board from './board/Board';
import Judge from './calculation/Judge';
import './Game.css';

interface IProp {
    xIsNext: boolean;
}
interface IState {
    // Array<T>' is forbidden for simple types. Use 'T[]' instead. -> 単純な配列にしろ、と。
    // history: Array<IBoardState>
    // array is forbbiden for non-simple type
    // history: {squares: any}[];
    history: Array<{ squares: Array<string | null>}>;
    xIsNext: boolean;
}
class Game extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }
    public render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const j = new Judge();
        const winner = j.calculateWinner(current.squares);
        const status = winner ? `Winner ${winner}` :
            `Next player is ${this.state.xIsNext ? 'X' : 'O'}`;
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} // この形は OK らしい。
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{/*todo*/}</ol>
                </div>
            </div>
        );
    }

    /**
     * 関数を返す関数出ないと、このクラスにある引数の値を動的に Square に渡せない。
     * 引数をもらって関数を返す。
     * 返した関数が React に遅延実行される。
     */
    public handleClick = (i: number) => {
        console.log('game argument', i);
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log(`squares: ${squares}`);
        // squares[i] = this.state.xIsNext ? 'X' : 'O';
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // squares: squares, // squares  1 つしかないときは、ES5 の書き方として怒られる
            history: history.concat([{ // 上書きするときはキーがいらないらしい。
                squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }
}
export default Game;
