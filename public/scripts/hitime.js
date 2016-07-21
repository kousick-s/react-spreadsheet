var workTypesDict = {
    5:"Client Meet",
    25:"Consulting",
    13:"Debug",
    6:"Demo",
    14:"Deployment",
    24:"Design",
    1:"Dev",
    17:"Documentation",
    29:"Email",
    28:"Finance",
    2:"Help",
    33:"Holiday",
    23:"Internal",
    9:"Interview",
    15:"Learning",
    4:"Meeting",
    16:"Mock up",
    26:"Onboarding",
    11:"OOO",
    10:"Other",
    8:"Planning",
    12:"PMO",
    21:"POC",
    32:"Pre-sales",
    18:"Presentation",
    31:"Proposals",
    27:"Recruitment",
    3:"Review",
    30:"Rework",
    7:"Scrum",
    20:"Testing",
    22:"Training",
    19: "UX"
};

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
          [1, "HASHEDIN-SALES", 4, 90, "Weekly Sales Meeting"],
          [2, "TECHNOLOGY", 6, 30, "Handling forms with React & Redux"],
          [300, "JICAN-SALES", 3, 10, "Presentation Review"]
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
    
    var viewModeRenderers = [IndexCell, ReadOnlyCell, 
                      WorkTypeCell, TimeSpentCell, ReadOnlyCell];
    var editModeRenderers = [IndexCell, CodeCell, 
                      WorkTypeCell, TimeSpentCell, TextCell];
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
})

var ReadOnlyCell = React.createClass({
  handleOnFocus: function(e) {
    var me = {"row": this.props.rownum, "col": this.props.colnum};
    this.props.onFocus(me, e);
  },
  render: function() {
    var props = this.props;
    var isSelected = props.isSelected;
    var className = isSelected ? "cell selected" : "cell";
    if (this.props.hasError) {
      className = className + " error";
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
})

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
          pattern={props.pattern}
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
        <Select className="selectcell" options={this.props.options}
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

var TimeSpentCell = React.createClass({
  render: function() {
    function parse(value) {
      return Math.floor(Number(value));
    }

    function toDisplayString(value) {
      var totalMinutes = parse(value);
      if (!totalMinutes) {
        return value;
      }

      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;
      var displayString = "";
      if (hours) {
        displayString = hours + "h";
      }
      if (minutes) {
        if(displayString) {
          displayString = displayString + " ";
        }
        displayString = displayString + minutes + "m";
      }
      return displayString;
    }

    var displayString = this.props.isEditMode ? this.props.data : toDisplayString(this.props.data);
    var myprops = Object.assign({}, this.props);
    myprops["data"] = displayString;
    myprops["pattern"] = "[0-9hmHM .:]";
    
    var hasError = !parse(this.props.data);
    myprops["hasError"] = hasError;

    var Renderer;
    if(this.props.isEditMode) {
      Renderer = TextCell;
    }
    else {
      Renderer = ReadOnlyCell;
    }
    return (
      <Renderer {...myprops}/>
    )
  }
})

var IndexCell = React.createClass({
  render: function() {
    var index = this.props.rownum + 1;
    var myprops = Object.assign({}, this.props, {"data": index});
    return (
      <ReadOnlyCell {...myprops}/>
    )
  }
})

var CodeCell = React.createClass({
  render: function() {
    return (
      <SelectCell {...this.props} options={codes}/>
    )
  }
})

var WorkTypeCell = React.createClass({
  render: function() {
    function toDisplayString(value) {
      if (value in workTypesDict) {
        return workTypesDict[value]
      }
      else {
        return "";
      }
    }

    var myprops;
    var Renderer;
    if(this.props.isEditMode) {
      myprops = this.props;
      Renderer = SelectCell;
    }
    else {
      myprops = Object.assign({}, 
            this.props, {"data": toDisplayString(this.props.data)});
      Renderer = ReadOnlyCell;
    }
    return <Renderer {...myprops} options={worktypes}/> 
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


var codes = [
{"value":"ACC-TREV-DEL","label":"ACC-TREV-DEL"},
    {"value":"ACME-SALES","label":"ACME-SALES"},
    {"value":"ARU-CCUI-DEL","label":"ARU-CCUI-DEL"},
    {"value":"ARUBA-SALES","label":"ARUBA-SALES"},
    {"value":"ARUBAUTO","label":"ARUBAUTO"},
    {"value":"BUZ-PLAT-DEL","label":"BUZ-PLAT-DEL"},
    {"value":"BUZ-PLAT-OPS","label":"BUZ-PLAT-OPS"},
    {"value":"BUZZTIME-SALES","label":"BUZZTIME-SALES"},
    {"value":"DBS-CDME-DEL","label":"DBS-CDME-DEL"},
    {"value":"DBS-SALES","label":"DBS-SALES"},
    {"value":"EOT","label":"EOT"},
    {"value":"ETRL","label":"ETRL"},
    {"value":"EXAMSOFT-SALES","label":"EXAMSOFT-SALES"},
    {"value":"EXM-BRDG-DEL","label":"EXM-BRDG-DEL"},
    {"value":"EZETAB-SALES","label":"EZETAB-SALES"},
    {"value":"EZE_WEBS_DEL","label":"EZE_WEBS_DEL"},
    {"value":"FRL-RELM-DEL","label":"FRL-RELM-DEL"},
    {"value":"FRROLE-SALES","label":"FRROLE-SALES"},
    {"value":"HASHEDIN","label":"HASHEDIN"},
    {"value":"HASHEDIN-SALES","label":"HASHEDIN-SALES"},
    {"value":"HIM_PRIM_DEL","label":"HIM_PRIM_DEL"},
    {"value":"HIN-DESN-DEL","label":"HIN-DESN-DEL"},
    {"value":"HIN-DOPS-DEL","label":"HIN-DOPS-DEL"},
    {"value":"HIN-HRRC-DEL","label":"HIN-HRRC-DEL"},
    {"value":"HIN-HUEX-DEL","label":"HIN-HUEX-DEL"},
    {"value":"HIN-HWAY-DEL","label":"HIN-HWAY-DEL"},
    {"value":"HIN-ITSU-DEL","label":"HIN-ITSU-DEL"},
    {"value":"HIN-MOM-DEL","label":"HIN-MOM-DEL"},
    {"value":"HIN-SSON-DEL","label":"HIN-SSON-DEL"},
    {"value":"HIN-SSON-OPS","label":"HIN-SSON-OPS"},
    {"value":"HIN-TRAK-DEL","label":"HIN-TRAK-DEL"},
    {"value":"HIN-WBST-DEL","label":"HIN-WBST-DEL"},
    {"value":"HIN-WBST-OPS","label":"HIN-WBST-OPS"},
    {"value":"HIVEMINDS-SALES","label":"HIVEMINDS-SALES"},
    {"value":"HONEYWELL-SALES","label":"HONEYWELL-SALES"},
    {"value":"HWL-EMBER-DEL","label":"HWL-EMBER-DEL"},
    {"value":"HWL-SSS-DEL","label":"HWL-SSS-DEL"},
    {"value":"HWL-USPL-DEL","label":"HWL-USPL-DEL"},
    {"value":"IDE-SWAI-DEL","label":"IDE-SWAI-DEL"},
    {"value":"IDERA-SALES","label":"IDERA-SALES"},
    {"value":"IDR-CW31-DEL","label":"IDR-CW31-DEL"},
    {"value":"IDR-DEDI-DEL","label":"IDR-DEDI-DEL"},
    {"value":"IND-MBLT-DEL","label":"IND-MBLT-DEL"},
    {"value":"INDEED-SALES","label":"INDEED-SALES"},
    {"value":"INSIDE-SALES","label":"INSIDE-SALES"},
    {"value":"JIC-FSVC-DEL","label":"JIC-FSVC-DEL"},
    {"value":"JICAN-SALES","label":"JICAN-SALES"},
    {"value":"KDT-DOPS-DEL","label":"KDT-DOPS-DEL"},
    {"value":"KickDrum-SALES","label":"KickDrum-SALES"},
    {"value":"MAX-MXDC-DEL","label":"MAX-MXDC-DEL"},
    {"value":"MAX-SALES","label":"MAX-SALES"},
    {"value":"NEXTIT-SALES","label":"NEXTIT-SALES"},
    {"value":"NIT-CHRT-DEL","label":"NIT-CHRT-DEL"},
    {"value":"NIT-DASH-DEV","label":"NIT-DASH-DEV"},
    {"value":"NIT-TEVD-DEL","label":"NIT-TEVD-DEL"},
    {"value":"NIT_REDU_DEL","label":"NIT_REDU_DEL"},
    {"value":"OCB-REPO-DEL","label":"OCB-REPO-DEL"},
    {"value":"OCBC-SALES","label":"OCBC-SALES"},
    {"value":"P4P-PARD-DEL","label":"P4P-PARD-DEL"},
    {"value":"P4P-PARD-OPS","label":"P4P-PARD-OPS"},
    {"value":"P4P-SALES","label":"P4P-SALES"},
    {"value":"PCL-UIUX-DEL","label":"PCL-UIUX-DEL"},
    {"value":"PCLOUDY-SALES","label":"PCLOUDY-SALES"},
    {"value":"PMO","label":"PMO"},
    {"value":"PRAGMATIC-SALES","label":"PRAGMATIC-SALES"},
    {"value":"PRD-PLFM-DEV","label":"PRD-PLFM-DEV"},
    {"value":"PREDICA-SALES","label":"PREDICA-SALES"},
    {"value":"PRG-APIN-DEL","label":"PRG-APIN-DEL"},
    {"value":"RHODIUM","label":"RHODIUM"},
    {"value":"STMicro-SALES","label":"STMicro-SALES"},
    {"value":"SYN-BIAN-DEL","label":"SYN-BIAN-DEL"},
    {"value":"SYNCRON-SALES","label":"SYNCRON-SALES"},
    {"value":"TDA-BATL-DEV","label":"TDA-BATL-DEV"},
    {"value":"TDABATTLEFD-SAL","label":"TDABATTLEFD-SAL"},
    {"value":"TECHNOLOGY","label":"TECHNOLOGY"},
    {"value":"VAL-OTCE-DEV","label":"VAL-OTCE-DEV"},
    {"value":"VALOROTCE-SALES","label":"OTC Engine"}
];

var worktypes = [
    {"value":"5","label":"Client Meet"},
    {"value":"25","label":"Consulting"},
    {"value":"13","label":"Debug"},
    {"value":"6","label":"Demo"},
    {"value":"14","label":"Deployment"},
    {"value":'24',"label":"Design"},
    {"value":"1","label":"Dev"},
    {"value":"17","label":"Documentation"},
    {"value":"29","label":"Email"},
    {"value":"28","label":"Finance"},
    {"value":"2","label":"Help"},
    {"value":"33","label":"Holiday"},
    {"value":"23","label":"Internal"},
    {"value":"9","label":"Interview"},
    {"value":"15","label":"Learning"},
    {"value":"4","label":"Meeting"},
    {"value":"16","label":"Mock up"},
    {"value":"26","label":"Onboarding"},
    {"value":"11","label":"OOO"},
    {"value":"10","label":"Other"},
    {"value":"8","label":"Planning"},
    {"value":"12","label":"PMO"},
    {"value":"21","label":"POC"},
    {"value":"32","label":"Pre-sales"},
    {"value":"18","label":"Presentation"},
    {"value":"31","label":"Proposals"},
    {"value":"27","label":"Recruitment"},
    {"value":"3","label":"Review"},
    {"value":"30","label":"Rework"},
    {"value":"7","label":"Scrum"},
    {"value":"20","label":"Testing"},
    {"value":"22","label":"Training"},
    {"value":"19","label":"UX"}
];

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

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

