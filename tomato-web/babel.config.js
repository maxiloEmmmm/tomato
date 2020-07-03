// module.exports = {
//   presets: [
//     ['@vue/app', {
//       useBuiltIns: "entry",
//       // corejs: { 
//       //   version: 3, 
//       //   proposals: true 
//       // }
//     }]
//   ]
// }

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
    plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}

