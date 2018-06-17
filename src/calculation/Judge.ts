class Judge {

  public calculateWinner(squares: Array<string | null>): { winning: number[], winner: string | null } | null {

    for (const winning of this.winningCondition()) {
      if (squares[winning[0]] &&
        squares[winning[0]] === squares[winning[1]] &&
        squares[winning[0]] === squares[winning[2]]) {
        // X か O が返る
        return {
          winning,
          winner: squares[winning[0]],
        };
      }
    }
    return null;
  }

  public calculateDraw(squares: Array<string | null>): boolean {
    if (this.calculateWinner(squares)) {
      return false;
    }
    const cellOver = 9;
    const recursive = (current: number): boolean => {
      if (cellOver === current) {
        return true;
      }
      if (squares[current] === null) {
        return false;
      } else {
        return recursive(++current);
      }
    };
    return recursive(0);
  }
  /**
   * 勝利条件を生成します。
   * 縦、横、斜めでかつ条件を生成します。
   */
  private winningCondition(): number[][] {
    const horizontal: number[][] = [];
    const horizontalFn = (current: number): number[][] => {
      if (current === 9) {
        return horizontal;
      }
      let start = current;
      horizontal.push([start, ++start, ++start]);
      return horizontalFn(current + 3);
    };
    const vertical: number[][] = [];
    const verticalFn = (current: number): number[][] => {
      if (current === 3) {
        return vertical;
      }
      vertical.push([current, current + 3, current + 6]);
      return verticalFn(++current);
    };
    const slanting: number[][] = [];
    const slantingFn = (current: number): number[][] => {
      if (current === 4) {
        return slanting;
      }
      const cornerSummary = 8;
      const end = cornerSummary - current;
      slanting.push([current, cornerSummary / 2, end]);
      return slantingFn(current + 2);
    };
    return horizontalFn(0).concat(
      verticalFn(0).concat(
        slantingFn(0),
      ));
  }
}

export default Judge;
