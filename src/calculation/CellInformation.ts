/**
 * 現在の cell の情報を返します。
 */
class CellInformation {
    public readonly cellIndex: number;
    public readonly row: number;
    constructor(cell: number) {
        this.cellIndex = cell;
        this.row = this.rowIndex();
    }
    private rowIndex(): number {
        const rowInformation = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const recursive = (i: number): number => {
            const current = rowInformation[i];
            const results = current.filter((x) => x === this.cellIndex);
            if (results.length === 0) {
                return recursive(++i);
            }
            return i;
        };
        return recursive(0);
    }
}
export default CellInformation;
