class Judge {

    public calculateWinner(squares: Array<string | null>) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (const line of lines) {
          if (squares[line[0]] &&
            squares[line[0]] === squares[line[1]] &&
            squares[line[0]] === squares[line[2]]) {
            return squares[line[0]];
          }
        }
        return null;
    }
}

export default Judge;
