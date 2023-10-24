const path = require("path");

/**
 * @type {import('next-react-svg').NextReactSvgConfig}
 */
const nextReactSvgConfig = {
  include: path.resolve(__dirname, "src/assets/svg"),
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withReactSvg = require("next-react-svg")(nextReactSvgConfig);

module.exports = withReactSvg(nextConfig);
