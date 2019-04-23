#!/bin/bash
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`

# $1: Name of the Directory
# $2: Path to get to the Directory
function unlink {
  echo "--------------------------------------------------------------"
  echo "##### Unlinking @cityofaustin/us-forms-system from $1 #####"
  echo "--------------------------------------------------------------"
  yarn unlink --cwd $2
}

for FORM in $(ls $CURRENT_DIR/../../forms);
do
  unlink $FORM $CURRENT_DIR/../../forms/$FORM
done;

for CHAPTERS in $(ls $CURRENT_DIR/../../shared/chapters);
do
  unlink $CHAPTERS $CURRENT_DIR/../../shared/chapters/$CHAPTERS
done;
