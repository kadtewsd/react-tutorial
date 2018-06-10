import * as React from 'react';
import './Square.css';

interface IProps {
    value: string | null;
    onClick: (i: number) => void;
}
interface IState {
    stateValue: string | null;
}
// React.Component<P, S> を extends したクラスを作成する
// https://qiita.com/kimamula/items/11873444e6a4df19df37
class Square extends React.Component<IProps, IState> {
    // you don't need constructor because there is no state..
    private onClickFromBoard: () => void;
    constructor(props: IProps) {
        // you need to explicitly call super(); when defining the constructor of a subclass.
        super(props);
        // state は board に入る
        // this.state = {
        //     stateValue: null,
        // };
        // パフォーマンスの問題上、bind はコンストラクタにて行う。
        this.onClickFromBoard = this.props.onClick.bind(this);
    }
    // ReactDOM.render だと引数は最低 2 つだが、クラスの中にいれば引数は return でコンポーネントを返せば良い。
    public render() {
        return (
            // 描画のたびに関数が生成され流ので、Lamda はパフォーマンス的に禁止されている。
            // Lambdas are forbidden in JSX attributes due
            // <button className='square' onClick={() => this.setState({value: 'X'})}>
            //
            // bind させないとエラーになってしまうが
            // Binds are forbidden in JSX attributes due to their rendering performance impact
            // onClick={this.props.onClick.bind(this)}>
            // 引数は Board クラスで設定されてくる。
            <button
                className='square'
                onClick={this.onClickFromBoard}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;
