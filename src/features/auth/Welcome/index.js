// @flow
import { connect } from "react-redux";
import { compose } from "ramda";

import withNavigation from "../../../hocs/withNavigation";

import { showVKLoginModal } from "../actions";
import WelcomeScene from "./component";

const mapDispatchToProps = {
  showLoginModal: showVKLoginModal
};

export default compose(
  withNavigation(),
  connect(
    null,
    mapDispatchToProps
  )
)(WelcomeScene);
