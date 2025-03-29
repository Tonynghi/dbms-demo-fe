const vndFormat = (currency: number) => {
  const formattedNumber = new Intl.NumberFormat('en-US').format(currency);
  return `${formattedNumber} VNĐ`;
};

export default vndFormat;
