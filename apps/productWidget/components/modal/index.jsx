import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Ad from 'components/ad';
import 'stylesheets/productWidget/modal';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overflowY: false
    };

    this.dialogId = `spylightModal${this.props.outfitId}`;
    this.close = this.close.bind(this);

    this.host = process.env.HOST;
  }

  componentWillReceiveProps(next) {
    const dialogHeight = document.getElementById(this.dialogId).querySelector('[data-dialog="content"]').clientHeight;

    this.setState({
      overflowY: dialogHeight > next.viewportHeight
    });
  }

  close() {
    this.props.onClose();
  }

  render() {
    return (
      <dialog id={this.dialogId} open={this.props.open} onClick={this.close} data-overflow={this.state.overflowY} className={!!this.props.open ? 'active' : null}>

        <div data-dialog="wrapper">
          {!!this.props.ads.left && this.props.breakPoint === 'widescreen' &&
            <Ad />
          }
          <section className="styleboard_dialog_frame" data-dialog="content">
            <div data-dialog="iframeHolder">
              {this.props.hasOwnProperty('productId') && this.props.productId !== null &&
                <iframe
                  scrolling="no"
                  src={`${this.host}/widget?product_id=${this.props.productId}&outfit_id=${this.props.outfitId}&pub_id=${this.props.pubId}&session_id=${this.props.sessionId}&referral_url=${this.props.referralUrl}`}
                ></iframe>
              }
            </div>
            <button onClick={this.close}>Close</button>
          </section>

          {!!this.props.ads.right && this.props.breakPoint === 'widescreen' &&
            <Ad />
          }

        </div>

      </dialog>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  productId: PropTypes.number,
  outfitId: PropTypes.number,
  pubId: PropTypes.string,
  sessionId: PropTypes.string,
  referralUrl: PropTypes.string,
  mobile: PropTypes.bool,
  breakPoint: PropTypes.string,
  viewportHeight: PropTypes.number,
  ads: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    ads: state.modal.ads,
    productId: state.app.productId,
    outfitId: state.app.outfitId,
    pubId: state.app.publisherId,
    sessionId: state.app.sessionIdentifier,
    referralUrl: state.app.referralUrl,
  };
};

export default connect(
  mapStateToProps,
)(Modal);
