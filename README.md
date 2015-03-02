# React Custom Transition

This helper component takes the simplicity of the `ReactCSSTransitionGroup` and applies it to Javascript animations. This handles the simplest case of running some transition in an animation framework like Greensock TweenMax, which allows much more robust animations than CSS.

Use the library like this:

```
var React = require('react');
var CustomTransition = require('react-custom-transition');

/**
 * Before a transition in begins.
 * @param {Element} elem - The element that will transition.
 */
function beginEnter(elem) {
  TweenMax.set(elem, { opacity: 0 });
}

/**
 * Before a transition out begins.
 * @param {Element} elem - The element that will transition.
 */
function beginExit(elem) {
  TweenMax.set(elem, { opacity: 1 });
}

/**
 * What to run as the transition in.
 * @param {Element} elem - The element that will transition.
 * @param {function} done - A callback to tell the component that the transition is done.
 */
function enterActive(elem, done) {
  TweenMax.to(elem, 1, { opacity: 1, onComplete: done });
}

/**
 * What to run as the transition out.
 * @param {Element} elem - The element that will transition.
 * @param {function} done - A callback to tell the component that the transition is done.
 */
function exitActive(elem, done) {
  TweenMax.to(elem, 1, { opacity: 0, onComplete: done });
}

var MyComponent = React.createComponent({
  render: function() {
    return <CustomTransition
      beginEnter={beginEnter}
      beginExit={beginExit}
      enterActive={enterActive}
      exitActive={exitActive}>

      <InternalComponent someProp={changingProp} />

    </CustomTransition>;
  }
});
```
