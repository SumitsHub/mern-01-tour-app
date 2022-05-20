export const excerpt = (str, count) => {
    if (str.length > 45) {
      str = str.substring(0, count) + "...";
    }
    return str;
  };