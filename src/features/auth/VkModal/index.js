// @flow
import { connect } from "react-redux";
import { compose } from "ramda";

import withNavigation from "../../../hocs/withNavigation";

import { authorizeFailure, authorizeSuccess } from "../actions";
import VkModal from "./component";
import { dismissModal } from "../../navigation/actions";

const mapDispatchToProps = (dispatch: any, { componentId }) => ({
  authorizeSuccess: (...args) => {
    dispatch(dismissModal(componentId));
    dispatch(authorizeSuccess(...args));
  },
  authorizeFailure
});

export default compose(
  withNavigation(),
  connect(
    null,
    mapDispatchToProps
  )
)(VkModal);
