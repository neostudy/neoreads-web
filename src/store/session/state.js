const state = {
  selectContext: {
    pos: {
      bookid: '',
      chapid: '',
      paraid: '',
      sentid: '',
      start: 0,
      end: 0
    },
    note: {
      content: '',
    },
    text: '',
  },
  chapter: {
    title: '',
  },
  works : {
    activeMenu : '/works/articles'
  },
  news : {
    activeMenu: '/news/home'
  }
}

export default state