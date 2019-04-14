# Documentation for Deployment Functions

## Summary of How Deployment Works
To deploy a form, add its directory name to `dev_deploy_options.json` under `forms_to_deploy`. When a new commit is pushed to github, CircleCI will deploy all listed forms by running `run.sh`.

The S3 bucket destination for your form is determined by `DEPLOY_ENV` argument passed to `run.sh`. `circleci.config.yml` sets the `DEPLOY_ENV` for each git branch.

+ The "master" branch uses DEPLOY_ENV="staging". This will source environment variables from your form's `deployment/vars/staging.env` and deploy to the staging S3 Bucket (as set in `staging.env`).
+ The "production" branch uses DEPLOY_ENV="prod". This will source environment variables from your form's `deployment/vars/prod.env` and deploy to the production S3 Bucket (as set in `prod.env`).
+ All other dev/feature/pull-request branches use DEPLOY_ENV="dev". This will source environment variables from your form's `deployment/vars/dev.env` and deploy to the pr S3 Bucket (as set in `dev.env`).

---
## `run.sh`
The top-level deployment script. It installs all root dependencies, determines which forms should get deployed, and runs `deploy_one_form.sh` for each of those forms.

args:
+ $1 DEPLOY_ENV: the deployment environment set by `circleci.config.yml` (dev, staging, prod, etc.).

ex: `bash deployment/run.sh dev`

---
## `deploy_one_form.sh`
Installs dependencies, builds, translates, and uploads all language builds to AWS. Invokes `build_form.sh` and `translate_form.sh`

args:
+ $1 DEPLOY_ENV: the deployment environment (dev, staging, prod, etc.). Determines which environment variables to use and the S3 Bucket to deploy to.
+ $2 FORM: the directory of the form to deploy

ex: `bash deployment/run.sh dev officer-complaint-form`

---
## `build_form.sh`

Builds a form for production. Outputted to form's `/public/` directory. Also uploads the build to S3 with `upload_form.sh` if a `-u` flag parameter is passed.

args:
+ -f FORM (required): the name of the form you want to build; corresponds to the directory name inside of `/src`.
+ -e DEPLOY_ENV (required): the deployment environment (dev, staging, prod, etc.). Determines which environment variables to use and the S3 Bucket to deploy to.
+ -u (optional flag): including `-u` will upload the form to S3 after the build. The S3 Bucket destination is determined by $DEPLOY_ENV.

ex: `bash deployment/build_form.sh -f officer-complaint-form -e dev`

---
## `translate_form.sh`
Translates a form into each of the languages specified in its `src/locale/settings.json`. Also uploads the build to S3 with `upload_form.sh` if a `-u` flag parameter is passed.

The resulting translated forms will be saved in their own public folders.
For example, a Spanish translated form will be saved in `public_es/`.

This program will translate the contents of the present condition of the form's `public/` directory. Whatever is in `public/` at the time of translation is what will be translated.

args:
+ -f FORM (required): the name of the form you want to translate; corresponds to the directory name inside of `/src`.
+ -e DEPLOY_ENV (only required with -u): the deployment environment (dev, staging, prod, etc.). Determines which S3 Bucket to deploy to if -u is passed.
+ -u (optional flag): including `-u` will upload the form to S3 after the build. The S3 Bucket destination is determined by $DEPLOY_ENV.

ex: `bash deployment/translate_form.sh -f officer-complaint-form`

---
## `upload_form.sh`
Syncs a built form to AWS.

args:
+ -f FORM (required): the name of the form you want to translate; corresponds to the directory name inside of `/src`.
+ -e DEPLOY_ENV (required): the deployment environment (dev, staging, prod, etc.). Determines which S3 Bucket to deploy to.
+ -l LANGUAGE (optional, null defaults to English): Specifies which translation to deploy. Corresponds to the build file suffix.

ex: `bash deployment/upload_form.sh -f officer-complaint-form -e dev -l es` will sync `officer-complaint-form/public_es` to the AWS PR Bucket for your particular branch.
