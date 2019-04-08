#!/bin/bash
# check deployment/README.md for documentation
CURRENT_DIR=`dirname $BASH_SOURCE`

while getopts "f:" opt; do
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

FORM_PATH="$CURRENT_DIR/../src/$FORM"

if [ -z $FORM ]; then
  echo "ERROR: -f argument is mandatory. Please specify a form to translate."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM\" does not exist"
  exit 1
fi

# Begin #

for LANGUAGE in $(jq -r ".supported_languages[]" "$FORM_PATH/src/locale/settings.json");
do
  echo "Current Language code: ${LANGUAGE}";
  ORIGIN_PATH="$FORM_PATH/public";
  TRANSLATION_PATH="${ORIGIN_PATH}_${LANGUAGE}";

  echo "Copying: ${ORIGIN_PATH} to ${TRANSLATION_PATH}";
  echo "cp -r $ORIGIN_PATH $TRANSLATION_PATH;"
  cp -r $ORIGIN_PATH $TRANSLATION_PATH;

  echo "First, let's translate the routes:";
  python3 "$CURRENT_DIR/translate.py" "$FORM_PATH/src/locale/routes.json" "$TRANSLATION_PATH/js/app.bundle.js" "${LANGUAGE}" --routes

  echo "Then, let's translate the rest of the form:"
  python3 "$CURRENT_DIR/translate.py" "$FORM_PATH/src/locale/translations.json" "${TRANSLATION_PATH}/js/app.bundle.js" "${LANGUAGE}"

  DEPLOYMENT_PATH=$(jq -r ".deployment_path.${LANGUAGE}"  "$FORM_PATH/src/locale/routes.json")
done;
