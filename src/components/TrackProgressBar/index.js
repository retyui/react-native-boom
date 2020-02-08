// @flow
import withProgress from "../../hocs/WithProgress";

import TrackProgressBar from "./component";

export default withProgress({ delayUpdate: 1111 })(TrackProgressBar);
