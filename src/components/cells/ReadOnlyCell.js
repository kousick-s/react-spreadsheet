import React, { Component } from 'react';

class ReadOnlyCell extends Component {
  render() {
    return (
      <span>{this.props.data}</span>
      
    );
  }
}

export default ReadOnlyCell;