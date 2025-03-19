# Cucumber 🥒 - Orica Design System React Library

[![Build Status](https://dev.azure.com/blastiq/cosmos/_apis/build/status%2Fdesign%2Fcucumber-ci?branchName=main)](https://dev.azure.com/blastiq/cosmos/_build/latest?definitionId=294&branchName=main)

A component library for React projects implementing the Orica design system over the top of MUI.

It simplifies scaffolding of React application UIs, promoting design consistency.

## Installation

1. Ensure that you have access to the `cos` feed in Azure Artifacts for your project.
   - Add the file `.npmrc` to your project next to your `package.json`:
     ```
     registry=https://pkgs.dev.azure.com/blastiq/_packaging/cos/npm/registry/ 
     always-auth=true
     ``` 
   - Run vsts-npm-auth to get an Azure Artifacts token added to your user-level .npmrc file:
     ```
     vsts-npm-auth -config .npmrc
     ```
     (If the tool doesn't exist, install it using the following: )
     ```
     npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false
     ```

2. Install the npm package and some core dependencies.
   ```
   npm install @ods/cucumber @mui/material @mui/icons-material @emotion/react @emotion/styled material-ui-popup-state
   ```


## Development 🥒

`npm install` to grab the project dependencies.

`npm run build` will build the code in `./lib` and place the transpiled output in `./dist` along with type definition files (`.d.ts`).

The repo contains:
- Library code under `./lib`
- Test application code under `./src`

The test application can be debugged by running the dev server with `npm run dev`.

There are VSCode launch configurations included in the repo for launching and debugging with Chrome (or Chromium at the `CHROME_PATH` env variable)

Hot module reload is enabled for both the test app code and library code during debugging.

When referencing external npm packages in `package.json` that should not be bundled into the build, place them under "peerDependencies" rather than regular or development dependencies. Additionally, include them in `vite.config.ts` under the `build.rollupOptions.external` array.

## Publishing 🥒

The package is automatically published via an Azure Devops build pipeline when code is merged into `main`. The yaml file for the pipeline is located at `pipelines/build-pipeline.yml`.

The patch number of the package version is auto incremented each time the pipeline runs. The major and minor versions are both specified in the yaml file.

The pipeline can be manually run on other branches, in which case the package name will be appended with an alpha+datetime suffix `-alpha-yyyyMMddTHHmmss`.