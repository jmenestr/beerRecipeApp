var React = require('react');


module.exports = Errors = React.createClass({

  _renderErrors: function() {
    return (
      <div className='errors'>
        <ul>
        // Generate errors list based on props.errors
          {this.props.errors.map(function(error){
            return (<li key={error}>{error}</li>);
          })}
        </ul>
      </div>
      );
  },


  render: function() {
    var errors = 
      (this.props.errors.length == 0) ? "" : this._renderErrors();
      return (<div>{errors}</div>);
  }
})