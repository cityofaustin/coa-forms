#!/bin/bash
# check deployment/README.md for documentation
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=''
FORM_PATH="$CURRENT_DIR/../../forms/$FORM"
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

if [ -z $FORM ]; then
  echo "ERROR: -f argument is required. Please specify a FORM to translate."
  exit 1
elif [ -z $DEPLOY_ENV ]; then
  echo "ERROR: -e argument is required. Please specify a DEPLOY_ENV."
  exit 1
fi


#
# One step is to make sure we patch the hotjar code for prod only.
#
if [[ "${DEPLOY_ENV}" = "dev" ]]; then
    HOTJAR_CODE="<!-- Hotjar Tracking Code for https://opo-form.netlify.com/ or change url in their dashboard --> <script>(function(h, o, t, j, a, r){h.hj=h.hj || function(){(h.hj.q=h.hj.q || []).push(arguments);}; h._hjSettings={hjid: 1188991, hjsv: 6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script'); r.async=1; r.src=t + h._hjSettings.hjid + j + h._hjSettings.hjsv; a.appendChild(r);})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='); </script>"
    HOTJAR_SNIPPET_MARKER="<!--HotJarSnippet-->"
    sed -i'' -e "s%${HOTJAR_SNIPPET_MARKER}%${HOTJAR_CODE}%g" "${FORM_PATH}index.html"
fi;