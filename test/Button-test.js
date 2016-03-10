'user strict';

const _ = require('lodash');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const matchers = require('jasmine-jquery-matchers');
require('jasmine-expect');

describe('@component Button', () => {
  let Button;

  const renderButton = (props) => TestUtils.renderIntoDocument(<Button {..._.merge({
    controlFor: 'myBaseName',
    title: 'someText'
  }, props)} />);

  beforeEach(() => {
    jasmine.addMatchers(matchers);
    const inject = require(
      'inject' +
      '?-react' +
      '&-classnames' +
      '!../src/Button.jsx'
      );
    Button = inject();
  });

  it('Creates a new React class for a Button control', () => {
    expect(Button.displayName).toEqual('Button');
  });

  describe('.render()', () => {
    describe('should output', () => {
      it('a BUTTON', () => {
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(), 'button');

        expect(button).toExist();
        expect(button).toHaveText('someText');
      });

      it('with default attributes', () => {
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(), 'button');

        expect(button).toHaveAttr('type', 'button');
        expect(button).toHaveAttr('role', 'button');
        expect(button).toHaveAttr('aria-label', 'someText');
        expect(button).toHaveAttr('aria-controls', 'myBaseName');
        expect(button).toHaveAttr('aria-pressed', 'false');
        expect(button).toHaveAttr('tabIndex', '1');
      });

      it('with expected classNames', () => {
        const props = { className: 'someClassName' };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveClass('button');
        expect(button).toHaveClass('someClassName');
        expect(button).not.toHaveClass('button--pressed');
        expect(button).not.toHaveClass('button--disabled');
        expect(button).not.toHaveClass('button--busy');
        expect(button).not.toHaveAttr('disabled');
        expect(button).not.toHaveAttr('aria-pressed', 'true');
        expect(button).not.toHaveAttr('aria-busy', 'true');
      });

      it('with expected tabIndex', () => {
        const props = { tabIndex: 999 };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveAttr('tabIndex', '999');
      });

      it('with expected autoFocus', () => {
        const props = { autoFocus: true };
        const instance = renderButton(props);

        expect(instance.props.autoFocus).toBeTrue();
      });

      it('a busy BUTTON', () => {
        const props = {
          isPressed: false,
          isBusy: true,
          isDisabled: false
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveClass('button');
        expect(button).toHaveClass('button--busy');
        expect(button).not.toHaveClass('button--pressed');
        expect(button).not.toHaveClass('button--disabled');
        expect(button).toHaveAttr('aria-busy', 'true');
        expect(button).not.toHaveAttr('disabled', 'disabled');
        expect(button).not.toHaveAttr('aria-pressed', 'true');
      });

      it('a disabled BUTTON', () => {
        const props = {
          isPressed: false,
          isBusy: false,
          isDisabled: true
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveClass('button');
        expect(button).toHaveClass('button--disabled');
        expect(button).not.toHaveClass('button--pressed');
        expect(button).not.toHaveClass('button--busy');
        expect(button).toHaveAttr('disabled', 'disabled');
        expect(button).not.toHaveAttr('aria-busy', 'true');
      });

      it('a pressed & busy BUTTON', () => {
        const props = {
          isPressed: true,
          isBusy: true,
          isDisabled: false
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).not.toHaveAttr('disabled', 'disabled');
        expect(button).not.toHaveClass('button--disabled');
        expect(button).toHaveAttr('aria-pressed', 'true');
        expect(button).toHaveAttr('aria-busy', 'true');
        expect(button).toHaveClass('button--busy');
        expect(button).toHaveClass('button--pressed');
      });
    });

    describe('should attach', () => {
      let callback;

      beforeEach(() => {
        callback = jasmine.createSpy();
      });

      it('the expected Click handler', () => {
        const props = {
          onClick: callback
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        TestUtils.Simulate.click(button);
        expect(callback).toHaveBeenCalled();
      });
    });

    describe('should not execute expected Click handler', () => {
      let callback;

      beforeEach(() => {
        callback = jasmine.createSpy();
      });

      it('if busy', () => {
        const props = {
          isBusy: true,
          isDisabled: false,
          isPressed: false,
          onClick: callback
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveAttr('aria-pressed', 'false');

        TestUtils.Simulate.click(button);

        expect(callback).not.toHaveBeenCalled();
        expect(button).toHaveAttr('aria-pressed', 'false');
        expect(button).toHaveAttr('aria-busy', 'true');
        expect(button).toHaveClass('button--busy');
        expect(button).not.toHaveClass('button--pressed');
      });

      it('if disabled', () => {
        const props = {
          isDisabled: true,
          isPressed: false,
          onClick: callback
        };
        const button = TestUtils.findRenderedDOMComponentWithTag(renderButton(props), 'button');

        expect(button).toHaveAttr('aria-pressed', 'false');

        TestUtils.Simulate.click(button);

        expect(callback).not.toHaveBeenCalled();
        expect(button).toHaveAttr('aria-pressed', 'false');
        expect(button).not.toHaveClass('button--pressed');
      });

      it('if pressed & disabled', () => {
        const props = {
          isDisabled: true,
          onClick: callback,
          isPressed: true
        };
        const instance = renderButton(props);
        const button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');

        expect(button).toHaveAttr('aria-pressed', 'true');
        expect(button).toHaveClass('button--pressed');

        TestUtils.Simulate.click(instance);

        expect(callback).not.toHaveBeenCalled();
        expect(button).toHaveAttr('aria-pressed', 'true');
        expect(button).toHaveClass('button--pressed');
      });
    });
  });
});
