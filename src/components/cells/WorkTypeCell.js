import React, { Component } from 'react';
import {WORKTYPES, WORKTYPES_DICT} from '../../constants';
import ReadOnlyCell from './ReadOnlyCell';
import SelectCell from './SelectCell';

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

export default WorkTypeCell;