
// Simulate Database JSON API responses with parsed JS objects in the format I would 
// generally expect a server to respond with (of course that would depend on the paricular data represented)
// 
// For the basic example of this App, I assume all ingredients have a name, amount, and unit
// It would be easy to generalize this to different details for each ingredient in the general case
var hops = [
{name: "Hop1", amount: 0, unit: 'lb'}, 
{name: "Hop2", amount: 0, unit: 'lb'},
{name: "Hop3", amount: 0, unit: 'lb'},
{name: "Hop4", amount: 0, unit: 'lb'},
{name: "Hop5", amount: 0, unit: 'lb'},
{name: "Hop6", amount: 0, unit: 'lb'},
{name: "Hop7", amount: 0, unit: 'lb'},
{name: "Hop8", amount: 0, unit: 'lb'}
];

var yeast = [
{name: "Yeast1", amount: 0, unit: 'lb'}, 
{name: "Yeast2", amount: 0, unit: 'lb'},
{name: "Yeast3", amount: 0, unit: 'lb'},
{name: "Yeast4", amount: 0, unit: 'lb'},
{name: "Yeast5", amount: 0, unit: 'lb'},
{name: "Yeast6", amount: 0, unit: 'lb'},
{name: "Yeast7", amount: 0, unit: 'lb'},
{name: "Yeast8", amount: 0, unit: 'lb'}
];

var fermentables = [
{name: "Fermentable1", amount: 0, unit: 'lb'}, 
{name: "Fermentable2", amount: 0, unit: 'lb'},
{name: "Fermentable3", amount: 0, unit: 'lb'},
{name: "Fermentable4", amount: 0, unit: 'lb'},
{name: "Fermentable5", amount: 0, unit: 'lb'},
{name: "Fermentable6", amount: 0, unit: 'lb'},
{name: "Fermentable7", amount: 0, unit: 'lb'},
{name: "Fermentable8", amount: 0, unit: 'lb'}
];

var extras = [
{name: "Extra1", amount: 0, unit: 'lb'}, 
{name: "Extra2", amount: 0, unit: 'lb'},
{name: "Extra3", amount: 0, unit: 'lb'},
{name: "Extra4", amount: 0, unit: 'lb'},
{name: "Extra5", amount: 0, unit: 'lb'},
{name: "Extra6", amount: 0, unit: 'lb'},
{name: "Extra7", amount: 0, unit: 'lb'},
{name: "Extra8", amount: 0, unit: 'lb'}
];


module.exports = { hops: hops, yeast: yeast, fermentables: fermentables, extras: extras}
