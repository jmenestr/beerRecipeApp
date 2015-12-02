var React = require('react');
var IngredientList = require('./ingredient_list');
var IngredientLibrary = require('./ingredient_library');
var RecipeSaved = require('./recipe_saved');
var Errors = require('./errors');
var LinkedState = require('react-addons-linked-state-mixin');

module.exports = BeerRecipe = React.createClass({
  mixins: [LinkedState],
  getInitialState: function() {
    return ({
      name: "",
      type: "",
      style: "",
      hops: [],
      yeast: [],
      extras: [],
      fermentables: [],
      errors: [],
      modal: false
    })
  },

  componenetDidMount: function() {
    this.modal = "";
  },

  _renderFormFields: function() {
          return (
          <div className='about'>
            <h2>Recipe Builder</h2>
            <div className='form-group'>
              <label htmlFor={'name'}>Name</label>
              <input 
              id='name'
              type='text' 
              valueLink={this.linkState('name')}
              placeholder='Name your recipie' />
            </div>
            
            <div className='form-group'>
              <label htmlFor={'style'}>Style</label>
              <input 
              id='style'
              type='text'
              valueLink={this.linkState('style')}
              placeholder="Enter your recipie's style" />
            </div>
            <div className='form-group'>
              <label htmlFor={'type'}>Type</label>
              <input 
              id='type'
              type='text' 
              valueLink={this.linkState('type')}
              placeholder="Enter your recipie's type" />
            </div>
          </div>


          );
  },

  _renderIngredients: function() {
     return (
        <div className='cf' id={'ingredients'}>
          <h2>Ingredients</h2>
            <div className='left'>
              {this._renderIngredientList('fermentables')}
              {this._renderIngredientList("hops")}
            </div>
            <div className='right'>
              {this._renderIngredientList("yeast")}
              {this._renderIngredientList("extras")}
          </div>
        </div>
        );
  },

  _renderIngredientList: function(type) {
    return ( 
      <IngredientList 
      type={type} 
      ingredients={this.state[type]}
      readOnly={false}
      handleClick={this._renderLibraryModal}
      handleAmountChange={this._handleAmountChange}
      handleDelete={this._handleDelete} />
        );
  },

  _renderHeader: function() {
    var title = (this.state.name == "") ? "Untitled Recipe" : this.state.name;
    var header;
    header = (
    <div className='header cf'>
        <div className='logo'>
          <img className='thumb' src='images/beer_glass.png' />
        </div>
        <div className='header-text'>
          <h1>{title}</h1>
          <h4>{this.state.style} {this.state.type}</h4>
        </div>
        <div className='save'>
          <button className='fade warning' onClick={this._submitForm}>Save Recipe</button>
        </div>
      </div>
      );
    return header;
  },

  _renderLibraryModal: function(type, e) {
    this.modal = <IngredientLibrary 
    deleteIngredient={this._handleDelete} 
    addIngredient={this._addIngredient} 
    selectedIngredients={this.state[type]}
    type={type} 
    closeModal={this._closeModal} />
    this.setState({modal: true})
  },

  _closeModal: function() {
    this.modal = "";
    this.setState({ modal: false})
  },

  _submitForm: function() {
    var errors = this._validateForm();
    // Client Side Validation of form fields returns errors if any
    if (errors.length == 0) {
      var recipe = {
        name: this.state.name,
        type: this.state.type,
        style: this.state.style,
        hops: this.state.hops,
        fermentables: this.state.fermentables,
        yeast: this.state.yeast,
        extras: this.state.extras
      };
      // If I were to save it, this would be the object that could be sent up to the server 
      // with an Ajax POST request representing the new recipe and it's parts
      this.modal = <RecipeSaved newRecipe={this._clearForm} closeModal={this._closeModal} recipe={recipe} />
      this.setState({ modal: true })
      // Create a successfuly saved message reviewing the recipe and allowing for a new one to be created
    } else {
      // If errors, re-render componenet with the new errors array
      this.setState({ errors: errors });
    }
  },

  _handleAmountChange: function(e, ingredient, change) {
    if (change.amount) {
      ingredient.amount = e.target.value;
    } else {
      ingredient.unit = e.target.selectedOptions[0].value;
    }

    this.forceUpdate();
  },

  _validateForm: function() {
    // Generally this would be done at a DB level as well as on the front end
    // The Database validation would be served as a response to the POST request
    // when the form is submitted and I would handle that through a Flux errors store
    var errors = [];
    if (this.state.name.length == 0) {
      errors.push("You have to name your beer!");
    }
    if (this.state.style.length == 0) {
      errors.push("You're beer must have a style!");
    }
    if (this.state.type.length == 0) {
      errors.push("You're beer must have a type!");
    }
    return errors;
  },

  _addIngredient: function(type, ingredient) {
    // Only add ingredient if not already in the list
    var names = this.state[type].map(function(ing) { return ing.name; });
    if (names.indexOf(ingredient.name) === -1) {
      var items = this.state[type].concat(ingredient);
      var newItems = {};
      newItems[type] = items;
      this.modal = <IngredientLibrary 
           deleteIngredient={this._handleDelete} 
           addIngredient={this._addIngredient} 
            selectedIngredients={newItems[type]}
            type={type} 
            closeModal={this._closeModal} />
            console.log(newItems);
      this.setState(newItems); 
    }
  },

  _handleDelete: function(type, ingredient, e) {
    var items = this.state[type]
    var newItems = items.filter(function(ing){
      return ing.name !== ingredient.name;
    });
    var newState = {};
    newState[type] = newItems
    this.setState(newState)
  }, 

  _clearForm: function() {
    this.setState({
      name: "",
      type: "",
      style: "",
      hops: [],
      yeast: [],
      extras: [],
      fermentables: [],
      errors: [],
      modal: false
    })
  },

  render: function() {
    var modal = (this.state.modal) ? this.modal : "";
    return (
    <div className='beer-form'>
      {modal}
      {this._renderHeader()}
      <Errors errors={this.state.errors} />
      <form className='recipe-form'>
        {this._renderFormFields()}
        {this._renderIngredients()}
      </form>
    </div>
    );
  }
})