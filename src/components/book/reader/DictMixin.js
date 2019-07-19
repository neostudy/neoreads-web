import { lookupICIBA } from "src/js/dict/iciba";

export default {
  methods: {
    lookupWord(word) {
      let self = this;
      lookupICIBA(word).then(res => {
        var dict = {};
        let data = res.data;
        dict.word = data.word_name;
        dict.symbols = [];
        for (let s of data.symbols) {
          var sym = {};
          sym.symbol = s.word_symbol;
          sym.mp3 = s.symbol_mp3;
          // 各种词性以及对应的意义
          dict.symbols.push(sym);
        }
        self.idata.dict = dict;
      });
    },

  }
}