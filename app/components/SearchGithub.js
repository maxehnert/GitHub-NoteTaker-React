var React = require('react');
var Router = require('react-router');

var SearchGithub = React.createClass({
  mixins: [Router.Navigation],

  handleSubmit: function() {
    var username = this.refs.username.getDOMNode().value;
    this.refs.username.getDOMNode().value = '';
    // this is a redirect basically taking you to the profile url endpoint passing in th entered username
    this.transitionTo('profile', {username: username});
  },

  render: function() {

    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-7">
            <input tpye="text" className="form-control" ref="username" />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary"> Search Github</button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = SearchGithub;
