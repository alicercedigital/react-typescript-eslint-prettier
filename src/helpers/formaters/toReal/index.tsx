const toRealString = (value: any) => {
  const realString = (parseFloat(value) || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
  return realString;
};

export default toRealString;
