import React, { Component } from 'react';
import {TIMESHEET_CODES} from '../../constants';
import SelectCell from './SelectCell';

class CodeCell extends Component {
  render() {
    return (
      <SelectCell {...this.props} options={TIMESHEET_CODES}/>
    )
  }
}

export default CodeCell;