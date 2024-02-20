import openProps from "open-props";

import postcssBundler from "@csstools/postcss-bundler";
import postcssMinify from "@csstools/postcss-minify";

import postcssJitProps from "postcss-jit-props";

import postcssGlobalData from "@csstools/postcss-global-data";
import postcssCustomMedia from "postcss-custom-media";

import postcssPresetEnv from "postcss-preset-env";

export const plugins = [
  postcssBundler(),
  postcssGlobalData({
    files: [
      "node_modules/open-props/media.min.css",
    ],
  }),
  postcssCustomMedia({
    preserve: false,
  }),
  postcssJitProps(openProps),
  postcssPresetEnv({}),
  postcssMinify(),
];
