// @flow
import addSeconds from "date-fns/addSeconds";
import format from "date-fns/format";

const SECOND_IN_ONE_HOUR = 3600;

const getUTCDate = date =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

export const formatDuration = (seconds: number): string =>
  format(
    addSeconds(getUTCDate(new Date(0)), seconds),
    seconds > SECOND_IN_ONE_HOUR ? "hh:mm:ss" : "m:ss"
  );
