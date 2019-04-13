# Documentation for deployment functions

## `deploy.sh`
Primary deployment script. It is responsible for installing all dependencies, determining which forms should get deployed, and where those forms should be deployed. The script invokes these functions:
1. `build_form.sh`
2. `translate_form.sh`
3. `upload_form.sh`

---
## `build_form.sh`

Builds a form for production. Outputted to form's `/public/` directory.

args:
+ -f [ FORM ] : the name of the form you want to translate; corresponds to the directory name inside of `/src`.

ex: `bash deployment/build_form.sh -f officer-complaint-form`

---
## `translate_form.sh`
Translates a form into each of the languages specified in its `src/locale/settings.json`.

The resulting translated forms will be saved in their own public folders.
For example, a Spanish translated form will be saved in `public_es/`.

This program will translate the contents of the present condition of the form's `public/` directory. Whatever is in `public/` at the time of translation is what will be translated.

args:
+ -f [ FORM ] : the name of the form you want to translate; corresponds to the directory name inside of `/src`.

ex: `bash deployment/translate_form.sh -f officer-complaint-form`

---
## `upload_form.sh`
Syncs a built form to aws.
