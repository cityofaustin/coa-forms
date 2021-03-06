#!/bin/bash
# check .circleci/README.md for documentation
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=''
DEPLOY_ENV=''

while getopts "f:e:" opt; do
  case $opt in
    f )
      FORM=$OPTARG
      ;;
    e )
      DEPLOY_ENV=$OPTARG
      ;;
    \? )
      echo "Invalid option: -$OPTARG" >&2
      exit;
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      exit;
      ;;
  esac
done

FORM_PATH="$CURRENT_DIR/../../forms/$FORM"
ENV_VAR_PATH="$FORM_PATH/deployment/vars/$DEPLOY_ENV.sh"

if [ -z $FORM ]; then
  echo "ERROR: -f argument is required. Please specify a FORM to translate."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM\" does not exist"
  exit 1
elif [ -z $DEPLOY_ENV ]; then
  echo "ERROR: -e argument is required. Please specify a DEPLOY_ENV."
  exit 1
elif [ ! -f $ENV_VAR_PATH ]; then
  echo "ERROR: env variable file \"$ENV_VAR_PATH\" does not exist"
  exit 1
fi

##### Begin #####

# Run "webpack" command in form's directory, pass env variable to webpack.config.js
yarn --cwd $FORM_PATH webpack --env $DEPLOY_ENV
