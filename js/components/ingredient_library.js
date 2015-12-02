var React = require('react');
var actions = require('../actions/actions');
var LibraryItem = require('./library_item');
var IngredientStore = require('../stores/ingredient_store');

module.exports = IngredientLibrary = React.createClass({
  getInitialState: function() {
    // set initial state to what's in the Ingredient Store 
    return { ingredients: IngredientStore.allIngredients() }
  },

  componentDidMount: function() {
    // Add Change listener to update state whenever store is updated 
    IngredientStore.addAllIngredientChangeListener(this._handleIngredientChange);
    IngredientStore.addSearchChangeListener(this._handleSearch);
    // Simulated API request to get current ingredients from server 
    actions.recieveIngredients(this.props.type);
  },

  componentWillUnmount: function() {
    // Remove change handleres 
    IngredientStore.removeAllIngredientChangeListener(this._handleIngredientChange);
    IngredientStore.removeSearchChangeListener(this._handleSearch);
  },

  _handleIngredientChange: function() {
    this.setState({ ingredients: IngredientStore.allIngredients()})
  },

  _handleSearch: function() {
    // When search event is emmited, query store for filtered ingredients 
    this.setState({ ingredients: IngredientStore.searchIngredients()})
  },

  _handleSearchChange: function(e) {
    // Simulate API search request by getting current search string 
    // and sending out a search action
    actions.searchIngredients(e.target.value);
  },

  _handleClick: function(ingredient, e) {
    // Add correct classes to signify if the ingredient is currently 
    // selected or not and then call recipe Level add/remove handelers 
    // as needed 
    var target = e.currentTarget.getElementsByTagName('i')[0];
    if (target.classList.contains('fa-check-square-o')) {
      target.classList.remove('fa-check-square-o');
      target.classList.add('fa-square-o');
      this.props.deleteIngredient.call(null, this.props.type, ingredient)
    } else {
      target.classList.add('fa-check-square-o');
      target.classList.remove('fa-square-o');
      this.props.addIngredient.call(null, this.props.type, ingredient);
    } 
  },

  _renderIngredientsLibrary: function() {
    return (
        <div>
          <div className='library-head'>
              <div className='add'></div>
              <div className='name'>Name</div>
          </div>
          
            {this._renderIngredients()}
          
        </div>
      );
  },

  _renderIngredients: function() {
    // All possible currently in store
    var ingredients = this.state.ingredients;
    // make new array of currently selected ingredients
    var selectedIngredients = this.props.selectedIngredients.map(function(ing) { return ing.name });

    return(<div className='library-items'>
          {
            ingredients.map(function(ing){
            var name = ing.name;
            var checked = (selectedIngredients.indexOf(name) !== -1); 
            // Check if ing is also selected and set checked flag to pass down to Item component
            return (<LibraryItem key={name} handleClick={this._handleClick.bind(null, ing)} checked={checked} name={name} />)}.bind(this))
          }
          </div>)
  },

  render: function() {
    return (
      <section id="modal" className="modal is-active">
          <div className="library">      
            <div className='header'> 
              <h1>
                {this.props.type} Library
              </h1>
              <button onClick={this.props.closeModal} className="modal-close fade warning remove">X</button>        
            </div>
            <div className="search">
              <input onChange={this._handleSearchChange} type='text' placeholder='Search...' />
            </div>
            {this._renderIngredientsLibrary()}
          </div>
          <div className="modal-screen"></div>
        </section>
      );
  }
});