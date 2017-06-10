import React, { Component, PropTypes } from 'react';

export class Ad extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <aside data-component="ad">
        <h4>300 x 600 <br /> ADD REC</h4>
      </aside>
    );
  }
}

Ad.propTypes = {
  mobile: PropTypes.bool,
};


export default Ad;
