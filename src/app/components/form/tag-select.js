/**
 * Created by phucpnt on 5/22/16.
 */
import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/less/select.less';
import t from 'tcomb-form';


class TagOption extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }

  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event);
  }

  handleMouseMove(event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }

  render() {
    let style = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    let imgStyle = {
      marginRight: 5,
      height: 20,
    };
    const { name, avatarThumbnail } = this.props.option;
    return (
        <div className={this.props.className}
             onMouseDown={this.handleMouseDown}
             onMouseEnter={this.handleMouseEnter}
             onMouseMove={this.handleMouseMove}
             title={this.props.option.name}>
          <div style={style}><span><img style={imgStyle} src={avatarThumbnail}/></span>{name}</div>
          {this.props.children}
        </div>
    );
  }
}
TagOption.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  onFocus: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  option: React.PropTypes.object.isRequired,
};


class TagValue extends Component {
  render() {
    const style = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    let imgStyle = {
      marginRight: 5,
      height: 20,
    };
    const { name, avatarThumbnail } = this.props.value;
    return (
        <div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
          <span style={style}><img style={imgStyle} src={avatarThumbnail}/>{name}</span>
          {this.props.children}
				</span>
        </div>
    );
  }
}

TagValue.propTypes = {
  children: React.PropTypes.node,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.object
};


const FormTagSelect = options => {
  const finalOpts = options.map(item => {
    return Object.assign({}, item, { value: item.name });
  });
  return t.form.Form.templates.select.clone({
    renderSelect(locals) {
      const onChange = value => {
        locals.onChange(value ? value : [], value ? Object.keys(value) : []);
      };
      return (
          <div className="js-tag-select">
            <Select onChange={onChange} multi={true}
                    value={locals.value}
                    valueComponent={TagValue}
                    options={finalOpts}
                    optionComponent={TagOption}
            />
          </div>
      );
    }
  });
};
export default FormTagSelect;