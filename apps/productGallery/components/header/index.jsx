import React, { Component, PropTypes } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <ul>
          { this.props.exact.hasOwnProperty('name') &&
            <li data-match-type="exact">
              <h1>{this.props.exact.name}</h1>
              <h2>
                <span className="by">by </span>
                <span className="brand">
                  {this.props.exact.brand}
                </span>
              </h2>
            </li>
          }
          { !this.props.exact.hasOwnProperty('name') &&
            <li data-match-type="exact">
              <h1>No Exact Match</h1>
            </li>
          }
          { this.props.similar.hasOwnProperty('name') &&
            <li data-match-type="similar">
              <h1>{this.props.similar.name}</h1>
              <h2>
                <span className="by">by </span>
                <span className="brand">
                  {this.props.similar.brand}
                </span>
              </h2>
            </li>
          }
          { !this.props.similar.hasOwnProperty('name') &&
            <li data-match-type="similar">
              <h1>No Similar Option Available</h1>
            </li>
          }
          { this.props.budget.hasOwnProperty('name') &&
            <li data-match-type="budget">

              <h1>{this.props.budget.name}</h1>
              <h2>
                <span className="by">by </span>
                <span className="brand">
                  {this.props.budget.brand}
                </span>
              </h2>
            </li>
          }
          { !this.props.budget.hasOwnProperty('name') &&
            <li data-match-type="budget">
              <h1>No Budget Option Available</h1>
            </li>
          }
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  exact: PropTypes.object,
  similar: PropTypes.object,
  budget: PropTypes.object,
};

export default Header;
