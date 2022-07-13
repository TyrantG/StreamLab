const File = java.io.File

const empty = 'hiker://empty'
const LOCAL_URL = "hiker://files/rules/TyrantG/StreamLab/"
const REAL_PATH = "/storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/TyrantG/StreamLab/"
const selectColor = config.selectColor

const makeSelectTitle = (title, quo) => {
  return quo ? '‘‘’’<b><span style="color: '+selectColor+'">'+title+'</span></b>' : '<b><span style="color: '+selectColor+'">'+title+'</span></b>'
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

const apiGet = (url) => {
  const json =  fetch("https://stream-lab.tyrantg.com/api/"+url)
  const { result_code, data, return_code, message } = JSON.parse(json)
  if (result_code === 'SUCCESS') {
    return data
  } else {
    toast(message)
    return []
  }
}

const apiPost = (url, body) => {
  const json =  fetch("https://stream-lab.tyrantg.com/api/"+url, {body: body})
  const { result_code, data, return_code, message } = JSON.parse(json)
  if (result_code === 'SUCCESS') {
    return data
  } else {
    toast(message)
    return []
  }
}
