import * as React from 'react';
import './FirstClass.css';
import Game from './Game';
import IProp from './IProp';

class FirstClass extends React.Component<IProp> {
    public render() {
        return (
            <div>
                <h1>Hello React World! {this.props.name}</h1>
                <div className='shopping-list'>
                    <h1>shopping list</h1>
                    <ul>
                        <li>instagram</li>
                        <li>Hololens</li>
                        <li>Oculas</li>
                    </ul>
                </div>
                <div className='centering'>
                <Game xIsNext={true} />
                </div>
            </div>
        );
    }
}
// 1 ファイルに 1 クラスの時は default のエクスポートが必要
export default FirstClass;
