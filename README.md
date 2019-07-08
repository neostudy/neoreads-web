# 衍星斋WEB | NeoReads Web

Website for neoreads, written in vue.js

使用Vue.js开发的纯网页前端，用来展示NeoReads的内容。未来会开发对应的APP。

欢迎大家提issue。

## 核心特色 | Core Features

- 阅读导向的学习系统
- 独创的互动式阅读模式
- 支持多种语言的双语阅读
  - 初期采用开源书籍
    - 中文古籍：[殆知阁](https://github.com/garychowcmu/daizhigev20)
    - 中文诗词：[中华诗词](https://github.com/chinese-poetry/chinese-poetry)
    - 英文书籍：[gutenberg](http://www.gutenberg.org/)
    - 日文书籍：[青空文庫](https://www.aozora.gr.jp/)
  - 未来打算引入更多正版书籍
- 独创的评注引用功能
- 温故知新： 碎片化学习进度管理
- 以文会友

## 近期计划 | TODO

近期先做核心功能：互动式阅读界面

- [x] 基本阅读界面
- [x] 章节目录导航
- [ ] 选定N句话，弹出操作窗口
- [ ] 评注定位：后端需要改为按句分隔的格式，每句、每段都分配ID。
- [ ] 评注定位：前端根据句、段ID定位相关标注。
- [x] 拼音标注：利用[pinyin](https://github.com/hotoo/pinyin)库实现汉语文章的拼音标注功能。
- [ ] 现在的拼音标注直接修改dom，与vue.js有冲突，改为纯vue.js实现
- [x] 英文字典查询：利用[iciba](http://open.iciba.com/?c=wiki&t=cc)API实现简单英文的单词查询功能。
- [ ] 中文字典（二选一）：
  - 利用[聚合数据](https://www.juhe.cn/docs/api/id/156)API实现简单的中文字典功能。
  - 利用[急速数据](https://www.jisuapi.com/api/cidian/)API实现简单的中文字典功能。
- [ ] 弹框字典界面
- [ ] 研究更好的字典与注音功能（比如采用后端实现）

## 版块 | Sitemap

- 首页|Home：常用信息入口，可以自定义
  - 书籍分类
  - 最近阅读
  - 书籍推荐
  - 温故概览
  - 知识图谱
  - 热门新闻
  - 好友近况

- 书斋|Library：管理书籍，进行学习
  - 书架
  - 阅读
  - 笔记

- 温故|Reviews：温习进度管理
  - 温习进度
  - 记忆曲线
  - 知识图谱填充进度

- 知新|News：文章与新闻
  - 热门事件跟踪
  - 正在发生的历史
  - 优质文章
  - 新闻真假识别

- 以文|Works：创作中心
  - 文章
  - 翻译
  - 评注
  - 新闻稿
  - 贴子

- 会友|Friends：论坛与笔友
  - 书籍论坛
  - 话题论坛
  - 问答社区
  - 笔友社交
