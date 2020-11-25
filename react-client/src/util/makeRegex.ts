//creates regex for matching text exactly including special characters
export const makeSimpleRegex = (text: string) => {
  let specialCharacters = '\\.+*?[]^$(){}=!<>|:-';
  let regex = '';
  for (let i = 0; i < text.length; i++) {
    if (specialCharacters.indexOf(text[i]) !== -1) {
      regex += '\\';
    }
    regex += text[i];
  }
  return new RegExp(regex, 'gi');
};
