const File = java.io.File

const empty = 'hiker://empty'
const LOCAL_URL = "hiker://files/rules/TyrantG/StreamLab/"
const REAL_PATH = "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/TyrantG/StreamLab/"
const selectColor = config.selectColor
const d = []

const tabBar = [
  {
    id: '0',
    title: '频道',
  },
  {
    id: '1',
    title: '订阅',
  },
  {
    id: '2',
    title: '频道仓库',
  },
  {
    id: '3',
    title: '设置',
  },
]

const tabKey = getItem('StreamLab.tabKey', '0')
const streamChannelKey = getItem('StreamLab.streamChannelKey')

const makeSelectTitle = (title) => {
  return '‘‘’’<b><span style="color: '+selectColor+'">'+title+'</span></b>'
}

const getAllFilesByDir = (dir) => {
  const dirPath = new File(REAL_PATH+dir)
  if (dirPath.isDirectory()) {
    const fileList = dirPath.listFiles()
    let files = []
    for (let index in fileList) {
      files.push(fileList[index].getPath())
    }
    return files
  } else {
    dirPath.mkdirs()
    return []
  }
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
      const channels = getAllFilesByDir('channels')
      if (channels.length > 0) {

      } else {
        d.push({
          title: '还没有导入频道',
          col_type: 'text_center_1',
          url: $(empty).lazyRule(() => {
            setItem('StreamLab.tabKey', '2')
            refreshPage(true)
            return 'hiker://empty'
          }),
          extra: {
            lineVisible: false,
          },
        })
      }
      break
    }
    case 1: {

      break
    }
    case 2: {
      const channels = fetch("https://ghproxy.com/https://raw.githubusercontent.com/TyrantG/StreamLab/main/data/channels.json")
      channels.forEach(channel => {
        d.push({
          title: channel.title,
          desc: '0',
          url: 'hiker://empty',
          pic_url: channel.image,
          col_type: 'card_pic_3',
        })
      })
      break
    }
    case 3: {
      d.push({
        url: getPath(LOCAL_URL+'views/setting.html'),
        col_type: 'x5_webview_single',
        desc: '500&&list',
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
