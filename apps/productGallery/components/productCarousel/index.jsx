import React, { PropTypes } from 'react';
import Carousel from 'react_common/components/carousel';

// inherits from Carousel Component
class ProductCarousel extends Carousel {

  constructor(props) {
    super(props);
    this.initialSlide();
  }

  componentDidMount() {
    super.componentDidMount();
    this.initialSlide();
    if (this.currentSlide > 0) this.prevButton.removeAttribute('disabled');
    this.trackTranslate3d();
  }

  initialSlide() {
    let initial = 0;
    this.props.slides.items.map((slide, key) => {
      if (slide.matchType === this.props.initialSlide) initial = key;
      return null;
    });

    this.currentSlide = initial;
  }

  changeSlide() {
    this.toggleActiveClass();
    this.trackTranslate3d();
    this.buttonsState();

    if (this.props.hasOwnProperty('onSlideChange')) {
      this.props.onSlideChange(this.props.slides.items[this.currentSlide]);
    }
  }

  getAd(slide) {
    return (
      <figure>
          <div>
            <p>{slide.id}</p>
          </div>
      </figure>
    );
  }

  getItem(slide, k) {
    let item;
    const klass = (k === this.currentSlide) ? 'active' : null;

    if (slide.type === 'image') item = this.getImage(slide, k);
    else if (slide.type === 'ad') item = this.getAd(slide, k);

    return (
      <li key={k} className={klass} style={this.itemStyles(k)} data-slide={slide.matchType}>
        {k === this.currentSlide && !!this.props.initialView &&
          <div className="overlay">
            <span />
            {this.controlButtons()}
            </div>
        }
        {item}
      </li>
    );
  }

  getImage(slide) {
    if (slide.src === undefined) {
      return <figure><div><p>We don't have this {slide.matchType} item</p></div></figure>;
    }

    return (
      <img src={slide.src} data-lazy={slide.src} alt="" />
    );
  }

}

ProductCarousel.propTypes = {
  onSlideChange: PropTypes.func,
  initialSlide: PropTypes.string,
  initialView: PropTypes.bool,
};

export default ProductCarousel;
