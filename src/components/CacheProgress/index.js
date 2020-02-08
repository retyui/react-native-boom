// @flow
import { connect } from "react-redux";
import { branch, renderComponent, renderNothing } from "recompose";
import { compose } from "ramda";

import { isTrackIdInCacheQueue } from "../../features/cache/selectors";

import CacheProgress from "./CacheProgress";
import CheckIcon from "./CheckIcon";
import { isTrackCached } from "../../features/cache/selectors";

const mapStateToProps = (state, { trackId }) => ({
  isCached: isTrackCached(state, trackId),
  isInCacheQueue: isTrackIdInCacheQueue(state, trackId)
});

export default compose(
  connect(mapStateToProps),
  // $FlowFixMe
  branch(
    ({ isInCacheQueue }) => isInCacheQueue,
    renderComponent(CacheProgress)
  ),
  branch(({ isCached }) => !isCached, renderNothing)
)(CheckIcon);
