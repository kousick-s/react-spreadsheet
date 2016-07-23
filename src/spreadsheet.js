import React, { Component } from 'react';
import Select from 'react-select';
import './react-select.min.css';
import './spreadsheet.css';

import {TIMESHEET_CODES, WORKTYPES, WORKTYPES_DICT} from './constants';

function es6BindAll(context, methodNames) {
  // eslint-disable-next-line array-callback-return
  methodNames.map(function(methodName) {
    if (!(methodName in context)) {
      let e = new Error(methodName + " does not exist in " + context.constructor.name +
        ". Check the call to es6BindAll in " + context.constructor.name);
      throw e;
    }
    context[methodName] = context[methodName].bind(context);
  });
}

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

class SpreadSheetContainer extends Component {
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
      "handleOnFocus", "clearCell", "handleOnChange"]);
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
      let selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
      this.setState({"selectedCell": selectedCell});
    }
  }

  handleClick(clickedCell, e) {
    let selectedCell = Object.assign({}, this.state.selectedCell, clickedCell);
    selectedCell["isEditMode"] = true;
    this.setState({"selectedCell": selectedCell});
  }

  handleOnFocus(cell, e) {
    let selectedCell = Object.assign({}, this.state.selectedCell, cell);
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
        <SpreadSheet data={this.state.data} 
          headerRow={this.state.headerRow}
          selectedCell={this.state.selectedCell}
          onKeyDown={this.handleKeyDown}
          onKeyDownCapture={this.handleKeyDownCapture}
          onClick={this.handleClick}
          onFocus={this.handleOnFocus}
          onChange={this.handleOnChange}/>
    )
  }
}

class SpreadSheet extends Component {
  render() {
    let props = this.props;
    return (
      <table className="grid"
        onKeyDown={this.props.onKeyDown}
        onKeyDownCapture={this.props.onKeyDownCapture}>
        <colgroup>
          <col className="id"/>
          <col className="code"/>
          <col className="type"/>
          <col className="time"/>
          <col className="description"/>
        </colgroup>
        <thead>
        <tr>
          <th>#</th>
          {props.headerRow.map(function(cell, colnum){
            return <th key={colnum}>{cell}</th>
          })}
        </tr>
        </thead>
        <tbody>
          {props.data.map(function(row, rownum){
            return <Row data={row} rownum={rownum}
                    key={rownum}
                    selectedCell={props.selectedCell}
                    onClick={props.onClick}
                    onFocus={props.onFocus}
                    onChange={props.onChange}/>
          })}
        </tbody>
      </table>
    )
  }
}

class ReadOnlyCell extends Component {
  constructor() {
    super();
    es6BindAll(this, ["handleOnFocus"]);
  }
  handleOnFocus(e) {
    let me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onFocus(me, e);
  }

  render() {
    let props = this.props;
    let isSelected = props.isSelected;
    let className = isSelected ? "cell selected" : "cell";
    if (this.props.hasError) {
      className += " error";
    }

    return (
      <td tabIndex="0" className={className}
        onClick={this.handleCellClick}
        onFocus={this.handleOnFocus}
        ref={function(self){
          if(isSelected && self != null) {
            self.focus();
          }
        }}>
        {this.props.data}
      </td>
    );
  }
}

class TextCell extends Component {
  constructor() {
    super();
    es6BindAll(this, ["handleChange"]);
  }

  handleChange(e) {
    let me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onChange(me, e.target.value);
  }

  render() {
    let props = this.props;
    let isSelected = props.isSelected;

    return (
      <td className="cell selected">
        <input type="text" className="textcell"
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.handleChange}
          value={this.props.data}/>
      </td>
    );
  }
}

class SelectCell extends Component {
  constructor() {
    super();
    es6BindAll(this, ["handleChange"]);
  }
  handleChange(e) {
    let me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onChange(me, e ? e.value: "");
  }

  render() {
    let props = this.props;
    let isSelected = props.isSelected;

    return (
      <td className="cell selected">
        <Select className="selectcell" options={this.props.options}
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.handleChange}
          value={this.props.data}/>
      </td>
    );
  }
}

class TimeSpentCell extends Component {
  constructor() {
    super();
    es6BindAll(this, ["handleChange"]);
  }
  handleChange(e) {
    let me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onChange(me, e.target.value);
  }

  render() {
    function parse(value) {
      return Math.floor(Number(value));
    }

    function toDisplayString(value) {
      let totalMinutes = parse(value);
      if (!totalMinutes) {
        return value;
      }

      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;
      let displayString = "";
      if (hours) {
        displayString = hours + "h";
      }
      if (minutes) {
        if(displayString) {
          displayString += " ";
        }
        displayString += minutes + "m";
      }
      return displayString;
    }

    let displayString = this.props.isEditMode ? this.props.data : toDisplayString(this.props.data);
    let isSelected = this.props.isSelected;
    
    if(this.props.isEditMode) {
      return (
      <td className="cell selected">
        <input type="text" className="textcell"
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.handleChange}
          value={displayString}/>
      </td>
      )
    }
    else {
      let myprops = Object.assign({}, this.props, {"data": displayString});
      return (<ReadOnlyCell {...myprops}/>)
    }
  }
}

class IndexCell extends Component {
  render() {
    return (
      <td className="cell">
        {this.props.rownum + 1}
      </td>
    );
  }
}

class CodeCell extends Component {
  render() {
    return (
      <SelectCell {...this.props} options={TIMESHEET_CODES}/>
    )
  }
}

class WorkTypeCell extends Component {
  render() {
    function toDisplayString(value) {
      if (value in WORKTYPES_DICT) {
        return WORKTYPES_DICT[value]
      }
      else {
        return "";
      }
    }

    let myprops;
    let Renderer;
    if(this.props.isEditMode) {
      myprops = this.props;
      Renderer = SelectCell;
    }
    else {
      myprops = Object.assign({}, 
            this.props, {"data": toDisplayString(this.props.data)});
      Renderer = ReadOnlyCell;
    }
    return <Renderer {...myprops} options={WORKTYPES}/> 
  }
}

class Row extends Component {
  render() {
    let props = this.props;
    
    let viewModeRenderers = [ReadOnlyCell, 
                      WorkTypeCell, TimeSpentCell, ReadOnlyCell];
    let editModeRenderers = [CodeCell, 
                      WorkTypeCell, TimeSpentCell, TextCell];
    let selectedCell = props.selectedCell;
    let rownum = props.rownum;

    return (
      <tr>
        <IndexCell rownum={rownum}/>
        {this.props.data.map(function(cell, colnum){
          let isSelected = (rownum === selectedCell.row && 
              colnum === selectedCell.col);
          let isEditMode = isSelected && selectedCell.isEditMode;
          let Renderer;
          if(isEditMode) {
            Renderer = editModeRenderers[colnum];
          }
          else {
            Renderer = viewModeRenderers[colnum];
          }

          return <Renderer data={cell} 
                  rownum={rownum} colnum={colnum}
                  key={rownum + "-" + colnum}
                  isSelected={isSelected}
                  isEditMode={isEditMode}
                  onClick={props.onClick}
                  onFocus={props.onFocus}
                  onChange={props.onChange}/>
        })}
      </tr>
    )
  }
}

export default SpreadSheetContainer;