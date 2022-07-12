// Data Init
const empty = 'hiker://empty'
const selectColor = config.selectColor
const d = []

// Constant
const tabBar = [
  {
    id: '0',
    title: '频道',
  },
  {
    id: '1',
    title: '关注',
  },
  {
    id: '2',
    title: '设置',
  },
]

// Database
const tabKey = getItem('StreamLab.tabKey', '0')
const streamChannelKey = getItem('StreamLab.streamChannelKey')


// Methods
const makeSelectTitle = (title) => {
  return '‘‘’’<b><span style="color: '+selectColor+'">'+title+'</span></b>'
}

const tabBarView = () => {
  tabBar.forEach(tab => {
    d.push({
      title: tab.id === tabKey ? makeSelectTitle(tab.title) : tab.title,
      url: $(empty).lazyRule((id) => {
        setItem('StreamLab.tabKey', id)
        refreshPage(true)
        return 'hiker://empty'
      }, tab.id),
      col_type: 'scroll_button',
    })
  })
}

const sectionView = () => {
  switch (parseInt(tabKey)) {
    case 0: {

      break
    }
    case 1: {

      break
    }
    case 2: {
      d.push({
        url: 'http://192.168.5.188:3000',
        col_type: 'x5_webview_single',
        desc: '480&&list',
      })
      break
    }
  }
}

const baseParse = () => {
  tabBarView()
  sectionView()
  setResult(d)
}

baseParse()
