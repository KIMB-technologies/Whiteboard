const fs = require("fs");
const path = require("path");

// init data
var translation = JSON.parse(fs.readFileSync(path.join(__dirname, "translations.json")))

// default language
var default_lang = "en";

// check for all languages if default key exists, if not use default value there
var must_have_keys = Object.keys(translation[default_lang])
Object.keys(translation).forEach((lang) => {
    must_have_keys.forEach( (key) => {
        if(!translation[lang].hasOwnProperty(key)){
            translation[lang][key] = translation[default_lang][key];
        }
    })
});

// export results
module.exports = {
    getAll : () => translation,
    getLanguages : () => Object.keys(translation)
}