import React, { Component, PropTypes } from 'react';

export class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onProductClick(id) {
    this.props.clickHandler(id);
  }

  getImages() {
    const images = [];
    for (let key = 0; key < this.props.gallery.length; key++) {
      images.push(this.image(key, this.props.gallery[key]));
    }
    return images;
  }

  seeSimilar() {
    if (true) {
      // dont show for now
      return null;
    }

    return (
      <div>
        <span>See similar for</span>
        <span className="price">$xx.xx</span>
      </div>
    );
  }

  image(key, obj) {
    return (
      <li key={key} onClick={() => this.onProductClick(obj.id)}>
        <img src={obj.image} data-id={obj.id} alt="" />
        {this.seeSimilar()}
      </li>
    );
  }

  render() {
    return (
      <section data-component="gallery">
        <div data-gallery="wrapper">
          <ul>
            {this.getImages()}
          </ul>
        </div>
      </section>
    );
  }
}

Gallery.propTypes = {
  gallery: PropTypes.array,
  clickHandler: PropTypes.func,
};

export default Gallery;
