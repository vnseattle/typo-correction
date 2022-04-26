/*************************************************************
Typo Correction 
© 2022 Henry Nguyen a.k.a Dev9x
This library is designed to suggest fixing misspelled
words from user input.
************************************************************/

// Using Levenshtein distance algorithm from hiddentao
const leven = require("fast-levenshtein");

/**
 * Correct multiple words
 * @param {*} input from user
 * @param {*} list of corrected words 
 * @param {*} learn: list of key-value words  
 * @returns {bestMatch: string , matches []}
 */
export const typoCorrections = (input, list, learn = []) => {
    const inputArr = input.split(" ");
    let result = "";
    let matches = [];
    inputArr.forEach((item) => {
        const correct = typoCorrection(item, list, learn);
        result = result + correct.best + " ";
        matches.push(correct.matches);
    });
    return { best: result, matches };
};

/**
 * Correct a single word
 * @param {*} input from user
 * @param {*} list of corrected words 
 * @param {*} learn: list of key-value words  
 * @returns {bestMatch: string , matches []}
 */
const typoCorrection = (input, list, learn = []) => {

    // Result object
    var result = {
        best: input,
        same: [],
        rank: 100
    };

    // Learn 
    const found = learn.find((word) => word.in === input);
    if (found) {
        result.best = found.out;
        result.rank = 1;
    }

    // Find word
    const others = [];
    list.forEach((word) => {
        if (word[0] === input[0]) {
            rank(input, word, result);
        } else {
            others.push(word);
        }
    });

    // Find more matches
    if ((result.rank === 1 && result.same.length === 0) || result.rank > 1) {
        others.forEach((word) => rank(input, word, result));
    }
    return { best: result.best, matches: result.same };
};

/**
 * Ranking by Levenshtein distance 
 * @param {*} input from user
 * @param {*} word  from list
 * @param {*} result object result
 */
const rank = (input, word, result) => {
    const score = leven.get(input, word);
    if (score < result.rank) {
        result.best = word;
        result.rank = score;
    }
    if (score === result.rank && result.rank <= 1 && result.best !== word) {
        result.same.push(word);
    }
    if (score === 0) {
        result.best = word;
        result.rank = score;
    }
};

export default typoCorrection;
