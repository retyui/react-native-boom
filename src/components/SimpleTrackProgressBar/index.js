// @flow
import withProgress from "../../hocs/WithProgress";

import SimpleTrackProgressBar from "./component";

export default withProgress({ delayUpdate: 1111 })(SimpleTrackProgressBar);
