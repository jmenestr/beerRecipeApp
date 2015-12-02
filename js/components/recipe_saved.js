var React = require('react');
var IngredientList = require('./ingredient_list');


module.exports = RecipeSaved = React.createClass({

  render: function() {
    var recipe = this.props.recipe;

    var a = <IngredientList type={'hops'} ingredients={recipe.hops} readOnly={true} />
    return (
      <section id="modal" className="modal is-active">
          <div className="recipe">      
            <div className='header'> 
              <h1>
                {recipe.name}
              </h1>
              <h4>
                {recipe.style} {recipe.type}
              </h4>
              <button onClick={this.props.closeModal} className="modal-close remove warning fade">X</button>        
            </div>
            <div className='success'><h3>Here's your new recipe!</h3></div>
            <div className="recipe-details cf">
              <div className='left'>
                <IngredientList type={'hops'} ingredients={recipe.hops} readOnly={true} />
                <IngredientList type={'yeast'} ingredients={recipe.yeast} readOnly={true} />
              </div>
              <div className='right'>
                <IngredientList type={'extras'} ingredients={recipe.extras} readOnly={true} />
                <IngredientList type={'fermentables'} ingredients={recipe.fermentables} readOnly={true} />
              </div>
            </div>
            <div className='new-recipe'><button className='success' onClick={this.props.newRecipe}>Create New Recipe</button></div>
          </div>
          <div className="modal-screen"></div>
        </section>
      );
  }
})