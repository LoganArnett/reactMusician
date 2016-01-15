var React = require('react');

var Artist = React.createClass({
  render: function() {
    return (
      <div>
        <a href="javascript:void(0)" onClick={this.props.onClick}>{this.props.name}</a>
      </div>
    )
  }
});

module.exports = Artist;
