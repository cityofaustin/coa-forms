# what is this?

A first attempt at consolidating some of our repos, for ease of reference/maintenance in the future

# how I did this

After reading/contemplating a couple methods, I settled on this one for the initial merging:
https://help.github.com/en/articles/about-git-subtree-merges

Another option would be to import via submodules.
If for some reason we want to keep our current architecture but still have a consolidated repo for reference later that might be better.

# how to use

Since this used the subtree merge method, cloning this repo gets you all the code and history for the past repos.

## Dependencies

+ Install `jq` if you want to run translation/deployment scripts locally.
  + Mac users can run: `brew install jq`

## Webpack
Webpack configs for all environment are generated in your form's `webpack.config.js`. Compiled files are outputted to your form's `public/` directory.

`/tools/webpack/` contains the factory functions to build webpack configs for your specific form. These are settings that should be the same for all forms. If there are webpack settings that you'd like to add or overwrite for your specific form, they can be included in an `extraConfig` object in your form's own `webpack.config.js`.

Within `webpack.config.js`:
+ `webpackCommon` contains baseline configs that are used by both `webpackLocal` and `webpackDeployed`.
+ `webpackLocal` is used for building a local development server with `webpack-dev-server`.
+ `webpackDeployed` is used for deployed instances.

The `--env` parameter you pass to the webpack cli determines which set of environment variables gets sourced.

## Environment Variables

+ `local.env` contains environment variables for running your local development with `webpack-dev-server`.
+ `dev.env` contains environment variables for deployed dev branches.
+ `staging.env` contains environment variables for the staging deployment of the "master" branch.
+ `prod.env` contains environment variables for the deployed production branch.

#### AWS
+ DEPLOYMENT_BUCKET: s3 deployment bucket for a particular stage
+ DEPLOYMENT_PATH_EN: Deployment path for English build
+ DEPLOYMENT_PATH_ES: Deployment path for Spanish build
#### App
+ NODE_ENV: development, production, etc.
+ FORM_API_URL: address of Form backend API
#### Structure
+ FORM_DIR: the name of the directory containing the form
+ CHAPTERS_DIR: the name of the directory containing the chapters for your form: `/src/shared/chapters/<<CHAPTERS_DIR>>`

If you need to add any new environment variables for your specific form, you must add them:
1. to the appropriate `deployment/vars/` files
2. as a `webpack.DefinePlugin({'process.env':{...}})` in the appropriate `extraConfigs` object of `webpack.config.js`.

`deployment/vars` contains the source of truth about all environment variables. The `webpack.[x].js` configs are what actually inject those environment variables into your compiled code.
