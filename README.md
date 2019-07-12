# COA Forms

Welcome to the consolidated forms repo for the City of Austin's alpha.austin.gov project!

Our forms are built using the [US Forms System](https://github.com/usds/us-forms-system-starter-app). Each form located in the `forms/` directory is populated by chapters located in `shared/chapters`. We use a forked version of the us-forms-system located at https://github.com/cityofaustin/us-forms-system.

Learn more about:
- [Dependencies](#Dependencies)
- [Local Development](#Local-Development)
- [Modifying Chapters](#Modifying-Chapters)
- [Deployment](#Deployment)
- [Webpack](#Webpack)
- [Environment Variables](#Environment-Variables)
- [Linking to a local @cityofaustin/us-forms-system](#Link-to-a-local-@cityofaustin/us-forms-system)

## Dependencies
+ Install `jq` if you want to run translation/deployment scripts locally.
  + Mac users can run: `brew install jq`
+ Run `yarn install-all` to install npm dependencies for all directories.

#### Why use the special "install-all" script?
As of 4/24/19 there are 4 distinct package.json files for different parts of coa-forms.
There is the the top level `/package.json` file. This is mainly used for webpack factory functions found in `/tools/webpack`. There is a `/package.json` for each of the forms: `/forms/officer-complaint-form` and `/officer-thank-form`. And there is a `/package.json` for the chapters shared by both forms in `/shared/chapters/OPO`.

#### To use a local version of @cityofaustin/us-forms-system:
1. Clone the repo.
    + `git clone https://github.com/cityofaustin/us-forms-system`
2. Within us-forms-system, run
    + `yarn link`
3. After making changes to `us-forms-system` locally, run a build (within the `us-forms-system` repo!)
    + `yarn build`
4. Back in coa-forms run `yarn link-all` to link all directories to use your local version of @cityofaustin/us-forms-system.
5. When you're done, run `yarn unlink-all` to unlink all directories from your local version of @cityofaustin/us-forms-system. This script will also reinstall @cityofaustin/us-forms-system from npm based on the version specified by each directories' `package.json`.

## Local Development

Run `yarn start` inside of your form's directory to run your form locally. Run `yarn start:bs` if you need to run your form locally with browserstack. Note: `start:bs` contains some configs that make your webpack-dev-server insecure. See: https://webpack.js.org/configuration/dev-server/#devserverdisablehostcheck.

To develop with a local version of us-form-system see: [Linking to a local @cityofaustin/us-forms-system](#Link-to-a-local-@cityofaustin/us-forms-system)

#### (WIP) Run Spanish Forms Locally
Not synced with webpack-dev-server yet, but we have an experimental way to work around this.
1. Install node module http-server globally with `yarn global add http-server`
2. run `yarn start:es` This triggers a the start-es.sh script found in tools/scripts.


## Modifying Chapters
The schema definitions for chapters are in `/shared/chapters/[CHAPTERS_DIR]`, where `$CHAPTERS_DIR` is an environment variable found within all `deployment/var` files of your form.

Multiple forms could share the same chapters if they both refer to the same `$CHAPTERS_DIR`. A reason to keep chapters separated is to allow incremental updates of dependencies like `@cityofaustin/us-form-system` without breaking other forms.

The chapters directory contains a distinct package.json and `@cityofaustin/us-forms-system`. Be sure to remember to update us-forms-system versions in the chapters directory, not just in the form's package.json.

## Deployment

Dev Branch/PR Builds are deployed to https://opo.austintexas.io/police-complain/[branch-name]

To deploy a form, add its directory name as a FORM parameter in new job in .circleci/config.yml.

The S3 bucket destination for your form is determined by `DEPLOY_ENV` argument passed to `run.sh`. `circleci.config.yml` sets the `DEPLOY_ENV` for each git branch.

See more detailed information in [./deployment/README.md](./deployment/README.md).

## Webpack

`yarn webpack --env dev` will run a local build (you must be inside your form's directory). This happens automatically when you run the webpackDevServer with `yarn start`.

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
