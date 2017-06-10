/* eslint react/sort-comp: 0, */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActionCreators from 'actions/app';
import * as actionCreators from 'actions/outfits';
import Modal from 'components/modal';
import Gallery from 'components/gallery';

import 'stylesheets/productWidget';

export class outfitsApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      breakpoint: '',
      expandedGallery: false,
      viewportHeight: window.innerHeight,
      currentOutfit: 0,
      initialView: true,
    };

    this.mixpanel = window.spylight.mixpanel;

    for (let i = 0; i < this.props.outfitsIds.length; i++) {
      this.fetchOutfitGallery(this.props.outfitsIds[i]);
    }

    this.onProductClick = this.onProductClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onProductClick = this.onProductClick.bind(this);
    this.toggleGallery = this.toggleGallery.bind(this);
    this.exploreOutfit = this.exploreOutfit.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.outfits.length === 1) {
      this.props.actions.outfitIdSave(this.props.outfits[0].id);
    }
    if (nextProps.state.hasOwnProperty('eventType') && nextProps.state.eventType !== this.props.state.eventType) {
      this.mixpanel.track(nextProps.state);
    }
  }

  fetchOutfitGallery(outfitId) {
    const staticIds = {
      pubId: this.props.state.publisherId,
      sessionId: this.props.state.sessionIdentifier,
      outfitId: outfitId,
    };
  }

  onProductClick(id) {
    this.props.actions.productIdDidChange(id);
  }

  exploreOutfit() {
    this.onProductClick(this.props.gallery[0].id);
  }

  closeModal() {
    this.props.actions.modalManualClose();
  }

  toggleGallery(outfitId) {
    this.props.actions.outfitIdSave(outfitId);
  }

  outfitsGallery() {
    const outfits = [];

    for (let i = 0; i < this.props.outfits.length; i++) {
      outfits.push(this.gallery(this.props.outfits[i], i));
    }
    return outfits;
  }

  gallery(outfit, key) {
    const evt = () => this.toggleGallery(outfit.id);
    return (
      <li key={key} data-id={outfit.id} data-initial={key === 0 && !!this.state.initialView} className={this.props.outfitId === outfit.id ? 'active' : null}>
        <figure onTouchStart={evt} onClick={evt}><img src={outfit.outfitImage} alt="" /></figure>
        <Gallery
          gallery={outfit.products}
          outfitId={outfit.id}
          clickHandler={this.onProductClick}
        />
      </li>
    );
  }

  onTouchStart() {
    this.setState({ initialView: false });
  }

  render() {
    if (this.props.hasOwnProperty('outfits') && this.props.outfits.length < 1) {
      return (
        <h4 data-fetching="true">Loading Spylight</h4>
      );
    }
    return (
      <div data-component="widget_embed" id={`sp-gallery-${this.props.outfitId}`} onTouchStart={this.onTouchStart} className={!!this.state.expandedGallery ? 'sp_expanded' : 'sp_scaled'}>
        <h4>{this.props.cta}</h4>
        <ul data-section="outfits" data-current={this.props.outfitId}>
          {this.outfitsGallery()}
        </ul>
        <Modal
          open={this.props.state.openModal}
          onClose={this.closeModal}
          breakPoint={this.state.breakPoint}
          viewportHeight={this.state.viewportHeight}
        />
      </div>
    );
  }
}

outfitsApp.propTypes = {
  state: PropTypes.object,
  mixpanelToken: PropTypes.string,
  gallery: PropTypes.array,
  actions: PropTypes.object,
  thisActions: PropTypes.object,
  productId: PropTypes.number,
  outfitId: PropTypes.number,
  outfit: PropTypes.string,
  breakPoint: PropTypes.string,
  cta: PropTypes.string,
  ctaButton: PropTypes.string,
  outfits: PropTypes.array,
  outfitsIds: PropTypes.array,
  currentOutfit: PropTypes.number,
  initialView: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    state: state.app,
    mixpanelToken: state.app.mixpanelToken,
    gallery: state.app.gallery,
    productId: state.app.productId,
    cta: state.app.cta,
    ctaButton: state.app.ctaButton,
    outfits: state.app.outfits,
    outfitId: state.app.outfitId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(appActionCreators, dispatch),
  thisActions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(outfitsApp);
