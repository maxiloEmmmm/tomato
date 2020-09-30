// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray, nativeImage} = require('electron')
const electron = require('electron')
const { session } = require('electron')
const path = require('path');

//托盘对象
var appTray = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  let screenSize = electron.screen.getPrimaryDisplay().workAreaSize
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 335,
    frame: false,
    //if frame: app height(390) + title height(22)
    height: 390,
    //titleBarStyle: 'hidden',
    title: '番茄钟',
    icon: '../common/favicon.ico',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  if(process.platform == 'darwin') {
    app.dock.hide()
  }else {
    mainWindow.setSkipTaskbar(true)
  }

  // and load the index.html of the app.
  mainWindow.loadFile('./dist-web/index.html')
  // mainWindow.loadURL('http://localhost:8081')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

    //系统托盘图标目录
    trayIcon = path.join(__dirname, 'asset/image');//app是选取的目录
  try {
    var png = nativeImage.createFromPath(path.join(trayIcon, 'tray.png'))
    var touch_png = nativeImage.createFromPath(path.join(trayIcon, 'touch_tray.png'))
    png = png.resize({
      width: 20,
      height: 20
    })
    touch_png = touch_png.resize({
      width: 20,
      height: 20
    })
    appTray = new Tray(png);//app.ico是app目录下的ico文件
    appTray.setPressedImage(touch_png)
  } catch (error) {
      console.log(error)
  }
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('我的托盘图标');
    function changeWindow(trayiconinfo){
      let x = (trayiconinfo.x + 335) < screenSize.width
          ? trayiconinfo.x 
          : trayiconinfo.x - 335
      let y
      if(process.platform == 'darwin') {
        y = trayiconinfo.y + 20
      }else {
        y = trayiconinfo.y - 390 < 0
          ? trayiconinfo.y + 20
          : trayiconinfo.y - 390
      }
      mainWindow.setBounds({x, y})
      mainWindow.moveTop()
      mainWindow.setAlwaysOnTop(true)
      mainWindow.show()
    }
    changeWindow(appTray.getBounds())
    //单击右下角小图标显示应用
    appTray.on('click',function(e, trayiconinfo, position){
        if(mainWindow.isVisible()) {
          mainWindow.hide()
        }else {
          changeWindow(trayiconinfo)
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
