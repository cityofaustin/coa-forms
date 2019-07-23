#!/bin/bash
set -e

if [ "$CIRCLE_BRANCH" == "master" ]; then
  DEPLOY_ENV=staging
elif [ "$CIRCLE_BRANCH" == "production" ]; then
  DEPLOY_ENV=prod
else
  DEPLOY_ENV=dev
fi

CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=$1
FORM_PATH="$CURRENT_DIR/../../forms/$FORM"
ENV_VAR_PATH="$FORM_PATH/deployment/vars/$DEPLOY_ENV.sh"

if [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM\" does not exist"
  exit 1
elif [ -z $ENV_VAR_PATH ]; then
  echo "ERROR: env variable file \"$ENV_VAR_PATH\" does not exist"
  exit 1
fi

# Source environment variables
# eg: CHAPTERS_DIR
source $ENV_VAR_PATH

# Install dependencies for Form and its Chapters
yarn --cwd $FORM_PATH install --production=false
CHAPTERS_PATH="$CURRENT_DIR/../../shared/chapters/$CHAPTERS_DIR"
yarn --cwd $CHAPTERS_PATH install --production=false

# Build all locales for a Form using Webpack
$CURRENT_DIR/build_form.sh -f $FORM -e $DEPLOY_ENV

# Upload English Form to AWS
$CURRENT_DIR/upload_form.sh -f $FORM -e $DEPLOY_ENV

# Upload all translations for Form to AWS
for LANGUAGE in $(jq -r ".supported_languages[]" "$FORM_PATH/locale/settings.json");
do
  $CURRENT_DIR/upload_form.sh -f $FORM -e $DEPLOY_ENV -l $LANGUAGE
done;
