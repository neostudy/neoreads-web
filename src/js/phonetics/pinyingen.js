var pinyin = require("pinyin")

export function toPinyin(word) {
  return pinyin(word)
}