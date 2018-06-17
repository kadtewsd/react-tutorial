// アルファベット順は from 以下の方で決まるらしい
import * as React from 'react';
import Board from './board/Board';
import CellInformation from './calculation/CellInformation';
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
    history: Array<{
        squares: Array<string | null>;
        row: number;
        cell: number;
    }>;
    xIsNext: boolean;
    stepNumber: number;
}
class Game extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: 0,
                cell: 0,
            }],
            stepNumber: 0,
            // 先行は X, 後攻は O
            xIsNext: true,
        };
    }
    public render() {
        console.log('game render is starting...');
        const history = this.state.history;
        // const current = history[history.length - 1];
        // 最新の履歴をとってくるのではなくて、jumpTo でセットされた、あるいは、コンストラクタにてセットされた stepNumber の履歴をとってくる。
        const current = history[this.state.stepNumber];
        const j = new Judge();
        const winner = j.calculateWinner(current.squares);

        // move は 0 から始まる配列の添字
        const moves = history.map((step, move) => {
            const style = this.state.stepNumber === move ? 'current-selected'  : 'other-game';
            const description = move ?
                `Go to move # ${move} [row ${step.row} cell ${step.cell}]` :
                'Go to game Start';
            return (
                // key は reacto のコンポーネントを一意にするために必要。
                // key は global で一意である必要なし。sibling (li) で一意になれば良い。
                <li key={move}>
                    <button onClick={this.jumpTo(move)}>
                    <span className={style}>{description}</span>
                    </button>
                </li>
            );
        });
        const status = winner ? `Winner ${winner}` :
            `Next player is ${this.state.xIsNext ? 'X' : 'O'}`;
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleBoardCellClick(i)} // この形は OK らしい。
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    /**
     * 関数を返す関数出ないと、このクラスにある引数の値を動的に Square に渡せない。
     * 引数をもらって関数を返す。
     * 返した関数が React に遅延実行される。
     */
    private handleBoardCellClick = (cellIndex: number) => {
        // すべての配列を全てリスト slice で新規に配列として作成する。
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; // 最新の履歴をとってくる。
        const squares = current.squares.slice();
        console.log(`squares: ${squares}`);
        // squares[i] = this.state.xIsNext ? 'X' : 'O';
        squares[cellIndex] = this.state.xIsNext ? 'X' : 'O';
        const cell = new CellInformation(cellIndex);
        this.setState({
            // squares: squares, // squares  1 つしかないときは、ES5 の書き方として怒られる
            history: history.concat([{ // concat して現在の状況を新たな配列を既存の配列に追加。
                squares,
                row: cell.row,
                cell: cell.cellIndex,
            }]),
            stepNumber: history.length, // 溜め込んだ履歴の数だけ step する。
            xIsNext: !this.state.xIsNext,
        });
    }

    private jumpTo = (step: number) => () => {
        console.log(`go back to ${step}`);
        this.setState({
            stepNumber: step,
            // 先行は X なので、xIsNext は偶数の時になる。
            xIsNext: (step % 2) === 0,
        });
        console.log('jump to state is', this.state);
    }
}
export default Game;
