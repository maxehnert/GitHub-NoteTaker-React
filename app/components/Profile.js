var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  //a mixin takes your components state and adds some properties to it
  mixins: [Router.State, ReactFireMixin],

  getInitialState: function() {
    return {
      notes: ['note1', 'note2'],
      bio: {name: 'MaxE'},
      repos: [1,23,4]
    }
  },

  componentDidMount: function() {
    // create a new instance of firebase
    //this will return an object full of firebase type properties which get saved to the ref property
    this.ref = new Firebase('https://github-notetaker-max.firebaseio.com/');
    // go one route deeper in the url endpoint on firebase
    var childRef = this.ref.child(this.getParams().username);
    this.bindAsArray(childRef, 'notes');
  },

  componentWillUnmount: function() {
    // remove the listener
    this.unbind('notes');
  },

  handleAddNote: function(newNote) {
    // firebase stuff
    // replacing existing value with new value
    this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
  },

  render: function() {
    var username= this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
