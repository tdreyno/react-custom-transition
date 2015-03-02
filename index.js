var React = require('react/addons');
var assign = require('react/lib/Object.assign');
var ReactTransitionGroupClass = require('react/lib/ReactTransitionGroup');
var ReactTransitionGroup = React.createFactory(ReactTransitionGroupClass);
var CustomTransitionChildClass = require('./custom-transition-child');
var CustomTransitionChild = React.createFactory(CustomTransitionChildClass);

var UID = 1;

var CustomTransition = React.createClass({
  displayName: 'CustomTransition',

  propTypes: {
    beginEnter: React.PropTypes.func,
    beginExit: React.PropTypes.func,
    enterActive: React.PropTypes.func,
    exitActive: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      uid: UID++
    };
  },

  _wrapChild: function(child) {
    return CustomTransitionChild(
      {
        uid: this.state.uid,
        beginEnter: this.props.beginEnter,
        beginExit: this.props.beginExit,
        enterActive: this.props.enterActive,
        exitActive: this.props.exitActive
      },
      child
    );
  },

  render: function() {
    var props = assign({}, this.props, { childFactory: this._wrapChild} );
    return ReactTransitionGroup(props);
  }
});

module.exports = CustomTransition;
