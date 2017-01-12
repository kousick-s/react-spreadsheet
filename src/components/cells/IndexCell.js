import React, { Component } from 'react';

class IndexCell extends Component {
  render() {
    return (
      <span>{this.props.rownum + 1}</span>
    );
  }
}

export default IndexCell;