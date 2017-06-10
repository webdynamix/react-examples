import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/product';
import Footer from '../footer/index.jsx';
import ProductCarousel from '../productCarousel/index.jsx';
import mixpanelEvent from 'helpers/mixpanelEvent';

export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialView: true,
      gallery: {},
    };
    this.onBuyClick = this.onBuyClick.bind(this);
    this.onSlideChangeUpdate = this.onSlideChangeUpdate.bind(this);
    this.getProductSet(this.props.masterProductId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery.hasOwnProperty('items') && nextProps.gallery !== this.props.gallery) {
      // 711 is default for widescreen, if less inject add.
      if (this.props.hasOwnProperty('includeAds') && !!this.props.includeAds && document.body.clientWidth < 711) this.injectAdSlide(nextProps.gallery.items);

      this.setState({ gallery: nextProps.gallery });
    }

    if (this.props.masterProductId !== nextProps.masterProductId) {
      this.getProductSet(nextProps.masterProductId, true);
    }
    if (!!this.state.initialView && nextProps.masterProductId !== this.props.masterProductId) this.setState({ initialView: false });
  }

  componentDidUpdate() {
    mixpanelEvent(this.props.store);
  }

  onSlideChangeUpdate(target) {
    if (target.hasOwnProperty('matchType') && target.matchType !== this.props.targetMatchType) {
      if (target.matchType === 'ad') this.props.actions.swapToAdType();
      else (this.props.actions.swapCurrent(target.id));
    }


    if (!!this.state.initialView) this.setState({ initialView: false });
  }

  onBuyClick(id) {
    this.props.actions.onBuyClick(id);
  }

  getProductSet(productId, toggleProduct) {
    this.props.actions.requestProductSet({
      outfit_id: this.props.outfitId,
      product_id: productId,
      pub_id: this.props.publisherId,
      referrer: this.props.referrer,
    }, toggleProduct);
  }

  injectAdSlide(collection) {
    let adIndex = 2;
    const adSlide = {
      type: 'ad',
      matchType: 'ad',
      id: 'adID',
    };

    if (collection.length <= 2) adIndex = 1;

    collection.splice(adIndex, 0, adSlide);
  }

  render() {
    if (!this.props.productSet.hasOwnProperty('exact')) {
      return (
        <main>
          <figure id="isFetching"></figure>
        </main>
      );
    }

    return (
      <main key={this.props.ckey} data-current={this.props.targetMatchType} data-fetching={this.props.isFetching}>
        <ProductCarousel
          slides={this.state.gallery}
          initialSlide={this.props.targetMatchType}
          onSlideChange={this.onSlideChangeUpdate}
          aspectRatio="1:1"
          initialView={this.state.initialView}
          arrows
        />
        <Footer
          exact={this.props.productSet.exact}
          similar={this.props.productSet.similar}
          budget={this.props.productSet.budget}
          onBuyClick={this.onBuyClick}
        />
      </main>
    );
  }
}

Product.propTypes = {
  store: PropTypes.object,
  actions: PropTypes.object,
  productSet: PropTypes.object,
  targetMatchType: PropTypes.string,
  gallery: PropTypes.object,
  isFetching: PropTypes.bool,
  masterProductId: PropTypes.number,
  outfitId: PropTypes.string,
  publisherId: PropTypes.string,
  ckey: PropTypes.number,
  includeAds: PropTypes.bool,
  referrer: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    store: state,
    isFetching: state.product.isFetching,
    productSet: state.product.productSet,
    gallery: state.product.productSetGallery,
    targetMatchType: state.product.targetMatchType,
    ckey: state.product.key,
    masterProductId: state.widget.masterProductId,
    outfitId: state.widget.outfitId,
    publisherId: state.widget.publisherId,
    includeAds: state.widget.includeAds,
    referrer: state.widget.referralUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);
