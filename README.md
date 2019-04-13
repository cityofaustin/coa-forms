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

## How to configure Webpack files and Environment Variables

Here's the hierarchy of webpack files:
+ `/tools/webpackCommonFactory` contains webpack configs that will be common to all forms. This is a factory function that builds `webpack.common.js` config files.
+ `src/[form]/webpack.common.js` contains options that are common to all webpack configs within that particular [form]. These options are used for both `webpack.local.js` and `webpack.prod.js`.
+ `webpack.local.js` is the webpack config that's used for running a local `webpack-dev-server`. This local development server is started by running `yarn start` within your [form]'s directory. Compiled files are outputted to the [form]'s `public/` directory.
+ `webpack.prod.js` is the webpack config that's used for building forms that will be deployed. Compiled files are outputted to the [form]'s `public/` directory.

Here's the hierarchy of environment variable files:
+ `src/[form]/deployment/vars/common.sh` contains environment variables that are common to all environments (dev, pr, and prod).
+ `local.sh` contains environment variables for running your local development `webpack-dev-server`.
+ `dev.sh` contains environment variables for deployed dev branches.
+ `prod.sh` contains environment variables for the deployed production branch.

If you need to add any new environment variables, you must add them to both:
1. the appropriate `deployment/vars/` file(s)
2. the appropriate webpack.[x].js file(s)

`deployment/vars` contains the source of truth about all environment variables. The `webpack.[x].js` configs are what actually inject those environment variables into your compiled code.
