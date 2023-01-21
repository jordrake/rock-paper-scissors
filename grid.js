export class Grid {
  constructor(rows, columns, defaultValue) {
    const cells = [];
    for (let x = 0; x < rows; x++) {
      const row = [];
      for (let y = 0; y < columns; y++) {
        const cell = defaultValue;
        row.push(cell);
      }
      cells.push(row);
    }

    this.cells = cells;
  }

  exists(x, y) {
    return !!this.cells[y] && this.cells[y][x];
  }

  at(x, y) {
    return this.cells[y][x];
  }

  place(x, y, value) {
    this.cells[y][x] = value;
  }

  eachRow(rowCallback) {
    for (let y = 0; y < this.cells.length; y++) {
      const cellCallback = rowCallback(y);

      for (let x = 0; x < this.cells[y].length; x++) {
        cellCallback(x, this.at(x, y));
      }
    }
  }

  each(callback) {
    this.eachRow((y) => (x) => {
      callback(x, y, this.at(x, y));
    });
  }

  map(callback) {
    this.each((x, y, type) => {
      this.place(x, y, callback(x, y, type))
    });
  }
}
