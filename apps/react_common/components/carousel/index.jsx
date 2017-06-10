/* eslint react/sort-comp: 0, array-callback-return: 0 */
/* eslint padded-block: 0 */
import React, { Component, PropTypes } from 'react';
import JS from '../../helpers/library';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id || 'slider',
      slidesToScroll: this.props.slidesToScroll || 1,
      autoplay: this.props.autoplay,
      autoplaySpeed: this.props.autoplaySpeed || 7000,
      arrows: this.props.arrows,
      fadeOnMobile: false,
      fade: this.props.fade || false,
      responsive: this.props.responsive,
      currentBreakPoint: 'desktop',
      aspectRatio: this.props.aspectRatio,
    };

    if (!!JS.isMobile() && !!this.state.fade) {
      this.state = Object.assign({}, this.state, {
        fade: this.state.fadeOnMobile
      });
    }

    this.slidesToScroll = this.state.slidesToScroll;

    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount() {
    this.slider = document.getElementById(this.state.id);
    this.hoderWrapper = this.slider.querySelector('div[data-carousel="holder"]');
    this.holder = this.slider.querySelector('ul');

    this.isPlaying = false;
    this.currentSlide = 0;
    this.longTouch = false;

    if (!!this.state.arrows) {
      this.prevButton = this.slider.querySelector('button[data-button="prev"]');
      this.prevButton.setAttribute('disabled', 'disabled');
    }

    if (this.state.aspectRatio && typeof this.state.aspectRatio === 'string') {
      const aspect = this.state.aspectRatio.split(':');

      this.hoderWrapper.style.padding = `0 0 ${aspect[1] / aspect[0] * 100}%`;
      this.holder.style.position = 'absolute';
    }

    this.slidesSetup();

    window.onresize = () => {
      window.clearTimeout(this.winResize);

      this.winResize = setTimeout(() => {
        this.onresizeEnd();
      }, 500);
    };

    if (!!this.state.autoplay && !JS.isMobile()) this.autoPlay();
    if (!!JS.isMobile()) this.mobileEvents();
  }

  onresizeEnd() {
    this.slidesSetup();
  }

  shouldComponentUpdate() {
    this.slidesSetup();

    return true;
  }

  slidesSetup() {
    this.slides = this.slider.querySelectorAll('li');

    this.slideWidth = this.hoderWrapper.offsetWidth;
    this.holder.style.width = `${this.slides.length}00%`;
  }

  onBreakPointUpdate(breakpoint) {
    this.setState({
      currentBreakPoint: breakpoint,
      slidesToScroll: this.slidesToScroll
    });
  }

  responsive() {
    const mobile = 480;
    const tablet = 600;
    const arr = this.props.responsive;

    window.onresize = (e) => {
      if (e.target.innerWidth <= mobile) {
        if (this.slidesToScroll !== arr.mobile.slidesToScroll) {
          this.slidesToScroll = arr.mobile.slidesToScroll;
          this.onBreakPointUpdate('mobile');
        }
      } else if (e.target.innerWidth <= tablet) {
        if (this.slidesToScroll !== arr.tablet.slidesToScroll) {
          this.slidesToScroll = arr.tablet.slidesToScroll;
          this.onBreakPointUpdate('tablet');
        }
      } else {
        const slidesToScroll = this.props.slidesToScroll || 1;
        if (this.slidesToScroll !== slidesToScroll) {
          this.slidesToScroll = slidesToScroll;
          this.onBreakPointUpdate('desktop');
        }
      }
    };
  }

  mobileEvents() {
    this.holder.addEventListener('touchstart', (event) => {
      this.touchstart(event);
    });

    this.holder.addEventListener('touchmove', (event) => {
      this.touchmove(event);
    });

    this.holder.addEventListener('touchend', (event) => {
      this.touchend(event);
    });
  }

  touchstart(event) {
    this.longTouch = false;
    setTimeout(() => {
      window.longTouch = true;
    }, 250);

    this.touchstartx = event.touches[0].pageX;

    this.holder.className.replace(new RegExp('(?:^|\\s)' + 'animate' + '(?:\\s|$)'), ' ');
    [].forEach.call(this.slides, (slide) => {
      slide.classList.remove('animate');
    });
  }

  touchmove(event) {
    this.touchmovex = event.touches[0].pageX;
    this.movex = this.currentSlide * this.slideWidth + (this.touchstartx - this.touchmovex);

    if (this.movex < this.slideWidth * this.slides.length - (this.slideWidth * 0.5)) {
      this.holder.style.transform = `translate3d(-${this.movex}px,0,0)`;
    }
  }

  touchend() {
    const absMove = Math.abs(this.currentSlide * this.slideWidth - this.movex);
    const slidesCount = this.slides.length - 1;

    if (absMove > this.slideWidth / slidesCount || this.longTouch === false) {
      if (this.movex > this.currentSlide * this.slideWidth && this.currentSlide < slidesCount) {
        this.currentSlide++;
      } else if (this.movex < this.currentSlide * this.slideWidth && this.currentSlide > 0) {
        this.currentSlide--;
      }
    }

    this.changeSlide();
  }

  trackTranslate3d() {
    const translateOffset = `-${this.currentSlide * this.hoderWrapper.offsetWidth}px,0,0`;
    this.holder.className = 'animate';

    this.holder.style.transform = `translate3d(${translateOffset})`;

    const suported3d = window.getComputedStyle(this.holder).getPropertyValue('transform');
    if (!suported3d) {
      this.holder.style.WebkitTransform = `translate3d(${translateOffset})`;
    }
  }

  buttonsState() {
    if (!!this.state.arrows) {
      if (this.currentSlide === 0) {
        this.prevButton.setAttribute('disabled', 'disabled');
      } else {
        this.prevButton.removeAttribute('disabled');
      }
    }
  }

  toggleActiveClass() {
    [].forEach.call(this.slides, (slide) => {
      slide.classList.remove('active');
    });

    this.slides[this.currentSlide].className = 'active';
  }

  changeSlide() {
    if (!!this.state.fade) {
      this.toggleActiveClass();
    } else {
      this.trackTranslate3d();
    }

    this.buttonsState();

    if (this.props.hasOwnProperty('onSlideChange')) {
      this.props.onSlideChange(this.currentSlide);
    }

    if (!!this.isPlaying) this.resetAutoPlay();
  }

  nextSlide() {
    const last = this.slides.length - 1;

    if (this.currentSlide < last) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.changeSlide();
  }

  prevSlide() {
    if (this.currentSlide > 0) this.currentSlide--;

    this.changeSlide();
  }

  autoPlay() {
    this.startSlideshow = setInterval(() => {
      this.nextSlide();
    }, this.state.autoplaySpeed);

    this.isPlaying = true;
  }

  stopAutoPlay() {
    clearInterval(this.startSlideshow);
    this.isPlaying = false;
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.autoPlay();
  }

  getVideo(slide) {
    return (
      <video poster={slide.poster} controls>
        <source src={slide.src} type="video/mp4" />
      </video>
    );
  }

  getImage(slide) {
    if (slide.src === undefined) return <span>&nbsp;</span>;

    return (
      <img src={slide.src} alt="" />
    );
  }

  getImageAsSubItem(src, k) {
    const setWidth = `${100 / this.state.slidesToScroll}%`;
    return (
      <div key={k} data-role="item" style={{ width: setWidth }}>
        <figure>
          <img src={src} alt="" />
        </figure>
      </div>
    );
  }

  getGroupOfItems(group, k) {
    const items = [];
    const setWidth = `${100 / this.state.slidesToScroll}%`;
    const klass = (k === 0 && !!this.state.fade) ? 'active' : 'ssssss';

    group.map((s, key) => {
      items.push(this.getImageAsSubItem(s.src, key));
    });

    return (
      <li key={k} className={klass} style={{ width: setWidth }}>
        { items }
      </li>
    );
  }

  itemStyles(k) {
    const itemWidth = 100 / this.props.slides.items.length;
    let styles = {
      width: `${itemWidth}%`,
    };

    if (!!this.state.fade) {
      styles = Object.assign({}, styles, {
        left: `-${k * itemWidth}%`,
      });
    }
    return styles;
  }

  getItem(slide, k) {
    let item;
    const klass = (k === 0 && !!this.state.fade) ? 'active' : null;

    if (slide.type === 'image') item = this.getImage(slide, k);
    else if (slide.type === 'video') item = this.getVideo(slide, k);

    return (
      <li key={k} className={klass} style={this.itemStyles(k)}>
        {item}
      </li>
    );
  }

  buildSlides() {
    const items = [];

    if (this.state.slidesToScroll > 1) {
      const arr = this.props.slides.items;
      const size = this.slidesToScroll;
      const groups = arr.map((e, i) => {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter((e) => { return e; });

      groups.map((s, k) => {
        items.push(this.getGroupOfItems(s, k));
      });
    } else {
      this.props.slides.items.map((s, k) => {
        items.push(this.getItem(s, k));
      });
    }

    return items;
  }

  controlButtons() {
    return (
      <div>
        <button data-button="prev" onClick={this.prevSlide}></button>
        <button data-button="next" onClick={this.nextSlide}></button>
      </div>
    );
  }

  render() {
    return (
      <div data-carousel="carousel" id={this.state.id} className={!!this.state.fade ? 'fade' : null}>
        <div data-carousel="holder">
          <ul>
            { this.state.currentBreakPoint === 'mobile' && this.buildSlides() }
            { this.state.currentBreakPoint === 'tablet' && this.buildSlides() }
            { this.state.currentBreakPoint === 'desktop' && this.buildSlides() }
          </ul>
        </div>
        { !!this.state.arrows &&
          this.controlButtons()
        }
      </div>
    );
  }

}

Carousel.propTypes = {
  id: PropTypes.string,
  slides: PropTypes.object,
  slidesToScroll: PropTypes.number,
  fade: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  arrows: PropTypes.bool,
  onSlideChange: PropTypes.func,
  responsive: PropTypes.object,
  aspectRatio: PropTypes.string,
};

export default Carousel;
