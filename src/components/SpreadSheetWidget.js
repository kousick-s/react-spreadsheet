import React, { Component } from 'react';
import Row from './Row';

class SpreadSheetWidget extends Component {
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
                    onChange={props.onChange}/>
          })}
        </tbody>
      </table>
    )
  }
}

export default SpreadSheetWidget;