const PromiseWrapper = async (promise) => {
  let result;
  let error;
  try {
    result = await promise;
  } catch (err) {
    error = err;
  }

  return [result, error];
};

module.exports = PromiseWrapper;
