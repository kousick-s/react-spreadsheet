import es6BindAll from '../../utils/es6BindAll';
import React, { Component } from 'react';
import Select from 'react-select';

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
      <Select className="selectcell" options={this.props.options}
        ref={function(self){
            if(isSelected && self != null) {
              self.focus();
            }
          }}
        onChange={this.handleChange}
        value={this.props.data}/>
    );
  }
}

export default SelectCell;