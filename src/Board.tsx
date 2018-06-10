// import は a->z で並べないといけない Lint がある。alphabetized
import * as React from 'react';
import IBoardState from './IBoardState';
import ChangeProperty from './propchange/ChangeProperty';
import Square from './Square';

// コメントを描く時は、// の後にスペースを入れろ、と。
// An empty interface is equivalent to `{}`.空のインターフェースは {} でかけ、、と。
// interface IProp {}
class Board extends React.Component<{}, IBoardState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            squares: Array<string | null>(9).fill(null), // null 許容
            xIsNext: true,
        };
    }
    public render() {
        const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        return (
            <div>
                <div className='status'>{status}</div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    /**
     * 関数を返す関数出ないと、このクラスにある引数の値を動的に Square に渡せない。
     */
    private handleClick = (i: number) => () => {
        // tslint は効かないので、コメントで特定の部位のみ lint を外す。
        // tslint:disable:no-console
        const c = new ChangeProperty();
        console.log(c.changeByMutating());
        console.log(c.changeByNotMutating());
        console.log(`executed on Board: ${this}引数は${i}`, this);
        // deep copy
        const squares: Array<string | null> = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // squares: squares, // squares  1 つしかないときは、ES5 の書き方として怒られる
              squares, // 上書きするときはキーがいらないらしい。
              xIsNext: !this.state.xIsNext,
        });
    }
    /**
     * private メソッドは、public のメソッドのあとにくる
     * @param i
     */
    private renderSquare(i: number) {
        return (
            <Square value={this.state.squares[i]}
            onClick={this.handleClick(i)}/>
        );
    }
}

export default Board;
