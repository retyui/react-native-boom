// @flow
import { connect } from "react-redux";
import { compose } from "ramda";

import withNavigation from "../../../hocs/withNavigation";
import { deAuthorize } from "../../auth/actions";

import Home from "./component";

const mapDispatchToProps = {
  logOut: deAuthorize
};

export default compose(
  withNavigation(),
  connect(
    null,
    mapDispatchToProps
  )
)(Home);
