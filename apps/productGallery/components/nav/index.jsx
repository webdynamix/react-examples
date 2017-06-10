import React, { Component, PropTypes } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.changeCurrent = this.changeCurrent.bind(this);
  }

  changeCurrent(e) {
    e.preventDefault();
    const type = e.currentTarget.getAttribute('data-type');
    if (this.props.hasOwnProperty('onNavClick')) {
      this.props.onNavClick(type);
    }
  }

  render() {
    return (
      <nav>
        <a data-type="exact" data-slide="0" onClick={this.changeCurrent}>Exact</a>
        <a data-type="similar" data-slide="1" onClick={this.changeCurrent}>Similar</a>
        <a data-type="budget" data-slide="2" onClick={this.changeCurrent}>Budget</a>
      </nav>
    );
  }
}

Nav.propTypes = {
  current: PropTypes.string,
  onNavClick: PropTypes.func,
};

export default Nav;
