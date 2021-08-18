const timeFriendly = (timeInSec) => {
  let inHour = timeInSec/3600;
  if (inHour < 0.5) return '0h';
  return inHour + 'h';
}

export {
  timeFriendly,
};
