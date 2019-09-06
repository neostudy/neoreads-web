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
- 以文会友：跨时间社交

## 近期计划 | TODO

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
- [ ] 全文详细阅读
- [x] 按时间排序
- [ ] 点击排序按钮顺序相反
- [ ] 按热门度排序
- [ ] 长文章在列表中的折叠和展开功能
- [ ] Markdown展示（现在用maven-editor的预览功能暂代）
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
- [ ] 书籍详细信息页面
- [x] 目录编辑
- [x] 标签编辑
- [ ] 发布/出版
- [ ] 分享书籍

#### 其他

- [x] 在会话中存储“以文”当前活跃的菜单栏

#### 发表的文章

- [ ] 文章发表功能（未发表时，只有自己可以看）
- [ ] 公开的文章页面，使用永久URL（类似github）
- [ ] 发表的文章，后台过滤添加各句子的ID
- [ ] 点赞
- [ ] 文章评论
- [ ] 文章笔记
- [ ] 文章引用

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

#### 其他界面

- [x] 利用vuex.store来存储和显示当前高亮的导航栏
- [x] 面包屑导航
- [x] 章节目录增加无滚动条滚动功能；或者实现自定义滚动条。
- [x] 首页推荐书籍
- [x] 首页显示工程版本号
- [ ] 版本更新日志页面

#### 通用控件

- [x] 支持非百分比（如13/17）的进度条
- [ ] 翻页的进度条
- [ ] 自动切换图标的排序按钮
- [ ] 自动切换状态的收藏图标
- [ ] Markdown展示控件（可以参考maven-editor的预览和沉浸式阅读的功能）

#### 性能

- [ ] 资源打gzip包
- [x] 利用CDN减少bundle尺寸

#### 安全

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

#### 代码质量

- [ ] 重构ReaderContent.vue模块，将独立的功能拆分出去。
- [ ] 研究不互相纠缠的mixin分割办法。

#### 技术

- [ ] 尝试用Vue.js的方式实现文章内容加载

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

## 运行

出于安全考虑，我们使用的第三方API的key并没有放在github上，所以运行程序前请修改 src/keys.js 文件，填入自己的keys：

```javascript
export default {
  iciba: "YOUR_ICIBA_KEY",
}
```

