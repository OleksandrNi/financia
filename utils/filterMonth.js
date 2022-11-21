const date = new Date();

export function filterMonth(date, arr, variant) {
  variant--;
  const dateNeed = {
    year:
      date.getMonth() - variant <= 0
        ? date.getFullYear() - 1
        : date.getFullYear(),
    month:
      date.getMonth() - variant <= 0
        ? 12 - variant
        : date.getMonth() - variant,
  };
  const filtered = arr.filter((el) => {
    const elDate = el.valueDate.split("-");
    if (elDate[0] == dateNeed.year && elDate[1] == dateNeed.month) return el;
  });
  return filtered;
}
