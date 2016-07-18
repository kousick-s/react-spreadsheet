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
          [1, "HashedIn", "Sales", 90, "Weekly Sales Meeting"],
          [2, "Technology", "Training", 30, "Handling forms with React & Redux"],
          [3, "Jican-Sales", "Review", 10, "Presentation Review"]
        ],
        "headerRow": ["#", "Code", "Type", "Time Spent", "Description"],
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
  moveHorizontally: function(direction) {
    var selectedCell = this.state.selectedCell;
    var newSelectedCell = Object.assign({}, 
          selectedCell, {"col": selectedCell.col + direction});
    this.setState({"selectedCell": newSelectedCell});
  },
  moveVertically: function(direction) {
    var selectedCell = this.state.selectedCell;
    var newSelectedCell = Object.assign({}, 
          selectedCell, {"row": selectedCell.row + direction});
    this.setState({"selectedCell": newSelectedCell});
  },
  handleKeyDown: function(selectedCell, e) {
    if (!this.state.selectedCell.isEditMode) {
      if (e.key === 'ArrowRight') {
        this.moveRight();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        this.moveLeft();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        this.moveUp();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        this.moveDown();
        e.preventDefault();
      }
    }
    if (e.key === 'Escape') {
      var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": false});
      this.setState({"selectedCell": selectedCell});
      e.preventDefault();
    }
    else if (e.keyCode === 13) {
      var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": true});
      this.setState({"selectedCell": selectedCell});
      e.preventDefault();
    }
  },
  handleClick: function(clickedCell, e) {
    var selectedCell = Object.assign({}, this.state.selectedCell, clickedCell);
    this.setState({"selectedCell": selectedCell});
  },
  render: function() {
    return (
        <SpreadSheet data={this.state.data} 
          headerRow={this.state.headerRow}
          selectedCell={this.state.selectedCell}
          onKeyDown={this.handleKeyDown}
          handleClick={this.handleClick}/>
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
                    handleClick={props.handleClick}/>
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
                  handleClick={props.handleClick}/>
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
          value={this.props.data}/>
      </td>
      )
    }
    else {
      cell = (
        <td tabIndex="0" className={className}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleCellClick}
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
