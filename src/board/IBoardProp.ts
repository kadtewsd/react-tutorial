interface IBoardState {
    // null 許容にしたいので、Array で宣言
    // squares: Array<string | null>;
    squares: any;
    // xIsNext: boolean;
    onClick: (i: number) => void;
}
export default IBoardState;
