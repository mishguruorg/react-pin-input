import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinItem from './PinItem';

/**
 */
class PinInput extends Component {

  constructor(props) {
    super(props);
    // this.props.secret = this.props.secret || false;
    // TODO: better way to create array
    this.values = new Array(props.length)
      .join('0')
      .split('0');
    this.elements = [];
    this.currentIndex = 0;
  }

  componentDidMount() {
    // Setting focus on the first element
    if(this.props.focus && this.props.length) this.elements[0].focus();
  }

  clear() {
    this.elements.forEach(e => e.clear());
    this.values = this.values.map(() => undefined)
    this.elements[0].focus();
  }

  focus() {
    if(this.props.length) this.elements[0].focus();
  }

  /**
   */
  onItemChange(value, index) {
    const { length, onComplete, onChange } = this.props;
    let currentIndex = index;

    this.values[index] = value;

    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      currentIndex += 1;
      this
        .elements[currentIndex]
        .focus();
    }

    // Notify the parent
    const pin = this
      .values
      .join('');

    onChange(pin, currentIndex);
    if (pin.length === length) {
      onComplete(pin, currentIndex);
    }
  }

  onBackspace(index) {
    if (index > 0) {
      this.elements[index - 1].focus();
    }
  }

  render() {
    const containerClassName = this.props.className || 'pincode-input-container'
    const inputClassName = this.props.inputClassName || 'pincode-input-text'
    return (
      <div style={this.props.style}  className={containerClassName}>
        {this
          .values
          .map((e, i) => <PinItem
            ref={ n => (this.elements[i] = n) }
            key={ i }
            onBackspace={ () => this.onBackspace(i) }
            secret={ this.props.secret || false }
            onChange={ v => this.onItemChange(v, i) }
            type={ this.props.type }
            inputMode={ this.props.inputMode }
            validate={ this.props.validate }
            inputStyle={ this.props.inputStyle }
            className = {inputClassName}
            inputFocusStyle={ this.props.inputFocusStyle }
          />)
        }
      </div>
    );
  }
}

PinInput.propTypes = {
  length: PropTypes.number.isRequired,
  type: PropTypes.string,
  onComplete: PropTypes.func,
  validate: PropTypes.func,
  secret: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  inputMode: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PinInput.defaultProps = {
  type: 'numeric',
  secret: false,
  validate: null,
  focus: false,
  onChange: () => {},
  onComplete: () => {},
  inputMode: undefined,
  style: {},
  inputStyle: {},
  inputFocusStyle: {},
};

export default PinInput;
