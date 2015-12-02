var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var IngredientConsants = require('../constants/ingredient_constants');
var extend = require('extend');


// Constants for Ingredient Store


  var ALL_INGREDIENTS_CHANGE = "ALL_INGREDIENTS_CHANGE";
  var INGREDIENT_SEARCH = "INGREDIENT_SEARCH";

  // Private variables to store ingredient list and type
  var _ingredients = [];
  var _filteredIngredients = [];

  var _updateIngredients = function(payload) {
    _ingredients = payload;
    IngredientStore.emit(ALL_INGREDIENTS_CHANGE);
  };

  var _reset = function() {
    _ingredients = [];
    _filteredIngredients = [];
  };

  var _filterIngredients = function(string) {
    // Make sure arg is of string type for a proper search
    if (typeof string !== 'string') {
      throw new TypeError("Filter param must be string");
    }
    // Check case when string is empty, in which case emit an event 
    // so list queries all ingredients 
    if (string.length == 0) {
      IngredientStore.emit(ALL_INGREDIENTS_CHANGE);
    } else {
      _filteredIngredients = 
        _ingredients.filter(function(ing){ return ing.name.match(string)});
      IngredientStore.emit(INGREDIENT_SEARCH);    
    }
  };
  module.exports = IngredientStore = extend({}, EventEmitter.prototype,{
    allIngredients: function() {
      return _ingredients;
    },

    searchIngredients: function() {
      return _filteredIngredients;
    },

    addAllIngredientChangeListener: function(listener){
      this.addListener(ALL_INGREDIENTS_CHANGE, listener);
    },

    removeAllIngredientChangeListener: function(listener){
      _reset();
      this.removeListener(ALL_INGREDIENTS_CHANGE, listener);
    },

    addSearchChangeListener: function(listener){
      this.addListener(INGREDIENT_SEARCH, listener);
    },

    removeSearchChangeListener: function(listener){
      _reset();
      this.removeListener(INGREDIENT_SEARCH, listener);
    },

    dispatcerId: AppDispatcher.register(function(action){
      switch(action.actionType) {
        case IngredientConsants.INGREDIENTS_RECIEVED:
          _updateIngredients(action.payload);
          break;
        case IngredientConsants.INGREDIENT_SEARCH:
          _filterIngredients(action.payload);
          break;
        default:
          break;
      }
    })

  });



