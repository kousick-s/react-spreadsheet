import es6BindAll from '../../utils/es6BindAll';
import React, { Component } from 'react';
import ReadOnlyCell from './ReadOnlyCell';

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
      <input type="text" className="textcell"
        ref={function(self){
            if(isSelected && self != null) {
              self.focus();
            }
          }}
        onChange={this.handleChange}
        value={displayString}/>
    
      )
    }
    else {
      let myprops = Object.assign({}, this.props, {"data": displayString});
      return (<ReadOnlyCell {...myprops}/>)
    }
  }
}

export default TimeSpentCell;