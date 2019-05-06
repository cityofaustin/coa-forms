#!/bin/bash
set -e

CURRENT_DIR=`dirname $BASH_SOURCE`
while getopts "f:l:" opt; do
  case $opt in
    f )
      FORM=$OPTARG
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
ENV_VAR_PATH="$FORM_PATH/deployment/vars/local.sh"

if [ -z $FORM ]; then
  echo "ERROR: -f argument is mandatory. Please specify a form to translate."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM_PATH\" does not exist."
  exit 1
elif [ -z $ENV_VAR_PATH ]; then
  echo "ERROR: env variable file \"$ENV_VAR_PATH\" does not exist"
  exit 1
fi

# Source environment variables
# eg: DEPLOYMENT_PATH_ES
source $ENV_VAR_PATH

# Build Spanish Form with local env vars
yarn webpack --env local-es --cwd $FORM_PATH

mv $FORM_PATH/public_es $FORM_PATH/$DEPLOYMENT_PATH_ES

echo "-----------"
echo "Server running at localhost:8080/$DEPLOYMENT_PATH_ES"
echo "-----------"

http-server $FORM_PATH
