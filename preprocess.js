const REMOTE_URL = "https://ghproxy.com/https://raw.githubusercontent.com/TyrantG/StreamLab/main/"
const LOCAL_URL = "hiker://files/rules/TyrantG/StreamLab/"

let settingData
if (! request(LOCAL_URL+'data/setting.json')) {
  settingData = request(LOCAL_URL+'data/setting.json')
  writeFile(LOCAL_URL+'data/setting.json', fetch(REMOTE_URL+'data/setting.json'))
}

writeFile(LOCAL_URL+'settings/release/index.html', fetch(REMOTE_URL+'settings/release/index.html'))
writeFile(LOCAL_URL+'settings/release/assets/index.css', fetch(REMOTE_URL+'settings/release/assets/index.css'))
writeFile(LOCAL_URL+'settings/release/assets/index.js', fetch(REMOTE_URL+'settings/release/assets/index.js'))

const setting_json = request(LOCAL_URL+'data/setting.json')
putVar('StreamLab.config', setting_json)
const setting = JSON.parse(setting_json)

initConfig(setting)
