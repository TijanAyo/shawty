const AsyncWrapper = async (func) => {
  let result;
  let error;
  try {
    result = await func();
  } catch (err) {
    error = err;
  }
};

module.exports = AsyncWrapper;
