# 衍星阁Web | NeoReads Web

使用Vue.js开发的纯网页前端，用来展示衍星阁学习平台。未来会开发对应的APP。

Website for neoreads, written in vue.js

欢迎大家提出建议和问题。

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
- 以文会友：跨时间知识社交

## 版块 | Sitemap

- 书馆：管理书籍，进行学习
  - 书架
  - 阅读
  - 笔记

- 学堂：温习进度管理
  - 温习进度
  - 记忆曲线
  - 知识图谱填充进度

- 诗社：学习古诗，背诵默写
  - 收集古诗
  - 学习、温习
  - 背诵
  - 默写

- 报亭：文章与新闻
  - 热门事件跟踪
  - 正在发生的历史
  - 优质文章
  - 新闻真假识别

- 文斋：创作中心
  - 文章
  - 翻译
  - 评注
  - 新闻稿
  - 贴子

- 茶肆：论坛与笔友
  - 书籍论坛
  - 话题论坛
  - 问答社区
  - 笔友社交

## 中期计划 | Plan

- [x] **v0.1** - 基本阅读和温习功能（即“书斋”和“温旧”栏目的核心功能）
- [x] **v0.2** - 完成“文斋”栏目的框架，包括“文章”、“文集”、“书籍”的增删查改。
- [x] **v0.3** - 完成“报亭”栏目的核心功能：类似Reddit的外链新闻+利用“文章”实现的自制新闻。
- [ ] **v0.4** - 诗社
- [ ] **v0.5** - “茶肆”栏目的核心功能：个人主页、关注功能、时间线；论坛、私聊。
- [ ] **v0.6** - 完善阅读和温习功能：单词查询、释义、翻译、批注、引用；完善书斋界面；自制选择题和习题温习流程。
- [ ] **v0.7** - 完成所有栏目基本框架。完善常用细节（如排序、搜索、预览、验证等细节功能）。优化使用体验。
- [ ] **v0.8** - 完善安全机制：邀请制注册、第三方登录（与微信邀请制相结合）、密码重置；研究和解决常见SQL注入问题；研究常见前端安全问题。
- [ ] **v0.9** - 进行一遍完整的功能测试。上线进行内测。
- [ ] **v0.10** - 整理代码、注释和文档。优化代码，进行结构优化，以及某些关键的性能优化。编写开源说明文档。
- [ ] **v1.0** - 正式上线。

**v2.0** - 多语言。文档版本管理。文档协作。做成类似维基百科+GitHub式的书籍平台。增加思维导图、知识图谱、费曼学习法、复译法等学习工具，成为真正的学习平台。
**v3.0** - 更丰富的文档格式：图片、音频、视频、PPT、绘本、论文、商业文档。

## 近期计划

### 诗社

- [ ] 星目统计：改为每个有效动作自动获得一定数量的星星奖励，每首诗显示其累计星目。
- [ ] 个人星级：系统根据每首诗的星目，按照正态分布的原则划分星级。公分5个档次，即1~5星级。
- [ ] 诗歌评级：诗歌的总评级，可以根据全系统所有用户该诗的星目进行加权统计获得。每日更新一次。
- [ ] 学习模式：分为多个步骤，每个步骤有独自的界面，但均为左右双栏展示。向右刷动跳到下一步；所有步骤完成之后，进入到学习统计界面。

学习模式步骤如下：

- 看 - 默认界面，左侧展示诗歌内容，右侧详情栏展示诗歌基本信息。
- 吟 - 只显示各个字的注音（即只显示注音注释）。点击激活单字，并在右侧详情栏中显示该字的注音、候选注音、朗读等情况。未来加上全篇与逐句的朗读按钮。未来添加韵脚和平仄的展示。
- 读 - 逐字逐词注释，让读者可以了解到每个词的意思。点击激活单字，托选激活多字词，在右侧详情栏中显示该字或词的释义、候选释义、参考资料、其他类型批注等。
- 译 - 逐句对照翻译。可以逐句上下对照显示，未来增加左右双栏对照。点击激活单句，在右侧详情栏中显示该句的候选翻译，以及翻译编辑界面。
- 评 - 评论模式。右侧展示整诗的评论列表。点击激活单句，展示单句的评论列表。
- 结 - 一轮学习后，左侧展示本次学习所做出的的笔记，右侧展示本次学习的统计信息和奖励。

每一步学习都能获得对应的星星奖励，跳到下一步后，会在步骤栏中显示上一步的收获数量。

### 用户主页

可供他人访问的公开主页，类似于GitHub的用户主页

- [ ] 个人首页
- [x] 个人信息编辑-新建
- [ ] 个人信息编辑-修改
- [ ] 公开的学习进度（在读书籍进度等）
- [ ] 发布的作品（文章、札记、文集等）
- [ ] 分享的笔记、书单
- [ ] 正在参与的协作工程（翻译、协作书籍、开源代码等）
- [ ] 时间线
- [ ] 简历

### 知新

#### 新闻标签

- [x] 标签分类
  - [x] 话题标签（类似Reddit板块）
  - [x] 事件标签
  - [x] 人物标签
  - [x] 地点标签
  - [ ] 情绪标签
- [ ] 标签订阅
- [ ] 标签检验（防止作假）
- [ ] 发表记事
- [ ] 新闻推送
- [ ] 周刊、年刊（分标签制作）
- [ ] 官方年鉴（综合历史）
- [x] 新闻列表
- [ ] 新闻阅读界面
- [ ] 评论

- [x] 外链新闻，增加一个“内容摘要”的功能，让用户可以填入其新闻内容。
- [ ] 给常见的外链新闻“来源”增加其网站图标，如163新闻，人民日报等。

### 温故

- [x] 温习界面：书籍列表
- [x] 温习界面：章节列表
- [x] 温习界面：笔记列表

#### 笔记温习流程：

- [x] 温习流程：复读
- [ ] 温习流程：笔记复查
- [ ] 温习流程：习题
- [ ] 温习流程：标注贡献
- [ ] 温习流程：批注
- [ ] 温习流程：评论

#### 章节温习

- [ ] 段落摘要
- [ ] 章节摘要

#### 全书温习

- [ ] 全书梗概
- [ ] 全书感想
- [ ] 全书评论 
- [ ] meta信息更新
- [ ] 作者信息

#### 其他温习功能：

- [ ] 习题制作界面
- [ ] 温习规划界面
- [ ] 费曼学习法
- [ ] 复译法
- [ ] 思维导图

### 以文

#### 文章

- [x] 写文章
- [x] 文章列表
- [x] 文章修改
- [x] 展示修改时间
- [ ] 创建时间
- [x] 文章删除
- [x] 全文详细阅读
- [x] 按时间排序
- [ ] 点击排序按钮顺序相反
- [ ] 按热门度排序
- [ ] 长文章在列表中的折叠和展开功能
- [x] Markdown展示（现在用maven-editor的预览功能暂代）
- [ ] 列表中的概览（带缩略和展开功能）
- [ ] 沉浸式阅读（参考maven-editor的这个功能）

#### 文集

- [x] 增
- [x] 删
- [x] 查
- [x] 改

#### 书籍

- [x] 增
- [x] 删
- [x] 查
- [x] 改
- [ ] 书籍列表卡片：名字过长需要隐藏
- [x] 书籍详细信息页面
- [x] 目录编辑
- [x] 标签编辑
- [ ] 标签展示
- [ ] 发布
- [ ] 分享书籍

#### 协作

- [x] 上传新书
- [x] 编辑作者/协作者

#### 译作

- [ ] 翻译界面
- [ ] 重构reader界面，去掉分页功能
- [ ] 翻译的阅读界面引入Mardown解析
- [x] 英文作品上传时，后台进行分句操作，并添加paraid和sentid
- [x] 换一种方式在文件中保存paraid和sentid，与markdown相适应
- [ ] 利用markdown-it-attrs来处理paraid
- [ ] 写一个markdown-it插件来处理sentid
- [ ] 将翻译好的章节导出为markdown文件


#### 其他

- [x] 在会话中存储“以文”当前活跃的菜单栏
- [ ] 研究利用marp/remark/cleaver/reveal或其他md->ppt工具生成PPT
- [ ] 通过在'#'前自动加入'---'来动态创造演示文档（即演示模式）
- [ ] 学习如何发布ppt: https://www.deckset.com/ 
- [ ] 研究如何将MarkDown发布成电子书（mobi, epub, pdf等）。参考leanpub
- [ ] 研究如何实现动态历史地图（参考leaflet）
- [ ] 研究如何展示历史并行时间轴，比如春秋战国各国的年表并行展示，或者中国、古希腊并行展示。
- [x] 在码云上添加代码库

#### 发表的文章

- [ ] 文章发表功能（未发表时，只有自己可以看）
- [ ] 公开的文章页面，使用永久URL（类似github）
- [ ] 发表的文章，后台过滤添加各句子的ID
- [ ] 点赞
- [ ] 文章评论
- [ ] 文章笔记
- [ ] 文章引用


### 阅读

#### 权限管理

- [ ] 将书籍按照作者组织起来，用类似于GitHub的方式去管理子域名，这样也方便未来做“协作”功能（即同一本书，不同的用户有自己的版本）

#### 互动式阅读界面

- [x] 基本阅读界面
- [x] 章节目录导航
- [x] 使用[makrdown-it](https://github.com/markdown-it/markdown-it)~~/[showdown](https://github.com/showdownjs/showdown)或[remark](https://github.com/remarkjs/remark)~~来实现其前端Markdown解析
- [x] 采用vuex.store来管理全局状态（如isRuby）
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
- [x] 评注定位：前端根据句、段ID定位相关标注。
- [x] 拼音标注：利用[pinyin](https://github.com/hotoo/pinyin)库实现汉语文章的拼音标注功能。
- [x] 现在的拼音标注直接修改dom，~~与vue.js有冲突~~使用v-html暂时解决了冲突，未来还要考虑改为纯vue.js的component实现
- [x] 英文字典查询：利用[iciba](http://open.iciba.com/?c=wiki&t=cc)API实现简单英文的单词查询功能。
- [ ] 中文字典（二选一）：
  - 利用[聚合数据](https://www.juhe.cn/docs/api/id/156)API实现简单的中文字典功能。
  - 利用[急速数据](https://www.jisuapi.com/api/cidian/)API实现简单的中文字典功能。
- [ ] 研究更好的字典与注音功能（比如采用后端实现）
- [ ] 研究字、词、句的分级功能。


##### 分页功能

- [x] 添加前端章节分页功能，去掉滚动条。
- [ ] 改进前端分页，使之能支持拼音及排版设定修改的情况。
- [x] 增加滚轴或按键翻页的功能。
- [ ] 实现翻页动画效果
- [ ] 在章节开始和结尾页，自动跳转到上一章或下一章。
- [ ] 根据第一页的内容长度预估一章的页数，并实现章节阅读进度条。

#### 评注

- [x] 现在评注是每次刷新阅读界面都获取，需要修改为每章切换时获取
- [x] 笔记：基本CRUD操作。
- [ ] 现在是使用span.noteids来存储句子相关的笔记的，但在笔记/收藏更新的时候，并没有及时更新这个字段。

#### 交互界面

- [ ] 同一句话点了两个不同类型的批注，需要能够同时显示（现在sentid -> note 还是一对一的关系，需要改为一对多）
- [ ] 同一句话同一种类型的批注只能记录一个。以后只能在现有的基础上修改。

#### 格式模板

- [ ] 诗歌
- [ ] 绘本
- [ ] 论文
- [ ] 代码
- [ ] PPT

### 其他界面

- [x] 利用vuex.store来存储和显示当前高亮的导航栏
- [x] 面包屑导航
- [x] 章节目录增加无滚动条滚动功能；或者实现自定义滚动条。
- [x] 首页推荐书籍
- [x] 首页显示工程版本号
- [ ] 版本更新日志页面

### 通用控件

- [x] 支持非百分比（如13/17）的进度条
- [ ] 翻页的进度条
- [ ] 自动切换图标的排序按钮
- [ ] 自动切换状态的收藏图标
- [ ] Markdown展示控件（可以参考maven-editor的预览和沉浸式阅读的功能）
- [ ] 支持逐行笔记的代码展示控件，替换现在使用的highlight.js，参考：enlighterjs, prism.js, SyntaxHighlighter, Rainbow.js, SHJS 
- [ ] 用自己开发的markdown-it-paras插件替换markdown-it-attrs，用于给所有para添加ID（原因：现在的attrs插件不支持code）

### 性能

- [ ] 资源打gzip包
- [x] 利用CDN减少bundle尺寸

### 安全

- [x] 注册前端
- [x] 登录前端
- [x] JWT前端
- [x] JWT Token定时刷新
- [ ] 检测所有auth请求的结果，如果遇到401，则调用token_refresh尝试重新登录
- [x] 在JWT中增加PID
- [x] 利用Vuex实现简单的前端Auth
- [ ] 前端权限管理
- [ ] 使用[vuelidate](https://github.com/vuelidate/vuelidate)进行表单验证
- [ ] 提交修改时，验证PID，防止篡改它人文章。

### 代码质量

- [ ] 重构ReaderContent.vue模块，将独立的功能拆分出去。
- [ ] 研究不互相纠缠的mixin分割办法。

### 技术

- [ ] 尝试用Vue.js的方式实现文章内容加载
- [ ] 将所有用到`<faicon>`的地方封装成自己的控件，以方便未来切换图标库

### 产品创意

- [ ] 设计一套通用的互评审查流程，用于投票、点赞、内容修改、投诉等功能。
- [ ] 将系统中所有用到标签的地方统一起来。


## 运行

出于安全考虑，我们使用的第三方API的key并没有放在github上，所以运行程序前请修改 src/keys.js 文件，填入自己的keys：

```javascript
export default {
  iciba: "YOUR_ICIBA_KEY",
}
```

