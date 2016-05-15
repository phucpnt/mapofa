import { connect } from 'react-redux';

import Mapofa from '../components/mapofa';
import * as counterActions from '../actions/counter';

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = counterActions; // { ...counterActions, ...};

export default connect(mapStateToProps, mapDispatchToProps)(Mapofa);
