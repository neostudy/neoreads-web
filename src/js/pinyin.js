// TODO: 现在支持的拼音形式是这样的：比如“研”字，写为'ya2n'，未来要支持写为'yan2'的格式
// 可以参考声调标注规则：
// 声调标注规律
// 1.a o e i u ü 标调按顺序,‘i、u并排标后头’,小ü 碰到j q x y 就...
// 2.a母出现不放过, (即韵母中凡是有a的,标在a上。如lao,标在a上)
// 3.没有a母找 o e , (没有a,但有o 或e的,标在 o 或e 上。如lou标在o上...
// 4.i u并列标在后, (i和 u并列时,标在后面。比如liu,标在u上,gui,标在i 上)...
// 5.单个韵母不必说。 (单个的韵母,当然就标它上面了)
var pinyin2toneMap = {
  "a1": "ā", "a2": "á", "a3": "ǎ", "a4": "à", // a
  "o1": "ō", "o2": "ó", "o3": "ǒ", "o4": "ò", // o
  "e1": "ē", "e2": "é", "e3": "ě", "e4": "è", // e
  "i1": "ī", "i2": "í", "i3": "ǐ", "i4": "ì", // i
  "u1": "ū", "u2": "ú", "u3": "ǔ", "u4": "ù", // u
  "v0": "ü", "v1": "ǖ", "v2": "ǘ", "v3": "ǚ", "v4": "ǜ", // v
  "n2": "ń", "n3": "ň", "m2": "" // 其他
};

var toneToPinyinMap = (function (m) {
  var rmap = {};
  for (var i in m) rmap[m[i]] = i;
})(pinyin2toneMap);

export function removeTone(pinyin) {
  return pinyin.replace(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜńň]/g, function (m) {
    return toneToPinyinMap[m][0];
  });
}

export function makeTone(pinyin) {
  return (pinyin || "").replace(/[a-z]\d/g, function (m) {
    return pinyin2toneMap[m] || m;
  });
}