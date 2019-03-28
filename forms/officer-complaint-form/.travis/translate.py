#!/usr/bin/env python

import json, os, sys

translation_file = sys.argv[1]
file_to_translate = sys.argv[2]
language_code = sys.argv[3]
translate_routes = "--routes" in sys.argv
full_file_string = ""

if(language_code == None or language_code == ""):
    halt_translation("Translation code not provided, halting translation.")

print("\n\n")
print("> Translating")
print("\t(Dictionary)\t\t\ttranslation_file = " + translation_file)
print("\t(File to translate)\t\tfile_to_translate = " + file_to_translate)
print("\n\n")

#
# Helper functions
#

def file_exists(file_path):
	return os.path.exists(file_path)

def filter_string(inputstr):
	return inputstr.replace("%", "\"")

def load_json(file_path):
    try:
        with open(translation_file) as json_file:
            return json.load(json_file)
    except Exception as e:
        print("Could not load json file '" + file_path + "': " + str(e))
        return None

def halt_translation(message):
    print("\n\n\n---- HALTING TRANSLATION -----")
    print("Message: " + message)
    print("------------------------------\n\n\n")
    sys.exit(1) # Helpful to indicate Travis there has been a problem with the deployment

def key_length(key_str):
    return len(key_str)

def sort_dictionary(language_dict):
    return sorted(language_dict, key=key_length, reverse=True)




#
# Loading Locale settings
#
settings = load_json("./locale/settings.json")
routes = load_json("./locale/routes.json")
translations = load_json(translation_file)

#
# Loads the entire file into memory, where it will be patched
#
try:
    with open(file_to_translate) as f:
        full_file_string=f.read()
except Exception as e:
    halt_translation("Problem opening file to translate '" + file_to_translate + "': " + str(e))

#
# Let's check a few requirements
#
if(full_file_string == None or full_file_string==""):
    halt_translation("File to translate seems empty, stopping.")
if(translations == None):
    halt_translation("Translations file '" + translation_file + "' could not be loaded")
if(routes == None):
    halt_translation("Routes could not be loaded")
if(settings == None):
    halt_translation("Settings could not be loaded")


phrases_dict = None
translations_final = None

if(translate_routes):
    phrases_dict = sort_dictionary(translations["routes"])
    translations_final = translations["routes"]
else:
    phrases_dict = sort_dictionary(translations)
    translations_final = translations


for english_key in phrases_dict:
    translations_available = translations_final[english_key]
    p = filter_string(english_key) # phrase
    for language, translated_phrase in translations_available.items():
            if(language == language_code):
                t = filter_string(translated_phrase) # filter the translation
                print("{0} | Phrase: '{1}' = '{2}'".format(language, p, t))
                full_file_string = full_file_string.replace(p, t) # performs patch

print("\n\nSaving translations to file: " + file_to_translate)
with open(file_to_translate, "w") as f:
    f.write(full_file_string)


print("\n\n-")
print("- TRANSLATION FINISHED")
print("-\n\n")
