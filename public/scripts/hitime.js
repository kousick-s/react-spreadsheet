var TimeSheetSummary = function(props) {
  return (
    <div>
      <h1>Timesheet for {props.username}</h1>
    </div>
  )
}

var SpreadSheetContainer = React.createClass({
  getInitialState: function() {
    return {
        "data": [
          [1, "HashedIn", "Sales", 90, "Weekly Sales Meeting", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [2, "Technology", "Training", 30, "Handling forms with React & Redux", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"]
        ],
        "headerRow": ["#", "Code", "Type", "Time Spent", "Description", "dog", "cat", "elephant", "turkey", "monkey", "leopard", "lion", "tiger", "~!@#$%^&*()_+=;':,.<>/?", "brinjal", "aubergine", 4343.32, "whiteboard", "tv", "video", "audio"],
        "selectedCell": {
          "row": 1,
          "col": 2,
          "isEditMode": true
        }
    }
  },
  moveRight: function() {
    this.moveHorizontally(1);
  },
  moveLeft: function() {
    this.moveHorizontally(-1);
  },
  moveUp: function() {
    this.moveVertically(-1);
  },
  moveDown: function() {
    this.moveVertically(1);
  },
  addRows: function(numRows) {
    var data = this.state.data;
    data.push(["", "", "", "", ""]);
    this.setState({"data": data});
  },
  constrainHorizontally: function(pos) {
    var newPos;
    var numColumns = this.state.headerRow.length;
    if (pos > numColumns - 1) {
      newPos = numColumns - 1;
    }
    else if (pos < 0) {
      newPos = 0;
    }
    else {
      newPos = pos;
    }
    return newPos;
  },
  constrainVertically: function(pos) {
    var newPos;
    var numRows = this.state.data.length;
    if (pos > numRows - 1) {
      this.addRows(pos - numRows + 1);
      newPos = pos;
    }
    else if (pos < 0) {
      newPos = 0;
    }
    else {
      newPos = pos;
    }
    return newPos;
  },
  moveHorizontally: function(direction) {
    var selectedCell = this.state.selectedCell;
    var newSelectedCell = Object.assign({}, 
          selectedCell, {"col": this.constrainHorizontally(selectedCell.col + direction)});
    this.setState({"selectedCell": newSelectedCell});
  },
  moveVertically: function(direction) {
    var selectedCell = this.state.selectedCell;
    var newSelectedCell = Object.assign({}, 
          selectedCell, {"row": this.constrainVertically(selectedCell.row + direction)});
    this.setState({"selectedCell": newSelectedCell});
  },
  handleKeyDown: function(selectedCell, e) {
    if (e.key === 'ArrowRight') {
      if (!this.state.selectedCell.isEditMode) {
        this.moveRight();
        e.preventDefault();
      }
    }
    else if (e.key === 'ArrowLeft') {
      if (!this.state.selectedCell.isEditMode) {
        this.moveLeft();
        e.preventDefault();
      }
    }
    else if (e.key === 'ArrowUp') {
      this.moveUp();
      e.preventDefault();
    }
    else if (e.key === 'ArrowDown') {
      this.moveDown();
      e.preventDefault();
    }
    else if (e.key === 'Escape') {
      var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": false});
      this.setState({"selectedCell": selectedCell});
      e.preventDefault();
    }
    //enter
    else if (e.keyCode === 13) {
      if (!this.state.selectedCell.isEditMode) {
        var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
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
    else {
      var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
      this.setState({"selectedCell": selectedCell});
    }
  },
  handleClick: function(clickedCell, e) {
    var selectedCell = Object.assign({}, this.state.selectedCell, clickedCell);
    selectedCell["isEditMode"] = true;
    this.setState({"selectedCell": selectedCell});
  },
  handleOnFocus: function(cell, e) {
    var selectedCell = Object.assign({}, this.state.selectedCell, cell);
    this.setState({"selectedCell": selectedCell});
  },
  handleOnChange: function(cell, e) {
    /*TODO: okay to make inplace changes?*/
    var data = this.state.data;
    data[cell.row][cell.col] = e.target.value;
    this.setState({"data": data});
  },
  render: function() {
    return (
        <SpreadSheet data={this.state.data} 
          headerRow={this.state.headerRow}
          selectedCell={this.state.selectedCell}
          onKeyDown={this.handleKeyDown}
          handleClick={this.handleClick}
          handleOnFocus={this.handleOnFocus}
          handleOnChange={this.handleOnChange}/>
    )
  }
})

var SpreadSheet = React.createClass({
  render: function() {
    var props = this.props;
    return (
      <table className="grid">
        <thead>
        <tr>
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
                    onKeyDown={props.onKeyDown}
                    handleClick={props.handleClick}
                    handleOnFocus={props.handleOnFocus}
                    handleOnChange={props.handleOnChange}/>
          })}
        </tbody>
      </table>
    )
  }
})
var Row = React.createClass({
  render: function() {
    var props = this.props;
    return (
      <tr>
        {this.props.data.map(function(cell, colnum){
          return <Cell data={cell} 
                  rownum={props.rownum} colnum={colnum}
                  key={props.rownum + "-" + colnum}
                  selectedCell={props.selectedCell}
                  onKeyDown={props.onKeyDown}
                  handleClick={props.handleClick}
                  handleOnFocus={props.handleOnFocus}
                  handleOnChange={props.handleOnChange}/>
        })}
      </tr>
    )
  }
})

var Cell = React.createClass({
  handleKeyDown: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onKeyDown(me, e);
  },
  handleCellClick: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.handleClick(me, e);
  },
  handleOnFocus: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.handleOnFocus(me, e);
  },
  handleOnChange: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.handleOnChange(me, e);
  },
  render: function() {
    var props = this.props;
    var selectedCell = props.selectedCell;
    var isSelected = (props.rownum === selectedCell.row && 
              props.colnum === selectedCell.col);
    var isEditMode = isSelected && selectedCell.isEditMode;
    var className = isSelected ? "cell selected" : "cell";

    var cell;
    if (isEditMode) {
      cell = (
        <td className={className} 
          onKeyDown={this.handleKeyDown}
          onClick={this.handleCellClick}>
        <input type="text" 
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.handleOnChange}
          value={this.props.data}/>
      </td>
      )
    }
    else {
      cell = (
        <td tabIndex="0" className={className}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleCellClick}
          onFocus={this.handleOnFocus}
          ref={function(self){
            if(isSelected && self != null) {
              self.focus();
            }
          }}>
          {this.props.data}
        </td>
      )
    }
    return cell;
  }
})

var HiTime = React.createClass({
  render: function() {
    return (
      <div>
        <TimeSheetSummary username="Sripathi.Krishnan"/>
        <SpreadSheetContainer/>
      </div>
    );
  }
});


ReactDOM.render(
  <HiTime />,
  document.getElementById('content')
);
