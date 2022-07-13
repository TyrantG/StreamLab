require('hiker://page/Tool')

const d = []

const tabBar = [
  {
    id: '0',
    title: '订阅',
  },
  {
    id: '1',
    title: '收藏',
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
const streamChannelKey = getItem('StreamLab.streamChannelKey', '0')

const tabBarView = () => {
  tabBar.forEach(tab => {
    d.push({
      title: tab.id === tabKey ? makeSelectTitle(tab.title, true) : tab.title,
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
      const channel_setting_path = LOCAL_URL+'data/channel.json'
      let channel_setting = fetch(channel_setting_path)
      if (! channel_setting) {
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
      } else {
        channel_setting = JSON.parse(channel_setting)
        if (channel_setting.length > 0) {
          channel_setting.forEach((channel, index) => {
            d.push({
              title: streamChannelKey === index.toString() ? '['+channel.title+']' : channel.title,
              pic_url: channel.image,
              url: $(empty).lazyRule((index) => {
                setItem('StreamLab.streamChannelKey', index)
                refreshPage(true)
                return 'hiker://empty'
              }, index.toString()),
              col_type: 'icon_round_small_4',
            })
          })

          const current_channel = channel_setting[streamChannelKey]
          console.log(current_channel)
          try {
            require(current_channel.path)
            const result = pageParse()
            result.forEach(item => {
              d.push(item)
            })
          } catch (e) {
            log(e.toString())
          }
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
      }
      break
    }
    case 1: {

      break
    }
    case 2: {
      let channels = apiGet("channelList")
      channels.forEach(channel => {
        d.push({
          title: channel.title + makeSelectTitle('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;远程版本：'+channel.current.version, false),
          url: $(empty).rule((channel) => {
            require('hiker://page/Tool')
            const d = []
            setPageTitle('频道详情：'+channel.title)
            const list = apiGet("channelVersion?channel_id="+channel.id)

            d.push({
              title: '<big>版本列表<big>',
              col_type: 'rich_text',
            })

            list.forEach((item, index) => {
              d.push(
                  {
                    title: '版本：'+item.version+(index === 0 ? makeSelectTitle('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[最新]', true) : ''),
                    col_type: 'text_1',
                    extra: {
                      lineVisible: false,
                    },
                  },
                  {
                    title: item.updated_at,
                    url: empty,
                    col_type: 'text_2',
                  },
                  {
                    title: '导入此版本',
                    url: $(empty).lazyRule((channel, version) => {
                      require('hiker://page/Tool')
                      const channel_setting_path = LOCAL_URL+'data/channel.json'
                      let channel_setting = fetch(channel_setting_path)

                      const channel_path = LOCAL_URL+'channels/'+channel.author+'/'+channel.symbol+'.js'
                      const thisConfig = {
                        title: channel.title,
                        author: channel.author,
                        uuid: channel.uuid,
                        image: channel.image,
                        symbol: channel.symbol,
                        version: version.version,
                        version_number: version.version_number,
                        desc: version.desc,
                        md5: version.md5,
                        path: channel_path,
                      }

                      if (channel_setting) {
                        channel_setting = JSON.parse(channel_setting)
                        let hasChannel = null
                        channel_setting.forEach((item, index) => {
                          if (item.uuid === channel.uuid) {
                            hasChannel = index
                          }
                        })
                        if (hasChannel !== null) channel_setting.splice(hasChannel, 1)
                      } else {
                        channel_setting = []
                      }
                      channel_setting.push(thisConfig)
                      writeFile(channel_setting_path, JSON.stringify(channel_setting))
                      writeFile(channel_path, fetch(version.base_path))

                      return 'toast://导入成功'
                    }, channel, item),
                    col_type: 'text_2',
                  },
                  {
                    col_type: 'line',
                  }
              )
            })
            setResult(d)
          }, channel),
          pic_url: channel.image,
          // col_type: 'card_pic_3',
          col_type: 'avatar',
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
