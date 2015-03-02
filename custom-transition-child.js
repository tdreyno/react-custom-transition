var React = require('react/addons');
var Promise = require('es6-promise').Promise;
var groupPromises = {};

var CustomTransitionChild = React.createClass({
  displayName: 'CustomTransitionChild',

  propTypes: {
    uid: React.PropTypes.number.isRequired,
    beginEnter: React.PropTypes.func,
    beginExit: React.PropTypes.func,
    enterActive: React.PropTypes.func,
    exitActive: React.PropTypes.func
  },

  trackTransitionDuration: function(name, transFunc, originalDone) {
    var running = true;

    function wrappedDone() {
      running = false;
      originalDone();
    }

    setTimeout(function() {
      if (running) {
        console.error('Transition ' + name + ' never finished', transFunc);
      }
    }, 10000);

    return wrappedDone;
  },

  componentWillEnter: function(done) {
    var node = this.getDOMNode();

    if (this.props.beginEnter) {
      this.props.beginEnter(node);

      var trackedDone = this.trackTransitionDuration('enter', this.props.enterActive, done);

      setTimeout(function() {
        if (groupPromises[this.props.uid]) {
          groupPromises[this.props.uid].then(function(doneExit) {
            doneExit();
            this.props.enterActive(node, trackedDone);
            delete groupPromises[this.props.uid];
          }.bind(this));
        } else {
          this.props.enterActive(node, trackedDone);
        }
      }.bind(this), 10);
    } else {
      done();
    }
  },

  componentWillLeave: function(done) {
    var node = this.getDOMNode();

    if (this.props.beginExit) {
      this.props.beginExit(node);

      var trackedDone = this.trackTransitionDuration('leave', this.props.exitActive, done);

      groupPromises[this.props.uid] = new Promise(function(resolve) {
        this.props.exitActive(node, function() {
          resolve(trackedDone);
        });
      }.bind(this));
    } else {
      done();
    }
  },

  render: function() {
    return React.Children.only(this.props.children);
  }
});

module.exports = CustomTransitionChild;
