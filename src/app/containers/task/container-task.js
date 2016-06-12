import { connect } from 'react-redux';
import { show } from '../iframe-3rd-party/action-iframe-full';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick(item) {
      return dispatch(show(item.link));
    }
  };
};

export default ComponentUI => connect(null, mapDispatchToProps)(ComponentUI);
