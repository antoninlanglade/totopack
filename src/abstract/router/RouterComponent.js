import React from 'react';
import Router from 'abstract/router/Router';
import i18n from 'abstract/i18n/i18n';

export default class RouterComponent extends React.Component {
  constructor (props) {
    super(props);
    this.onLocaChange = this.onLocaChange.bind(this);
    this.state = {
      href: ''
    }
  }

  componentDidMount () {
    this.sync(this.props);
    i18n.on('change', this.onLocaChange);
  }

  componentWillReceiveProps (props) {
    this.sync(props);
  }

  componentWillUnmount () {
    i18n.on('change', this.onLocaChange);
  }

  sync (props) {
    Router.getRoute(props.route, props.params, props.locale).then((route) => {
      this.setState({
        href: route
      });
    });
  }

  onLocaChange () {
    this.sync(this.props);
  }

  onMouseEnter (e) {
    this.props.onMouseEnter && this.props.onMouseEnter(e);
  }

  onMouseLeave (e) {
    this.props.onMouseLeave && this.props.onMouseLeave(e);
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick(e);
    Router.getRoute(this.props.route, this.props.params, this.props.locale).then((route) => {
      Router.goto(route);
    });
  }

  render () {
    return <a className={['link', this.props.className].join(' ')} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} onClick={this.onClick.bind(this)} href={this.state.href} ref="component">{this.props.children}</a>
  }
}
