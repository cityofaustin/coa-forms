#!/bin/bash
# check deployment/README.md for documentation
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=''
LANGUAGE=''

while getopts "f:l:" opt; do
  case $opt in
    f )
      FORM=$OPTARG
      ;;
    l )
      LANGUAGE=$OPTARG
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
TRANSLATION_PATH="${FORM_PATH}/public_${LANGUAGE}";

if [ -z $FORM ]; then
  echo "ERROR: -f argument is mandatory. Please specify a form to translate."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM_PATH\" does not exist."
  exit 1
elif [ -z $LANGUAGE ]; then
  echo "ERROR: -l argument is mandatory. Please specify a -l LANGUAGE."
  exit 1
elif [ ! -d $TRANSLATION_PATH ]; then
  echo "ERROR: translated build \"$TRANSLATION_PATH\" does not exist."
  exit 1
fi

##### Begin #####

echo "First, let's translate the routes:";
python3 "$CURRENT_DIR/translate.py" "$FORM_PATH/locale/routes.json" "$TRANSLATION_PATH/js/app.bundle.js" "${LANGUAGE}" --routes

echo "Then, let's translate the rest of the form:"
python3 "$CURRENT_DIR/translate.py" "$FORM_PATH/locale/translations.json" "${TRANSLATION_PATH}/js/app.bundle.js" "${LANGUAGE}"

echo "Now let's translate the index.html file where needed:"
python3 "$CURRENT_DIR/translate.py" "$FORM_PATH/locale/index.json" "${TRANSLATION_PATH}/index.html" "${LANGUAGE}"
