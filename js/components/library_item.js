var React = require('react');


module.exports = LibraryItem = React.createClass({
  render: function() {
    var check = this.props.checked ?  "fa-check-square-o" : "fa-square-o";
    return (
      <div className='item' onClick={this.props.handleClick}>
          <div className='add'><i className={"fa " + check}></i></div>
          <div className='name fade warning'>{this.props.name}</div>
      </div>    
      );
  }

});