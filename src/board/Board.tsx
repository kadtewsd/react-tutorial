// import は a->z で並べないといけない Lint がある。alphabetized
import * as React from 'react';
import IBoardProp from './IBoardProp';
import ChangeProperty from './propchange/ChangeProperty';
import Square from './square/Square';

// コメントを描く時は、// の後にスペースを入れろ、と。
// An empty interface is equivalent to `{}`.空のインターフェースは {} でかけ、、と。
// interface IProp {}
class Board extends React.Component<IBoardProp, IBoardProp> {

    // to store history in Game of top layer, delete this constructor
    constructor(props: IBoardProp) {
        super(props);
        // this.state = {
        //     squares: Array<string | null>(9).fill(null), // null 許容
        //     xIsNext: true,
        // };
    }
    public render() {
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

    // tslint は効かないので、コメントで特定の部位のみ lint を外す。
    // tslint:disable:no-console
    /**
     * Square で実行される関数を返す関数。
     * 引数なしの関数を () => this.handlePropOnclick(i) とするとエラーになる。
     * そこで引数を活かして遅延実行したい時は、関数を返す関数を定義してしのぐ。
     */
    public handlePropOnClick = (i: number) => () => {
        const c = new ChangeProperty();
        console.log('board argument', i);
        console.log('board', c.changeByMutating());
        console.log('board', c.changeByNotMutating());
        this.props.onClick(i);
    }
    /**
     * private メソッドは、public のメソッドのあとにくる
     * @param i
     */
    private renderSquare(i: number) {
        const cellHitted = () => {
            return !!this.props.winningPattern && this.props.winningPattern.filter((cell) => cell === i).length > 0;
        };

        const winningStyleName = cellHitted() ? 'game-set' : 'game-goes-on';
        return (
            <Square value={this.props.squares[i]}
                onClick={this.handlePropOnClick(i)}
                winningStyleName={winningStyleName}
            />
        );
    }
}

export default Board;
