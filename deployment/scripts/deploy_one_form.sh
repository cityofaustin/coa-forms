#!/bin/bash

# Keeping this file outside of top level run.sh prevents environment
# variables from being contaminated between forms.
CURRENT_DIR=`dirname $BASH_SOURCE`
DEPLOY_ENV=$1
FORM=$2
FORM_PATH="$CURRENT_DIR/../../src/$FORM"
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
CHAPTERS_PATH="$CURRENT_DIR/../../src/shared/chapters/$CHAPTERS_DIR"
yarn --cwd $CHAPTERS_PATH install --production=false

# Build English Form and Upload to AWS
bash $CURRENT_DIR/build_form.sh -f $FORM -e $DEPLOY_ENV -u

# Build all translations for Form and Upload to AWS
bash $CURRENT_DIR/translate_form.sh -f $FORM -e $DEPLOY_ENV -u
