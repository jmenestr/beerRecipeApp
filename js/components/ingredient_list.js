var React = require('react');
var IngredientItem = require('./ingredient_item');


// Ingredient List takes the following props 
// type: Type of ingredient (ie. Hops, Yeast, etc)
// ingredients: An arrray of ingredients of the type listed above
// readOnly: Boolean -- True signifies it's only a list of ingredients, false
//    means items can be deleted and there's an add ingredient link
//  handleClick: if not readOnly, handles adding new ingredients to list 
//  handleDelete: if not readOnly, handles removing ingredients from list
module.exports = IngredientList = React.createClass({

  _renderItem: function() {
    var addIngredient, Ingredient;
    if (!this.props.readOnly) {
      // Editable State with handelers 
      addIngredient = (
        <div className='add-ingredient'>
            <a onClick={this.props.handleClick.bind(null, this.props.type)}>
              <i className="fa fa-search"></i>
              Add {this.props.type}
            </a>
          </div>
          );
      Ingredient = (
        <div>
          {
            this.props.ingredients.map(function(ing){
              return <IngredientItem 
                      key={ing.name} 
                      type={this.props.type}
                      ingredient={ing} 
                      readOnly={this.props.readOnly}
                      handleAmountChange={this.props.handleAmountChange}
                      handleDelete={this.props.handleDelete.bind(null, this.props.type, ing)} />
              }.bind(this))}
        </div>
        );

    } else {
      //ReadOnly state without handelers 
      addIngredient = ("");
      Ingredient = (
        <div>
          {
            this.props.ingredients.map(function(ing){
              return <IngredientItem key={ing.name} 
                      type={this.props.type}
                      ingredient={ing} 
                      handleDelete={false} />
              }.bind(this))}
        </div>
        );
    }
    return {addIngredient: addIngredient, Ingredient: Ingredient};
  },

  render: function() {
    var item = this._renderItem();
    return (
      <div className='ingredient-list'>
        <div>
          <h3>{this.props.type}</h3>
          {item.addIngredient}
        </div>
        {item.Ingredient}
      </div>
      );
  }
})