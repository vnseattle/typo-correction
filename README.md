# Typo Correction
This library is designed to suggest fixing misspelled words from user input. 
There are three powerful features in this package:

- Multiple word checking
- Giving a list of suggestions
- A learning feature

![DidYouMeanGoogle](https://vnseattle.com/typoCorrection/GoogleDemo.png)

You can use it to mimic “Did you mean” from Google Search and correct command lines or specific words before searching. 

# LIVE Demo and Performance Test  
### [Code Sandbox 🚀 ](https://codesandbox.io/s/ohhktm?file=/src/typo-correction.js)

# Installation
```js
npm i typo-correction
```

# Usage 
```js
import typoCorrection, { typoCorrections } from "typo-correction";
```

```js
var result = typoCorrection(input,list,learn=[]);
```
- ```input``` from user
- ```list``` of corrected words 
- ```learn``` (optional) list of learning words { in: "", out: "" }

Single word :typoCorrection
```js
var correction = typoCorrection("wuman",["human","woman", "kuman","luman","wonder","winner"...] );
// correction.best -> woman
// correction.matches -> ["human","kuman","luman"] 
```
Multiple words: typoCorrections
```js
var correction = typoCorrections("wundor wuman",["human","woman", "kuman","luman","wonder","winner"...] );
// correction.best -> wonder woman
// correction.matches -> [[],["human","kuman","luman"]] 
```
# Advanced features
### Multiple word checking
In the modern searching system, the position of words does not matter as much as correct spelling does. For example: “wonder woman” and “woman wonder” would give the same result. So, we have designed a solution to correct each word in a string, while the position of words remains. 

- Using typoCorrection```s``` to check multiple words.

```js
var correction = typoCorrections("wundor wuman") // correction.best -> wonder woman
var correction = typoCorrections("wuman wonder") // correction.best -> woman wonder 
```

### Giving a list of suggestions
In some cases, we could get more than one correct answer. For example, if a user types “wuman”, it could be “woman” or “human” or "kuman". So, the library will give you the best answer: “woman”. The alternative answers are “human”,"kuman" for the user to select or train the system. 

- Using ```.matches``` to get a list of suggestions.

```js
var correction = typoCorrection("wuman",["human","woman", "kuman","luman","wonder","winner"...] );
correction.matches // -> ["human","kuman","luman"] 
```

### Learning feature
Based on different situations, we may have many different suggestions. For better user experiences, a learning function could be used for that purpose. For example, when the user types “wunder wuman”, the answer could be “wander woman”. This way they teach the system that “wonder woman” is a better suggestion. Consequently, the library will suggest “wonder woman” the next time the user searches.  

- Using array of objects ```{in:"wrong", out:"right"}``` to modify the result. 

```js
var correction = typoCorrections("wunder wuman",[...]);
// correction.best -> wander woman
var correction = typoCorrections("wunder wuman",[...],[{in:"wunder",out:"wonder"}]);
// correction.best -> wonder woman
```
### Performance and Quality
By using the Levenshtein algorithm with our research on user behaviors, this library would give users an extremely fast solution and accuracy in most cases.
You can test the performance live at this link. 
[🚀  CodeSandbox 🚀 ](https://codesandbox.io/s/ohhktm?file=/src/typo-correction.js)

## Thank you
I am thankful for the algorithm of Mr. Vladimir Levenshtein.
I appreciate developer Hiddentao for developing “fast-levenshtein”, which is used as a dependency of this library. 

### Happy coding
Dev9x