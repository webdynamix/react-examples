import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
    this.items = [this.props.exact, this.props.similar, this.props.budget];
  }

  getItem(key, item) {
    const type = this.itemType(key);
    return (
      <li key={key}>
        {!!item.hasOwnProperty('price') &&
          this.buyColumn(item, type)
        }
        {this.titleColumn(item, type)}
      </li>
    );
  }

  getItems() {
    const items = [];
    for (let key = 0; key < this.items.length; key++) {
      items.push(this.getItem(key, this.items[key]));
    }

    return items;
  }

  titleColumn(item, type) {
    return (
      <section data-section="title">
        <div className="holder">
          <div data-match-type={type}>
            <h1>{item.name}</h1>
            <h2>
              <span className="by">by </span>
              <span className="brand">
                {item.brand}
              </span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  buyColumn(item, type) {
    return (
      <section data-section="buy" data-toggle-type={type}>
        <span>{item.price}</span>
        {this.button(item)}
      </section>
    );
  }

  itemType(key) {
    switch (key) {
      case (1):
        return 'similar';
      case (2):
        return 'budget';
      default:
        return 'exact';
    }
  }

  button(obj) {
    let item;
    if (obj.price === 'Sold Out') {
      item = <a disabled>BUY</a>;
    } else {
      item = <a href={obj.source} target="_blank" onClick={() => { this.buttonClicked(obj.id);}}>BUY</a>;
    }
    return item;
  }

  buttonClicked(id) {
    if (this.props.hasOwnProperty('onBuyClick')) this.props.onBuyClick(id);
  }


  render() {
    return (
      <footer>
        <ul>
          {this.getItems()}
        </ul>
      </footer>
    );
  }
}

Footer.propTypes = {
  exact: PropTypes.object,
  similar: PropTypes.object,
  budget: PropTypes.object,
  onBuyClick: PropTypes.func,
};

export default Footer;
