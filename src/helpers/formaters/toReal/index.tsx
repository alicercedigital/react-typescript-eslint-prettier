const toRealString = (value: any) => {
  const realString = parseFloat(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
  return realString || 0;
};

export default toRealString;
