import natural from "natural";
import uFuzzy from "@leeoniya/ufuzzy";
import TTLCache from "@isaacs/ttlcache";
import LRUCache from "lru-cache";

import { Recyclable } from "~~/server/types";
import { firestore } from "~~/server/utils/firebase";
import { TABLE_NAME, normalizeRecyclable } from "./utils";

function tokenize(str: string): string[] {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(str);
  return tokens;
}

// Data cache for 5s
const cache = new TTLCache({ max: 1, ttl: 1000 * 5 });

async function getAllStrings() {
  if (cache.has(TABLE_NAME)) {
    return cache.get<{
      data: Recyclable[];
      strings: string[];
    }>(TABLE_NAME);
  }

  const ref = firestore.collection(TABLE_NAME);
  const snapshot = await ref.get();
  const data = snapshot.docs.reduce(
    (acc, value) => {
      const data = value.data() as Recyclable;
      acc.data.push(normalizeRecyclable(value));
      acc.strings.push(
        data.name +
          " " +
          data.tags.join(" ") +
          " " +
          data.material +
          " " +
          data.description
      );
      return acc;
    },
    {
      data: [],
      strings: [],
    } as {
      data: Recyclable[];
      strings: string[];
    }
  );

  cache.set(TABLE_NAME, data);
  return data;
}

// https://github.com/leeoniya/uFuzzy#options
let opts = {
  intraIns: 1,
};

let uf = new uFuzzy(opts);
const queryCache = new LRUCache({
  max: 20,
  ttl: 1000 * 5,
});

async function search(str: string) {
  if (queryCache.has(str)) {
    return queryCache.get(str);
  }
  const { data, strings } = await getAllStrings();

  // pre-filter
  let idxs = uf.filter(strings, str);

  let info = uf.info(idxs, strings, str);

  // order is a double-indirection array (a re-order of the passed-in idxs)
  // this allows corresponding info to be grabbed directly by idx, if needed
  let order = uf.sort(info, strings, str);

  // render post-filtered & ordered matches
  const matches = [];
  for (let i = 0; i < order.length; i++) {
    // using info.idx here instead of idxs because uf.info() may have
    // further reduced the initial idxs based on prefix/suffix rules
    matches.push(data[info.idx[order[i]]]);
  }
  queryCache.set(str, matches);
  return matches;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q } = query;

  const tokens = tokenize(q.toString().toLowerCase());

  const stems: Record<string, number> = {};
  for (let i = 0; i < tokens.length; i++) {
    const stem = natural.PorterStemmer.stem(tokens[i]);

    if (stem in stems) {
      stems[stem] += 1;
    } else {
      stems[stem] = 1;
    }
  }

  // Load allTABLE_NAME  return search(Object.keys(stems).join(" "));
});
