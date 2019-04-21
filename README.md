# COA Forms

Welcome to the consolidated forms repo for the City of Austin's alpha.austin.gov project!

Our forms are built using the [US Forms System](https://github.com/usds/us-forms-system-starter-app). Each form located in the `forms/` directory is populated by chapters located in `shared/chapters`. We use a forked version of the us-forms-system located at https://github.com/cityofaustin/us-forms-system.

Learn more about:
- [Dependencies](#Dependencies)
- [Modifying Chapters](#Modifying-Chapters)
- [Deployment](#Deployment)
- [Webpack](#Webpack)
- [Environment Variables](#Environment-Variables)
- [Linking to a local @cityofaustin/us-forms-system](#Link-to-a-local-@cityofaustin/us-forms-system)

## Dependencies
+ Install `jq` if you want to run translation/deployment scripts locally.
  + Mac users can run: `brew install jq`

## Modifying Chapters
The schema definitions for chapters are in `/shared/chapters/[CHAPTERS_DIR]`, where `$CHAPTERS_DIR` is an environment variable found within all `deployment/var` files of your form.

Multiple forms could share the same chapters if they both refer to the same `$CHAPTERS_DIR`. A reason to keep chapters separated is to allow incremental updates of dependencies like `@cityofaustin/us-form-system` without breaking other forms.

The chapters directory contains a distinct package.json and `@cityofaustin/us-forms-system`. Be sure to remember to update us-forms-system versions in the chapters directory, not just in the form's package.json.

## Deployment
To deploy a form, add its directory name to `dev_deploy_options.json` under `forms_to_deploy`. When a new commit is pushed to github, CircleCI will deploy all listed forms by running `run.sh`.

The S3 bucket destination for your form is determined by `DEPLOY_ENV` argument passed to `run.sh`. `circleci.config.yml` sets the `DEPLOY_ENV` for each git branch.

See more detailed information in [./deployment/README.md](./deployment/README.md).

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

These are the basic environment variables that should be in every form:
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
#### Debug
+ RUN_BUNDLE_ANALYZER: set to `true` if you want to run `webpack-bundle-analyzer`.

If you need to add any new environment variables for your specific form, you must add them:
1. to the appropriate `deployment/vars/` files
2. as a `webpack.DefinePlugin({'process.env':{...}})` in the appropriate `extraConfigs` object of `webpack.config.js`.

`deployment/vars` contains the source of truth about all environment variables. The `webpack.[x].js` configs are what actually inject those environment variables into your compiled code.

## Link to a local @cityofaustin/us-forms-system
Follow these steps to run coa-forms with a local version of `@cityofaustin/us-forms-system`.
1. Clone the repo.
    + `git clone https://github.com/cityofaustin/us-forms-system`
2. In us-forms-system, run
    + `yarn link`
3. Link inside of `coa-forms`. Note: you'll most likely want to link to your **chapters** directory, not the form directory itself.
    + `cd coa-forms/shared/chapters/[CHAPTERS_DIR]`
    + `yarn link @cityofaustin/us-forms-system`
4. After making changes to `us-forms-system` locally, run a build (within the `us-forms-system` repo!)
    + `cd us-forms-system`
    + `yarn build`

There are a couple of important steps to unlink a local repo.
1. Unlink inside of coa-forms.
    + `cd coa-forms/shared/chapters/[CHAPTERS_DIR]`
    + `yarn unlink`
2. Reinstall dependencies with the `--force` flag.
    + `yarn install --force`
