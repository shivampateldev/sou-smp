const debugLogsEnabled =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_BROWSER_LOGS === "true";

const noop = () => {};

const bindConsoleMethod = (method: keyof Console) => {
  const original = console[method];

  if (typeof original !== "function") {
    return noop;
  }

  return original.bind(console);
};

const originalConsole = {
  log: bindConsoleMethod("log"),
  info: bindConsoleMethod("info"),
  debug: bindConsoleMethod("debug"),
  warn: bindConsoleMethod("warn"),
  error: bindConsoleMethod("error"),
};

const shouldIgnoreWarning = (firstArg: unknown) =>
  typeof firstArg === "string" &&
  (firstArg.includes("React Router Future Flag Warning") ||
    firstArg.includes("was preloaded using link preload but not used within a few seconds"));

export const configureBrowserConsole = () => {
  if (!debugLogsEnabled) {
    console.log = noop;
    console.info = noop;
    console.debug = noop;
    console.warn = noop;
    console.error = noop;
    return;
  }

  console.warn = (...args: unknown[]) => {
    if (shouldIgnoreWarning(args[0])) {
      return;
    }

    originalConsole.warn(...args);
  };
};

