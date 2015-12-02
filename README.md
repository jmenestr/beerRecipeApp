# Let's make Beer! 

A simple React.js Beer making app utilizing Browserify

## Use of Brosweify to bundle node modules 

* Browserify allows the use of the Node.js require pattern for component and code modulerization 

## Uses FLUX pattern for Ingredient Store

* FLUX pattern for ingredient store registers handlers on an AppDispatchr that is called with API actions. A reset method clears out the store allowing the same store component to be used for all ingredients. 

## Represent all Library/Lists with same component 

* Because all Ingredient lists and Librarys follow the same pattern, all share the same components. Events are handeled in a general way with a 'type' variable that's binded to the event handelers on callback so the main componenet, BeerRecipe, can correctly find the data in it's state