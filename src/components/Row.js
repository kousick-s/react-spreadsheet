import React, { Component } from 'react';
import CodeCell from './cells/CodeCell';
import IndexCell from './cells/IndexCell';
import ReadOnlyCell from './cells/ReadOnlyCell';
import TextCell from './cells/TextCell';
import TimeSpentCell from './cells/TimeSpentCell';
import WorkTypeCell from './cells/WorkTypeCell';

class Row extends Component {
  render() {
    let props = this.props;
    
    let viewModeRenderers = [ReadOnlyCell, 
                      WorkTypeCell, TimeSpentCell, ReadOnlyCell];
    let editModeRenderers = [CodeCell, 
                      WorkTypeCell, TimeSpentCell, TextCell];
    let selectedCell = props.selectedCell;
    let rownum = props.rownum;

    return (
      <tr>
        <td className="cell"><IndexCell rownum={rownum}/></td>
        {this.props.data.map(function(cell, colnum){
          let isSelected = (rownum === selectedCell.row && 
              colnum === selectedCell.col);
          let isEditMode = isSelected && selectedCell.isEditMode;
          let className = isSelected ? "cell selected" : "cell";
          let me = {"row": rownum, "col": colnum};

          let Renderer;
          if(isEditMode) {
            Renderer = editModeRenderers[colnum];
          }
          else {
            Renderer = viewModeRenderers[colnum];
          }
          
          function handleCellClick(e) {
            props.onClick(me, e);
          }

          return (
            <td tabIndex="0" className={className}
              key={rownum + "-" + colnum}
              onClick={handleCellClick}
              ref={function(self){
                /*
                1. We want the cell to have focus if it is selected
                2. But if it is edit mode, then we want the control
                   inside the the td (i.e. Renderer) to have focus
                */

                if(!isEditMode && isSelected && self != null) {
                  self.focus();
                }
              }}
            >
              <Renderer data={cell} 
                rownum={rownum} colnum={colnum}
                isSelected={isSelected}
                isEditMode={isEditMode}
                onChange={props.onChange}/>
            </td>
            )
        })}
      </tr>
    )
  }
}

export default Row;