const REMOTE_URL = "https://ghproxy.com/https://raw.githubusercontent.com/TyrantG/StreamLab/main/"
const LOCAL_URL = "hiker://files/rules/TyrantG/StreamLab/"

let settingData
if (fileExist(LOCAL_URL+'data/setting.json') && request(LOCAL_URL+'data/setting.json')) {
  settingData = request(LOCAL_URL+'data/setting.json')
} else {
  settingData = request(REMOTE_URL+'data/setting.json')
}

initConfig(
    JSON.parse(settingData)
)
