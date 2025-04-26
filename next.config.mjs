/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [

    "@refinedev/core",
    "@refinedev/devtools",
    "@refinedev/nextjs-router",
    "@refinedev/kbar",
    "@refinedev/nestjsx-crud",
    "@refinedev/antd",
    "@ant-design/icons",
    "antd",
  ],
  experimental:{
    optimizePackageImports :  [

      "@refinedev/core",
      "@refinedev/devtools",
      "@refinedev/nextjs-router",
      "@refinedev/kbar",
      "@refinedev/nestjsx-crud",
      "@refinedev/antd",
      "@ant-design/icons",
      "antd",
    ]
  },
  swcMinify: true,
  modularizeImports: {
    antd: {
      transform: "antd/es/{{member}}",
      preventFullImport: true,
    },
    "@ant-design/icons": {
      transform: "@ant-design/icons/es/icons/{{member}}",
      preventFullImport: true,
    },
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ["error", "warn"], 
    },
  },
  
  output: "standalone",

};

export default nextConfig;

