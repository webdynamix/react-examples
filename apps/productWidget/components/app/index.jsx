/* eslint react/sort-comp: 0, */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/app';
import Modal from 'components/modal';
import Gallery from 'components/gallery';

import 'stylesheets/productWidget';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      breakpoint: '',
      expandedGallery: false,
      viewportHeight: window.innerHeight,
    };

    this.mixpanel = window.spylight.mixpanel;
    this.update(this.props.id);
    this.beforeunload();

    this.onProductClick = this.onProductClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onProductClick = this.onProductClick.bind(this);
    this.breakPoints = this.breakPoints.bind(this);
    this.exploreOutfit = this.exploreOutfit.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.onResize();
    window.spylight.update = this.update;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.state.hasOwnProperty('outfitId') && !!nextProps.outfitId && nextProps.outfitId !== this.props.outfitId) {
      this.fetchGallery(nextProps.outfitId);
    }
    if (nextProps.state.hasOwnProperty('eventType') && nextProps.state.eventType !== this.props.state.eventType) {
      this.mixpanel.track(nextProps.state);
    }
  }

  update(id) {
    this.props.actions.outfitIdSave(id);
    return id;
  }

  fetchGallery(outfitId) {
    const staticIds = {
      pubId: this.props.state.publisherId,
      sessionId: this.props.state.sessionIdentifier,
      outfitId: outfitId,
    };
    this.props.actions.fetchGallery(staticIds, (length) => {
      this.galleryLayout(length);
    });
  }

  beforeunload() {
    window.addEventListener('beforeunload', () => {
      if (!!this.props.state.openModal) this.props.actions.modalAutoClose();
    });
  }

  onResize() {
    let timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.onResizeEnd();
      }, 500);
    });
    this.breakPoints();
  }

  onResizeEnd() {
    this.breakPoints();
  }

  galleryLayout(length) {
    const itemLength = length || this.props.gallery.length;
    const container = document.getElementById(`sp-gallery-${this.props.outfitId}`);
    const ctaWidth = 130;
    const buttonWidth = 130;
    const galleryWidth = itemLength * 95;
    const projectedWidth = galleryWidth + ctaWidth + buttonWidth;

    if (!!container && projectedWidth <= container.offsetWidth) {
      this.setState({ expandedGallery: true });
    } else {
      this.setState({ expandedGallery: false });
    }
  }

  breakPoints() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let breakPoint;
    if (width <= 480) breakPoint = 'mobile';
    else if (width < 1440) breakPoint = 'desktop';
    else breakPoint = 'widescreen';

    this.setState({ breakPoint: breakPoint });
    this.galleryLayout();

    if (height !== this.state.viewportHeight) this.setState({ viewportHeight: height });
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

  ctaButton() {
    return (
      <button onClick={this.exploreOutfit}>{this.props.ctaButton}</button>
    );
  }

  render() {
    if (this.props.hasOwnProperty('gallery') && this.props.gallery.length < 1) {
      return (
        <button data-fetching="true">Loading Spylight</button>
      );
    }
    return (
      <div data-component="widget_embed" id={`sp-gallery-${this.props.outfitId}`} className={!!this.state.expandedGallery ? 'sp_expanded' : 'sp_scaled'}>
        <section data-section="cta">
          <h4>{this.props.cta}</h4>
          {!this.state.expandedGallery &&
            this.ctaButton()
          }
        </section>
        <Gallery
          gallery={this.props.gallery}
          outfitId={this.props.outfitId}
          clickHandler={this.onProductClick}
        />
        {!!this.state.expandedGallery &&
          this.ctaButton()
        }
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

App.propTypes = {
  state: PropTypes.object,
  mixpanelToken: PropTypes.string,
  id: PropTypes.number,
  gallery: PropTypes.array,
  actions: PropTypes.object,
  productId: PropTypes.number,
  outfitId: PropTypes.number,
  outfit: PropTypes.string,
  breakPoint: PropTypes.string,
  cta: PropTypes.string,
  ctaButton: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    state: state.app,
    mixpanelToken: state.app.mixpanelToken,
    gallery: state.app.gallery,
    productId: state.app.productId,
    cta: state.app.cta,
    ctaButton: state.app.ctaButton,
    outfitId: state.app.outfitId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
