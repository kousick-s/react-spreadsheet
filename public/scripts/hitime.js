if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

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
          [300, "Jican-Sales", "Review", 10, "Presentation Review"]
        ],
        "headerRow": ["#", "Code", "Type", "Time Spent", "Description"],
        "selectedCell": {
          "row": 0,
          "col": 0,
          "isEditMode": false
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
          selectedCell, {"isEditMode": false, "col": this.constrainHorizontally(selectedCell.col + direction)});
    this.setState({"selectedCell": newSelectedCell});
  },
  moveVertically: function(direction) {
    var selectedCell = this.state.selectedCell;
    var newSelectedCell = Object.assign({}, 
          selectedCell, {"isEditMode": false, "row": this.constrainVertically(selectedCell.row + direction)});
    this.setState({"selectedCell": newSelectedCell});
  },
  handleKeyDownCapture: function(e) {
    if (e.key === 'Escape') {
      //console.log(e);
      var selectedCell = Object.assign({}, this.state.selectedCell, {"isEditMode": false});
      this.setState({"selectedCell": selectedCell});
      e.preventDefault();
      e.stopPropagation();
    }
  },
  handleKeyDown: function(e) {
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
    //backspace or delete
    else if (e.keyCode === 8 || e.keyCode === 46) {
      if (!this.state.selectedCell.isEditMode) {
        this.clearCell();
        e.preventDefault();
      }
    }
    else if (isPrintableChar(e.keyCode)) {
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
  clearCell: function() {
    var data = this.state.data;
    var selectedCell = this.state.selectedCell;
    data[selectedCell.row][selectedCell.col] = "";
    this.setState({"data": data});
  },
  handleOnChange: function(cell, value) {
    /*TODO: okay to make inplace changes?*/
    var data = this.state.data;
    data[cell.row][cell.col] = value;
    this.setState({"data": data});
  },
  render: function() {
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
})

var SpreadSheet = React.createClass({
  render: function() {
    var props = this.props;
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
})
var Row = React.createClass({
  render: function() {
    var props = this.props;
    var renderers = [ReadOnlyCell, SelectCell, 
                      SelectCell, TextCell, TextCell];
    var selectedCell = props.selectedCell;
    var rownum = props.rownum;

    return (
      <tr>
        {this.props.data.map(function(cell, colnum){
          var isSelected = (rownum === selectedCell.row && 
              colnum === selectedCell.col);
          var isEditMode = isSelected && selectedCell.isEditMode;
          var Renderer;
          if(isEditMode) {
            Renderer = renderers[colnum];
          }
          else {
            Renderer = ReadOnlyCell;
          }

          return <Renderer data={cell} 
                  rownum={rownum} colnum={colnum}
                  key={rownum + "-" + colnum + isEditMode}
                  isSelected={isSelected}
                  isEditMode={isEditMode}
                  onClick={props.onClick}
                  onFocus={props.onFocus}
                  onChange={props.onChange}/>
        })}
      </tr>
    )
  }
})

var ReadOnlyCell = React.createClass({
  handleCellClick: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onClick(me, e);
  },
  handleOnFocus: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onFocus(me, e);
  },
  render: function() {
    var props = this.props;
    var isSelected = props.isSelected;
    var className = isSelected ? "cell selected" : "cell";
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
})

var options=[
    { value: 'Client Meet', label: 'Client Meet'},
    { value: 'Consulting', label: 'Consulting'},
    { value: 'Debug', label: 'Debug'},
    { value: 'Demo', label: 'Demo'},
    { value: 'Deployment', label: 'Deployment'},
    { value: 'Design', label: 'Design'},
    { value: 'Dev', label: 'Dev'},
    { value: 'Documentation', label: 'Documentation'},
    { value: 'Email', label: 'Email'},
    { value: 'Finance', label: 'Finance'},
    { value: 'Help', label: 'Help'},
    { value: 'Holiday', label: 'Holiday'},
    { value: 'Holiday', label: 'Holiday'},
    { value: 'Internal', label: 'Internal'},
    { value: 'Interview', label: 'Interview'},
    { value: 'Learning', label: 'Learning'},
    { value: 'Meeting', label: 'Meeting'},
    { value: 'Mock up', label: 'Mock up'},
    { value: 'Onboarding', label: 'Onboarding'},
    { value: 'OOO', label: 'OOO'},
    { value: 'Other', label: 'Other'},
    { value: 'Planning', label: 'Planning'},
    { value: 'PMO', label: 'PMO'},
    { value: 'POC', label: 'POC'},
    { value: 'Presales', label: 'Presales'},
    { value: 'Presentation', label: 'Presentation'},
    { value: 'Proposals', label: 'Proposals'},
    { value: 'Recruitment', label: 'Recruitment'},
    { value: 'Review', label: 'Review'},
    { value: 'Rework', label: 'Rework'},
    { value: 'Scrum', label: 'Scrum'},
    { value: 'Testing', label: 'Testing'},
    { value: 'Training', label: 'Training'},
    { value: 'UX', label: 'UX'}
];

var TextCell = React.createClass({
  onChange: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onChange(me, e.target.value);
  },
  render: function() {
    var props = this.props;
    var isSelected = props.isSelected;

    return (
      <td className="cell selected"
        onKeyDown={this.onKeyDown}>
        <input type="text" className="textcell"
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.onChange}
          value={this.props.data}/>
      </td>
    );
  }
})

var SelectCell = React.createClass({
  onChange: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onChange(me, e ? e.value: "");
  },
  render: function() {
    var props = this.props;
    var isSelected = props.isSelected;

    return (
      <td className="cell selected" 
        onKeyDownCapture={this.onKeyDown}>
        <Select className="selectcell" options={options}
          ref={function(self){
              if(isSelected && self != null) {
                self.focus();
              }
            }}
          onChange={this.onChange}
          value={this.props.data}/>
      </td>
    );
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

var isPrintableChar = function(keycode) {
  var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)
  return valid;
}