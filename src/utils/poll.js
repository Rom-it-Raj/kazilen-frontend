export const startPolling = (task, interval = 10000) => {
  let timerId = null;

  const run = async () => {
    try {
      await task();
    } catch (err) {
      console.error("Polling task failed:", err);
    }
    timerId = setTimeout(run, interval);
  };

  run();

  return () => {
    if (timerId) clearTimeout(timerId);
  };
};
