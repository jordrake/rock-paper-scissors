export class Grid {
  #cells = [];

  /**
   * @param {number} rows
   * @param {number} columns
   * @param {any} defaultValue
   */
  constructor(rows, columns, defaultValue) {
    for (let x = 0; x < rows; x++) {
      const row = [];
      for (let y = 0; y < columns; y++) {
        const cell = defaultValue;
        row.push(cell);
      }
      cells.push(row);
    }

    this.#cells = cells;
  }

  /**
   * Returns true if there is a cell at position x, y
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  exists(x, y) {
    return !!this.#cells[y] && this.#cells[y][x];
  }

  /**
   * Returns the value of the cell at position x, y
   * @param {number} x
   * @param {number} y
   * @returns {any}
   */
  at(x, y) {
    return this.#cells[y][x];
  }

  /**
   * Sets the value of the cell at position x, y
   * @param {number} x
   * @param {number} y
   * @param {any} value
   */
  place(x, y, value) {
    this.#cells[y][x] = value;
  }

  /**
   * @callback rowCallback
   * @param {number} y
   * @returns {cellCallback}
   */

  /**
   * @callback cellCallback
   * @param {number} x
   * @param {any} value
   */

  /**
   * Iterates over each row of the grid. The callback may return another callback which
   * will iterate over each cell in that row.
   *
   * @param {rowCallback} rowCallback
   */
  eachRow(rowCallback) {
    for (let y = 0; y < this.#cells.length; y++) {
      const cellCallback = rowCallback(y);

      if (cellCallback) {
        for (let x = 0; x < this.cells[y].length; x++) {
          cellCallback(x, this.at(x, y));
        }
      }
    }
  }

  /**
   * Iterates over each cell of the grid
   * @param {function(number, number, any)} callback
   */
  each(callback) {
    this.eachRow((y) => (x) => {
      callback(x, y, this.at(x, y));
    });
  }

  /**
   * Iterates over each cell of the grid, setting the value of that cell to the return value of the callback
   * @param {function(number, number, any)} callback
   */
  map(callback) {
    this.each((x, y, type) => {
      this.place(x, y, callback(x, y, type));
    });
  }
}
