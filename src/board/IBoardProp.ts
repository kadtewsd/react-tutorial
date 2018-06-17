interface IBoardState {
    // null 許容にしたいので、Array で宣言
    // squares: Array<string | null>;
    squares: any;
    // xIsNext: boolean;
    onClick: (i: number) => void;
    // 勝利したマス目のパターン
    winningPattern: number[] | null;
}
export default IBoardState;
