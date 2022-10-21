import natural from "natural";

import { RECYCLE_REQUESTS_DATA } from "../recyclerequests/data";

export default defineEventHandler((event) => {
  const wordDict = RECYCLE_REQUESTS_DATA.reduce((acc, request) => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(
      request.title + " " + request.description
    );

    for (let i = 0; i < tokens.length; i++) {
      const stem = natural.PorterStemmer.stem(tokens[i]);
      if (acc[stem]) {
        acc[stem] += 1;
      } else {
        acc[stem] = 1;
      }
    }

    return acc;
  }, {} as Record<string, number>);

  let sortedWords: { word: string; count: number }[] = [];
  for (let word in wordDict) {
    sortedWords.push({
      word: word,
      count: wordDict[word],
    });
  }

  sortedWords.sort((a, b) => {
    return b.count - a.count;
  });

  const topWords = sortedWords.slice(0, 10);
  let maxCount = topWords[0].count;
  for (let i = 0; i < topWords.length; i++) {
    if (topWords[i].count > maxCount) {
      maxCount = topWords[i].count;
    }
  }

  return {
    words: topWords,
    max: maxCount,
  };
});
