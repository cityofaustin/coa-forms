#!/bin/bash
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`

# $1: Name of the Directory
# $2: Path to get to the Directory
function link {
  echo "--------------------------------------------------------------"
  echo "##### Linking @cityofaustin/us-forms-system to $1 #####"
  echo "--------------------------------------------------------------"
  yarn link @cityofaustin/us-forms-system --cwd $2
}

for FORM in $(ls $CURRENT_DIR/../../forms);
do
  link $FORM $CURRENT_DIR/../../forms/$FORM
done;

for CHAPTERS in $(ls $CURRENT_DIR/../../shared/chapters);
do
  link $CHAPTERS $CURRENT_DIR/../../shared/chapters/$CHAPTERS
done;
