
// High Level Dependencies dealing with React 
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
// Component Dependencies 
var BeerForm = require('./components/beer_recipe');

var App = React.createClass({
  // Create high level App component that will hold high level data 
  // logic and routing of different paths
  render: function() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
      );
  }
});

var routes =  (
  // Add Routes to handle URL paths for Index and Creating Recipie
  <Route path='/' component={App}>
    <IndexRoute component={BeerForm} />
  </Route>
);

ReactDOM.render(
  // Mount Routes to app component
  <Router>{routes}</Router>,
  document.getElementById('app')
);