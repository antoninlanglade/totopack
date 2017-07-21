import React from 'react';
import Router from 'abstract/Router/Router';
import i18n from 'abstract/i18n/i18n';

export default class RouterComponent extends React.Component {
  constructor (props) {
    super(props);
    this.onLocaChange = this.onLocaChange.bind(this);
    this.state = {
      href: ''
    }
    this.sync();
  }

  componentDidMount () {
    i18n.add(this.onLocaChange);
  }

  componentWillUnmount () {
    i18n.remove(this.onLocaChange);
  }

  sync () {
    Router.getRoute(this.props.route, this.props.params, this.props.locale).then((route) => {
      this.setState({
        href: route
      });
    });
  }

  onLocaChange () {
    this.sync();
  }

  onClick (e) {
    e.preventDefault();
    Router.getRoute(this.props.route, this.props.params, this.props.locale).then((route) => {
      Router.goto(route);
    });
  }

  render () {
    return <a className="link" onClick={this.onClick.bind(this)} href={this.state.href} ref="component">{this.props.children}</a>
  }
}
