const gridStyle = (numberOfPics) => {
  let columns = 0;
  let rows = 0;
  let size = "1fr";
  if (numberOfPics <= 10) {
    columns = numberOfPics / 2;
    rows = 2;
    size = "0.3fr";
  } else if (numberOfPics <= 15) {
    columns = numberOfPics / 3;
    rows = 3;
    size = "0.4fr";
  } else {
    columns = numberOfPics / 4;
    rows = 4;
  }
  const style = {
    "grid-template-columns": `repeat(${columns}, ${size})`,
    "grid-template-rows": `repeat(${rows}, ${size})`,
  };
  return style;
};

export { gridStyle };
