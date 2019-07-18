var pinyin = require("pinyin")

export function toPinyin(word) {
  if (word == '於') {
    return ['yú']
  }
  return pinyin(word)
}