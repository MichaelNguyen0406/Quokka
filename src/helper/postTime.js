import { formatDistanceToNow } from "date-fns";

// eslint-disable-next-line react/prop-types
const postTime = (timestamp) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  return timeAgo.replace("about", ".");
};

export default postTime;
