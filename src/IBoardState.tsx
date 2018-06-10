interface IBoardState {
    // null 許容にしたいので、Array で宣言
    squares: Array<string | null>;
    xIsNext: boolean;
    // squares: string[];
}
export default IBoardState;
