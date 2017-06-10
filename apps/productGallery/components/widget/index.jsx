import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/widget';
import Product from 'components/product';
import ProductGallery from 'components/productGallery';

export class Widget extends Component {
  constructor(props) {
    super(props);

    const getReferrer = () => {
      return !!document.referrer ? document.referrer : this.props.location.query.referral_url;
    };

    this.state = {
      model: {
        outfitId: this.props.location.query.outfit_id,
        masterProductId: Number(this.props.location.query.product_id),
        publisherId: this.props.location.query.pub_id,
        referralUrl: (window.location !== window.parent.location) ? getReferrer() : document.location.href,
      }
    };

    this.onProductClick = this.onProductClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.storeParams(this.state.model);
  }

  componentDidMount() {
    this.onResize();
  }

  onProductClick(id) {
    this.props.actions.swapProductId(id);
  }

  onResize() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        // resizeEnd
        this.breakPoints();
      }, 250);
    });
    this.breakPoints();
  }

  breakPoints() {
    const width = document.body.clientWidth;
    this.setState({ mobile: width <= 480 });
  }

  render() {
    return (
      <div data-component="Widget" id="widget">
        <section id="findTheLook">
          <header data-toggle="1">{this.props.title}</header>
          <a href="http://spylight.com/" id="powered-by" target="_blank"></a>
          <section>
            <ProductGallery
              onProductClick={this.onProductClick}
              outfitId={this.state.model.outfitId}
              publisherId={this.state.model.publisherId}
              mobile={this.state.mobile}
            />
          </section>
        </section>
        <Product />
      </div>
    );
  }
}

Widget.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
  actions: PropTypes.object,
  title: PropTypes.string,
  outfitId: PropTypes.string,
  masterProductId: PropTypes.number,
  publisherId: PropTypes.string,
  location: PropTypes.object,
  mobile: PropTypes.bool,
  reducers: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    store: state,
    title: state.widget.title,
    outfitId: state.widget.outfitId,
    publisherId: state.widget.publisherId,
    masterProductId: state.widget.masterProductId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Widget);
