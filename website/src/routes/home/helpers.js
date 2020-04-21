export const generateGreeting = () => {
  const d = new Date();
  const hours = d.getHours();
  if (hours > 12 && hours < 18) {
    return "Good afternoon";
  } else if (hours > 18) {
    return "Good evening";
  } else {
    return "Good morning";
  }
};
