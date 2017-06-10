import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/productGallery';

export class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.swapProduct = this.swapProduct.bind(this);
    this.props.actions.getOutfitProductGallery({
      outfit_id: this.props.outfitId,
      pub_id: this.props.publisherId,
      referrer: this.props.referrer,
    });
  }

  componentDidMount() {
    this.scopeElements();
  }

  scopeElements() {
    this.items = this.wrapper.querySelectorAll('li');
  }

  toggleActiveClass(current) {
    if (this.items.length < 1) this.scopeElements();
    [].forEach.call(this.items, (item) => {
      item.classList.remove('active');
      return null;
    });

    this.items[current].className = 'active';
  }

  swapProduct(id, key) {
    if (this.props.hasOwnProperty('onProductClick')) {
      this.props.onProductClick(id);
    }
    this.toggleActiveClass(key);
  }

  galleryItem(key, obj) {
    const klass = (!!this.props.hasOwnProperty('currentProductId') && this.props.currentProductId === obj.id) ? 'active' : null;

    return (
      <li key={key} data-key={key} className={klass} onClick={ () => {this.swapProduct(obj.id, key);}}>
        <img src={obj.image} alt="" />
      </li>
    );
  }

  gallery() {
    const items = [];
    for (let key = 0; key < this.props.gallery.length; key++) {
      items.push(this.galleryItem(key, this.props.gallery[key]));
    }
    return items;
  }

  render() {
    if (!!this.props.isFetching) {
      return null;
    }
    return (
      <ul ref={ (ul) => {this.wrapper = ul;}}>
        {this.gallery()}
      </ul>
    );
  }
}

ProductGallery.propTypes = {
  actions: PropTypes.object,
  isFetching: PropTypes.bool,
  gallery: PropTypes.array,
  onProductClick: PropTypes.func,
  outfitId: PropTypes.string,
  publisherId: PropTypes.string,
  mobile: PropTypes.bool,
  currentProductId: PropTypes.number,
  sectionId: PropTypes.string,
  referrer: PropTypes.string,
};

const mapStateToProps = (state) => ({
  gallery: state.productGallery.gallery,
  isFetching: state.productGallery.isFetching,
  currentProductId: state.product.currentProductId,
  referrer: state.widget.referralUrl,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductGallery);
