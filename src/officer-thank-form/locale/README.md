# Translations

The translations script for this form depends on these three files:

1. `settings.json` which the deployment system will look at first to see which languages it needs to translate to, at the time of this writing only Spanish.
2. `routes.json` which contains the url path of all stages of the form.
3. `translations.json` which contains all translations in all languages.



# Recomended Software & Tools

If you plan on making changes, I would suggest using these tools:

- [Smart Json Editor](http://www.smartjsoneditor.com/) which has a free version, it has a Graphic User Interface which should prevent problems with wrong syntax.
- [JSON Lint](https://jsonlint.com) is really useful if you decide to go commando and make the changes manually.



# File Description

The following are descriptions of each file and how they need to be used.

### File: settings.json

Sample Content:

```
{
  "supported_languages": ["es"]
}
```



The translation process looks at this file first, the form will not be translated if the language is not listed here. For context, the form in english is built into a folder called `public`,  settings.json is used to create a loop that helps copy the existing public folder into a separate directory called `public_es` (`es` being the language code being processed, then patches the contents of that folder and then publishes the files on s3.

You can add another language, for example `vi` for Vietnameese, `ar` for Arabic, etc. Which would look like this:

```
{
  "supported_languages": ["es", "vi", "ar"]
}
```

**\*\* Before you do, it is recomended that you FIRST make all your changes to the `routes.json` and  `translations.json` files, and THEN add the language here.**



### File: routes.json

Sample Content:

```
{
  "deployment_path": {
    "es": "policia-agradezca"
  },

  "routes":  {
    "%/police-thank/%": {
        "es": "%/policia-agradezca/%"
    },

    "%introduction%": {
      "es": "%introduccion%"
    },

    "%what-happened%": {
      "es": "%que-sucedio%"
    },

    "%share-evidence%": {
      "es": "%compartir-evidencia%"
    },

    "%officer-details%": {
      "es": "%detalles-oficial%"
    },

    "%witness-details%": {
      "es": "%detalles-testigos%"
    },

    "%about-you%": {
      "es": "%acerca-de-usted%"
    },

    "%review-and-submit%": {
      "es": "%revisar-y-enviar%"
    }
  }
}
```

The `deployment-path` key contains the url where the translation will be deployed to in s3, this is the actual url that will be used in forms.austin.gov, in the example above, the result would be: https://forms.austin.gov/policia-agradezca. For example, if you were to make a correction and change the value to `"something-else/in-spanish"` the end result would be https://forms.austin.gov/something-else/in-spanish and the form would live there. If you were to add a vietnamese deployment path, you could make it look like this:

```
"deployment_path": {
    "es": "policia-agradezca",
    "vi": "your-vietnamese/complaint-path"
},
```



The `routes` key section contains an array of other "key => value" elements. Each of these elements is identified by a strange-looking key with the percentage symbol '%', (no need to understand this) but it is used replace double-quote characters in the translation process. For example, if we provide this key: `%review-and-submit%` it means the translator will search for `"review-and-submit"` and replace it in spanish with `"revisar-y-enviar"`This helps us prevent breaking the javascript code and crash the app, this is very important. If you were to add a Vietnamese translation to that specific route, you could make it look like this:

```
"%review-and-submit%": {
      "es": "%revisar-y-enviar%",
      "vi": "%your-vietnamese-review-and-submit%"
    }
```



**\*\* Please note that the language codes `es, vi, ar, etc.` need to match the same code as written in the *settings.json* file above**



### File: translations.json

Sample Content:

```
{
  "Required information": {
    "es": "Informacion Requerida"
  },

  "What happened": {
    "es": "Que sucedio"
  },

  "Optional information": {
    "es": "Informacion Opcional"
  },

  "Officer(s) involved": {
    "es": "Agentes de policia involucrados"
  }
}
```



The translation script will iterate through each of the keys and the current language. There are very important rules that need to be followed.



# The Rules

1. Organize long strings and paragraphs, they should go first (see update below).

2. Organize short finite strings, such as "Upload", or "Update" to be last (see update below).

3. Code translations is allowed, as long as you know the exact string in the file `public/js/app.bundle.json`. For example, if you know that file contains a button witht this code `<button>Upload File Here</button>` you could write a rule: `"<button>Upload File Here</button>": { "es": "<button>Suba Archivo Aqui</button>" }`

4. Use the percentage symbol `%` as much as possible.

5. Always check your syntax with JsonLint.

**\*\*Update: the script automatically sorts the english keys longest first to shortest last; however, it is still good practice to arrange them in a way that makes sense to the human translaton.\*\***

Why do short strings need to be last? Imagine you have a long paragraph you want to translate: `This is my great rainbow paragraph I need to translate first.` But you placed a short translation first for the word `rainbow` to `arcoiris` in spanish. So the translator will translate all text in the form, including the paragraph you want translated to `This is my great arcoiris paragraph I need to translate first` , then the script will try to find `This is my great rainbow paragraph I need to translate first` but it will not be able to find it and it will move on. This means the paragraph will not be translated, it will remain with the 'arcoiris' text.

#### Adding another language translation

Consider this rule, and say you want to add a translation in Vietnamese:

```
"Required information": {
    "es": "Informacion Requerida"
  },
```

We would simply have to add another line like this:

```
"Required information": {
    "es": "Informacion Requerida",
    "vi": "Thông tin bắt buộc"
},
```

And Arabic:

```
"Required information": {
    "es": "Informacion Requerida",
    "vi": "Thông tin bắt buộc",
    "ar": "معلومات مطلوبة"
},
```

** Notice the last element for 'ar' does not need a comma at the end.



# The recomended process

Until we find a better way to translate the website, this is the process I have followed to translate it. While you do not need to understand programming, it could help a lot if you can follow these steps:

You are encouraged to look at the `public/js/app.bundle.json` you can find it online [here](https://forms.austintexas.io/police-complain/js/app.bundle.js) or [here](https://forms.austin.gov/police-complain/js/app.bundle.js).

1. Find the string in the `app.bundle.json` file you want to translate (in English). For example, you want to translate a phrase `Find us on Facebook`. Open one of the links above in the browser, and find text using the keyboard shortcut [Ctrl]+[F] which will propmt you to enter a string to find in the mangled source code. You would type "Find us on Facebook" with the exact capitalization. 

2. If you can find the string, in the mangled code, and it looks like, for instance `scrambled.code("Find us on Facebook")).some(other).scrable(here) `You can see that the string is contained in quotation marks, this would be a great case for us to use  the percentage symbol '%', and this rule:

   ```
   "%Find us on Facebook%": {
       "es": "%Encuentranos en Facebook%"
   }
   ```
**\*\*Notice that the translation also needs to have the percentage characters.\*\***

3. Add spaces if necessary, if for example you see `scrambled.code("Find us on Facebook ")` (notice the whitespace after Facebook) you will need to modify the rule to `%Find us on Facebook %` (notice the white space before the `%` symbol)

#### The Percentage symbol '%'  and translating code.

While this approach is less than ideal, it is very functional and fast. It translates EVERYTHING, including the date-time controls, upload controls, etc. If there is text on the page, it can be translated without needing development skills.

Why the percentage symbol? We cannot use quotation marks in json format. Actually, we can, but it would be a royal mixup (worse than it already is).



