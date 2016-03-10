'use strict';

const React = require('react');
const classnames = require('classnames');

const Button = React.createClass({

  displayName: 'Button',

  propTypes: {
    controlFor: React.PropTypes.string,
    title: React.PropTypes.string,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string,
    isPressed: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    isBusy: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.arrayOf(React.PropTypes.element)
    ])
  },

  getDefaultProps () {
    return {
      isDisabled: false,
      isPressed: false,
      isBusy: false,
      autoFocus: false,
      tabIndex: 1
    };
  },

  getInitialState () {
    return {
      isPressed: this.props.isPressed,
      isDisabled: this.props.isDisabled,
      isBusy: this.props.isBusy
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      isPressed: nextProps.isPressed,
      isDisabled: nextProps.isDisabled,
      isBusy: nextProps.isBusy
    });
  },

  handleClick (e) {
    const { isPressed, isDisabled, isBusy } = this.state;
    const { onClick } = this.props;

    if (onClick && !isDisabled && !isBusy) {
      e.preventDefault();
      this.setState({ isPressed: !isPressed });
      onClick();
    }
  },

  render () {
    const { isPressed, isDisabled, isBusy } = this.state;
    const { controlFor, title, className, children, autoFocus, tabIndex } = this.props;
    const classes = {
      'button': true,
      'button--pressed': isPressed,
      'button--disabled': isDisabled,
      'button--busy': isBusy,
      [`${ className }`]: !!className
    };

    return (
      <button
        type='button'
        role='button'
        aria-controls={ controlFor }
        aria-label={ title }
        title={ title }
        className={ classnames(classes) }
        onClick={ this.handleClick }
        disabled={ isDisabled }
        aria-pressed={ isPressed.toString() }
        aria-busy={ isBusy.toString() }
        tabIndex={ tabIndex }
        autoFocus={ autoFocus }
        >
        { children || title }
      </button>
      );
  }
});

module.exports = Button;
