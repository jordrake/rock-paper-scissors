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

  map(callback) {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        this.cells[y][x] = callback(x, y, this.cells[y][x]);
      }
    }
  }

  each(callback) {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        callback(x, y, this.cells[y][x]);
      }
    }
  }

  eachRow(rowCallback) {
    for (let y = 0; y < this.cells.length; y++) {
      const cellCallback = rowCallback(y);

      for (let x = 0; x < this.cells[y].length; x++) {
        cellCallback(x, this.cells[y][x]);
      }
    }
  }
}
