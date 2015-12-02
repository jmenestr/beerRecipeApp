var React = require('react');
module.exports = Ingredient = React.createClass({

  _renderIngredient: function() {
    var amountRender = (!!this.props.handleAmountChange) ? this._renderAmountSelect() : this._renderAmount();
    return (
    <div className='ingredient-item'>
      <div className='ingredient-header'> 
        <h4>{this.props.ingredient.name}</h4>    
        {this._renderDeleteButton()} 
      </div>
      <div className='ingredient-form'>
        {amountRender}
      </div>
  
    </div>
    );
  },

  _renderAmountSelect: function() {
    var options = ['lb', 'oz', 'g'];
    //Render Selection if editable (by checking if amountChange function is undefined)
    return (
        <div className='amount'>
          <label>Amount: </label>
          <input onChange={this._handleAmountChange} type='text' />
          <select onChange={this._handleUnitChange}>
            {options.map(function(op){
              return <option  key={op} value={op}>{op}</option>
            })}
          </select>
        </div>
      );
  },

  _renderAmount: function() {
    return (
        <div className='amount'>
          <p>Amount: {this.props.ingredient.amount} {this.props.ingredient.unit} </p>
        </div>
      );
  },

  _handleUnitChange: function(e) {
    this.props.handleAmountChange.call(null, e, this.props.ingredient, { amount: false, unit: true })
  },

  _handleAmountChange: function(e) {
    this.props.handleAmountChange.call(null, e, this.props.ingredient, { amount: true, unit: false })
  },

  _renderDeleteButton: function() {
    var button = (!!this.props.handleDelete) ? 
    <button onClick={this.props.handleDelete} className='fade remove warning'>X</button> : "";
    return button;
  },

  render: function() {
    return (this._renderIngredient())
  }
})