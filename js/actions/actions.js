var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/ingredient_constants');
var ingredients = require('./database');


module.exports = {
  recieveIngredients: function(type) {
    var payload;
    switch (type) {
      case 'hops':
        payload = ingredients.hops;
        break;
      case 'yeast':
        payload = ingredients.yeast;
        break;
      case 'extras':
        payload = ingredients.extras;
        break;
      case 'fermentables':
        payload = ingredients.fermentables;
        break;
      default: 
        break;
    }
    var action = {
        actionType: constants.INGREDIENTS_RECIEVED,
        payload: payload
      };
      AppDispatcher.dispatch(action)
  },

  searchIngredients: function(string) {
    var action = {
        actionType: constants.INGREDIENT_SEARCH,
        payload: string
      };
      AppDispatcher.dispatch(action)
  }

}