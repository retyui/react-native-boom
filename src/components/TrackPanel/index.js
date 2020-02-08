// @flow
import { connect } from "react-redux";
import { compose } from "ramda";

import withNavigation from "../../../hocs/withNavigation";

import { authorizeFailure, authorizeSuccess } from "../actions";
import VkModal from "./component";
import { dismissModal } from "../../navigation/actions";

const mapDispatchToProps = (dispatch: any, { componentId }) => ({
  closeModal: () => {
    dispatch(dismissModal(componentId));
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
