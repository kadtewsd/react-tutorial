class Judge {

    public calculateWinner(squares: Array<string | null>) {
        const winnings = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (const winning of winnings) {
          if (squares[winning[0]] &&
            squares[winning[0]] === squares[winning[1]] &&
            squares[winning[0]] === squares[winning[2]]) {
            return squares[winning[0]];
          }
        }
        return null;
    }
}

export default Judge;
