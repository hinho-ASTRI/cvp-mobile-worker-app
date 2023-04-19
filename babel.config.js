module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "nativewind/babel",
      require.resolve("expo-router/babel"),
      "react-native-reanimated/plugin",
    ],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".ts", ".tsx", ".json"],
          alias: {
            /**
             * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
             */
            "^~(.+)": "./src/\\1",
          },
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      "nativewind/babel",
      require.resolve("expo-router/babel"),
    ],
  };
};
