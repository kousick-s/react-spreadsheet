import React, { Component } from 'react';
import SpreadSheetWidget from './SpreadSheetWidget';
import '../react-select.min.css';
import '../spreadsheet.css';
import es6BindAll from '../utils/es6BindAll';


function isPrintableChar(keycode) {
  let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode === 32 || keycode === 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)
  return valid;
}

class SpreadSheet extends Component {
  constructor() {
    super();
    this.state = {
        "data": [
          ["HASHEDIN-SALES", 4, 90, "Weekly Sales Meeting"],
          ["TECHNOLOGY", 6, 30, "Handling forms with React & Redux"],
          ["JICAN-SALES", 3, 10, "Presentation Review"]
        ],
        "headerRow": ["Code", "Type", "Time Spent", "Description"],
        "selectedCell": {
          "row": 0,
          "col": 0,
          "isEditMode": false
        }
    }

    es6BindAll(this, ["numRows", "numColumns", "moveRight", "moveLeft",
      "moveUp", "moveDown", "addRows", 
      "constrainHorizontally", "constrainVertically",
      "moveHorizontally", "moveVertically",
      "handleKeyDown", "handleKeyDownCapture", "handleClick",
      "clearCell", "handleOnChange"]);
  }

  numRows() {
    return this.state.data.length;
  }

  numColumns() {
    return this.state.headerRow.length + 1;
  }

  moveRight() {
    this.moveHorizontally(1);
  }

  moveLeft() {
    this.moveHorizontally(-1);
  }

  moveUp() {
    this.moveVertically(-1);
  }

  moveDown() {
    this.moveVertically(1);
  }

  addRows(numRows) {
    let data = this.state.data;
    data.push(["", "", "", ""]);
    this.setState({"data": data});
  }

  constrainHorizontally(pos) {
    let newPos;
    let numColumns = this.state.headerRow.length;
    if (pos > (numColumns - 1)) {
      newPos = numColumns - 1;
    }
    else if (pos < 0) {
      newPos = 0;
    }
    else {
      newPos = pos;
    }
    return newPos;
  }

  constrainVertically(pos) {
    let newPos;
    let numRows = this.state.data.length;
    if (pos > (numRows - 1)) {
      this.addRows(pos - (numRows - 1));
      newPos = pos;
    }
    else if (pos < 0) {
      newPos = 0;
    }
    else {
      newPos = pos;
    }
    return newPos;
  }

  moveHorizontally(direction) {
    let selectedCell = this.state.selectedCell;
    let newSelectedCell = Object.assign({}, 
          selectedCell, {"isEditMode": false, "col": this.constrainHorizontally(selectedCell.col + direction)});
    this.setState({"selectedCell": newSelectedCell});
  }

  moveVertically(direction) {
    let selectedCell = this.state.selectedCell;
    let newSelectedCell = Object.assign({}, 
          selectedCell, {"isEditMode": false, "row": this.constrainVertically(selectedCell.row + direction)});
    this.setState({"selectedCell": newSelectedCell});
  }

  handleKeyDownCapture(e) {
    if (e.key === 'Escape') {
      let selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": false});
      this.setState({"selectedCell": selectedCell});
      e.preventDefault();
      e.stopPropagation();
    }
  }

  handleKeyDown(e) {
    if (!this.state.selectedCell.isEditMode) {
      if (e.key === 'ArrowRight') {
        this.moveRight();
        e.preventDefault();
      }
      else if (e.key === 'ArrowLeft') {
        this.moveLeft();
        e.preventDefault();
      }
      else if (e.key === 'ArrowUp') {
        this.moveUp();
        e.preventDefault();
      }
      else if (e.key === 'ArrowDown') {
        this.moveDown();
        e.preventDefault();
      }
    }
    //enter
    if (e.keyCode === 13) {
      if (!this.state.selectedCell.isEditMode) {
        let selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
        this.setState({"selectedCell": selectedCell});
        e.preventDefault();
      }
      else {
        this.moveDown();
      }
    }
    //tab
    else if (e.keyCode === 9) {
      if (e.shiftKey) {
        this.moveLeft();
      }
      else {
       this.moveRight(); 
      }
      e.preventDefault();
    }
    //backspace or delete
    else if (e.keyCode === 8 || e.keyCode === 46) {
      if (!this.state.selectedCell.isEditMode) {
        this.clearCell();
        e.preventDefault();
      }
    }
    else if (isPrintableChar(e.keyCode)) {
      if(!this.state.selectedCell.isEditMode) {
        let selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
        let data = this.state.data;
        data[selectedCell.row][selectedCell.col] = "";
        this.setState({"data": data, "selectedCell": selectedCell});
      }
    }
  }

  handleClick(clickedCell, e) {
    let selectedCell = Object.assign({}, this.state.selectedCell, clickedCell);
    selectedCell["isEditMode"] = true;
    this.setState({"selectedCell": selectedCell});
  }

  clearCell() {
    let data = this.state.data;
    let selectedCell = this.state.selectedCell;
    data[selectedCell.row][selectedCell.col] = "";
    this.setState({"data": data});
  }

  handleOnChange(cell, value) {
    /*TODO: okay to make inplace changes?*/
    let data = this.state.data;
    data[cell.row][cell.col] = value;
    this.setState({"data": data});
  }
  
  render() {
    return (
        <SpreadSheetWidget data={this.state.data} 
          headerRow={this.state.headerRow}
          selectedCell={this.state.selectedCell}
          onKeyDown={this.handleKeyDown}
          onKeyDownCapture={this.handleKeyDownCapture}
          onClick={this.handleClick}
          onChange={this.handleOnChange}/>
    )
  }
}

export default SpreadSheet;