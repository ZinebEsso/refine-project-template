/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@refinedev/cli",
    "@refinedev/core",
    "@refinedev/devtools",
    "@refinedev/nextjs-router",
    "@refinedev/kbar",
    "@refinedev/nestjsx-crud",
    "@refinedev/antd",
    "@ant-design/icons",
    "antd",
    "js-cookie",
    "@ant-design/nextjs-registry"
  ],
  experimental: {
    optimizePackageImports: [
      "@refinedev/cli",
      "@refinedev/core",
      "@refinedev/devtools",
      "@refinedev/nextjs-router",
      "@refinedev/kbar",
      "@refinedev/nestjsx-crud",
      "@refinedev/antd",
      "@ant-design/icons",
      "antd",
      "js-cookie",
      "@ant-design/nextjs-registry"
    ],
  },
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Find the Babel loader rule
    const babelRule = config.module.rules.find((rule) =>
      rule.use && rule.use.loader === 'next-babel-loader'
    );

    // Add babel-plugin-import to the Babel loader
    if (babelRule && babelRule.use && babelRule.use.options) {
      if (!babelRule.use.options.plugins) {
        babelRule.use.options.plugins = [];
      }
      babelRule.use.options.plugins.push([
        'import',
        {
          libraryName: 'antd',
          style: 'css', // or 'true' if you're using less
        },
      ]);
    }

    return config;
  },
};

export default nextConfig;