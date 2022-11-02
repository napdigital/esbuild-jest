import * as fs from 'fs'
import { symlinkDir } from 'aria-build'

export default {
  plugins: [
    {
      name: 'copy',
      buildEnd: async () => {
        await fs.promises.mkdir('dist', { recursive: true })
        const pkg = require('./package.json')
        delete pkg.scripts
        delete pkg.devDependencies
        await Promise.all([ 
          fs.promises.writeFile('./dist/package.json', JSON.stringify(pkg, null, 2)),
          fs.promises.copyFile('./README.md', './dist/README.md'),
          fs.promises.copyFile('./.npmrc', './dist/.npmrc')
        ])
      }
    },
    {
      name: 'link',
      buildEnd: () => symlinkDir('./dist', './node_modules/esbuild-jest')
    }
  ]
}