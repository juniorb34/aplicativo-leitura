import Moment from "moment";

export const datacao = date => {
  const daysAgo = -Moment(date).diff(Moment(), "days");
  if (daysAgo > 365) {
    return Moment(date).format("D MMM YYYY");
  } else if (daysAgo > 30) {
    return Moment(date).format("D MMM");
  }
  return Moment(date).fromNow();
};

export const capitalizar = (str = "") => {
  if (str === "") return str;
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
};

export const ordemData = list => {
  return list.sort((a, b) => b.timestamp - a.timestamp);
};

export const ordemVoto = list => {
  return list.sort((a, b) => b.voteScore - a.voteScore);
};
