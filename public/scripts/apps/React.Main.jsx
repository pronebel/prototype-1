var React = require('react');

window.React = React;

var App = React.createClass({
  render: function() {
    return (
      <p>Hello,React</p>
    );
  }
});
React.render(<App/>, document.body);