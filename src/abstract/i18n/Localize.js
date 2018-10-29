import React from 'react';
import i18n from 'abstract/i18n/i18n';

export default class Localize extends React.Component {
  constructor (props) {
    super(props);
    this.onLocaChange = this.onLocaChange.bind(this);

    this.localization = this.updateLoc(this.props.children);
  }

  expandKeys (arr, keys) {
    let cursor = arr
    while (keys.length) {
      cursor = cursor[keys.shift()];
      if (!cursor) {
        break;
      }
    }
    return cursor;
  }

  updateLoc (loc) {
    let arrayOfKeys = loc.split('.');
    const obj = i18n.localize(arrayOfKeys[0], this.props.file);
    const result = this.expandKeys(obj, arrayOfKeys.slice(1, arrayOfKeys.length));
    return (result === undefined || result.trim() === '') ? this.props.children : result;
  }

  componentDidMount () {
    i18n.on('change', this.onLocaChange);
  }

  componentWillUnmount () {
    i18n.off('change', this.onLocaChange);
  }

  componentWillReceiveProps (nextProps) {
    this.localization = this.updateLoc(nextProps.children);
    this.refs.component.innerHTML = this.localization;
  }

  shouldComponentUpdate () {
    return false;
  }

  onLocaChange () {
    this.localization = this.updateLoc(this.props.children);
    this.refs.component.innerHTML = this.localization;
  }

  render () {
    return <span ref="component" className={this.props.className ? this.props.className : ''} dangerouslySetInnerHTML={{ __html: this.localization }}></span>
  }
}
