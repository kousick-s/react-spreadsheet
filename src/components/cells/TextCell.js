import es6BindAll from '../../utils/es6BindAll';
import React, { Component } from 'react';

class TextCell extends Component {
  constructor() {
    super();
    es6BindAll(this, ["handleChange"]);
  }

  handleChange(e) {
    let me = {"row": this.props.rownum, "col": this.props.colnum};
    console.log(e, me);
    this.props.onChange(me, e.target.value);
  }

  render() {
    let props = this.props;
    let isSelected = props.isSelected;

    return (
      <input type="text" className="textcell"
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

export default TextCell;