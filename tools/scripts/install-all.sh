#!/bin/bash
set -e
CURRENT_DIR=`dirname $BASH_SOURCE`

# $1: Name of the Form
# $2: Path to get to the Form
function install_form {
  echo "--------------------------------------------------------------"
  echo "##### Installing $1 Dependencies #####"
  echo "--------------------------------------------------------------"
  yarn install --cwd $2
}

# $1: Name of the Form
# $2: Path to get to the Form
function install_chapters {
  echo "--------------------------------------------------------------"
  echo "##### Installing $1 Chapters Dependencies #####"
  echo "--------------------------------------------------------------"
  yarn install --cwd $2
}

echo "--------------------------------------------------------------"
echo "##### Installing Top Level coa-forms Dependencies #####"
echo "--------------------------------------------------------------"
yarn install

for FORM in $(ls $CURRENT_DIR/../../forms);
do
  install_form $FORM $CURRENT_DIR/../../forms/$FORM
done;

for CHAPTERS in $(ls $CURRENT_DIR/../../shared/chapters);
do
  install_chapters $CHAPTERS $CURRENT_DIR/../../shared/chapters/$CHAPTERS
done;
