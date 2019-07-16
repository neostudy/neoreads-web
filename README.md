# 衍星阁Web | NeoReads Web

使用Vue.js开发的纯网页前端，用来展示衍星阁学习平台。未来会开发对应的APP。

Website for neoreads, written in vue.js

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
- 温故知新：碎片化学习进度管理
- 以文会友：跨时间社交

## 近期计划 | TODO

近期先做核心功能：互动式阅读界面

### 互动式阅读界面

- [x] 基本阅读界面
- [x] 章节目录导航
- [x] 使用[makrdown-it](https://github.com/markdown-it/markdown-it)~~/[showdown](https://github.com/showdownjs/showdown)或[remark](https://github.com/remarkjs/remark)~~来实现其前端Markdown解析
- [ ] 采用vuex.store来管理全局状态（如isRuby）
- [x] 高亮鼠标悬停的句子
- [ ] 增加鼠标悬停高亮段落的模式。
- [ ] 增加鼠标悬停高亮字的模式。
- [x] 悬停在一句话上超过N秒，显示该句的浮动操作条
- [x] 收藏句子，以及高亮显示已有的收藏。
- [ ] 浮动操作条可拖拽。可以利用[Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)来实现。
- [ ] 选定一个词，弹出字典窗口
- [ ] 弹框字典界面
- [ ] 跨句子选定，自动扩充选择到整句边界
- [ ] 选定N句话，弹出操作窗口
- [ ] 阅读窗口右侧实现gutter，用来展示每段、每句的热度
- [x] 评注定位：后端需要改为按句分隔的格式，每句、每段都分配ID。
- [ ] 评注定位：前端根据句、段ID定位相关标注。
- [x] 拼音标注：利用[pinyin](https://github.com/hotoo/pinyin)库实现汉语文章的拼音标注功能。
- [x] 现在的拼音标注直接修改dom，~~与vue.js有冲突~~使用v-html暂时解决了冲突，未来还要考虑改为纯vue.js的component实现
- [x] 英文字典查询：利用[iciba](http://open.iciba.com/?c=wiki&t=cc)API实现简单英文的单词查询功能。
- [ ] 中文字典（二选一）：
  - 利用[聚合数据](https://www.juhe.cn/docs/api/id/156)API实现简单的中文字典功能。
  - 利用[急速数据](https://www.jisuapi.com/api/cidian/)API实现简单的中文字典功能。
- [ ] 研究更好的字典与注音功能（比如采用后端实现）
- [ ] 研究字、词、句的分级功能。
- [ ] 添加前端章节分页功能，去掉滚动条。

### 其他界面

- [ ] 利用vuex.store来存储和显示当前高亮的导航栏
- [ ] 面包屑导航

### 性能

- [ ] 资源打gzip包
- [x] 利用CDN减少bundle尺寸

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
