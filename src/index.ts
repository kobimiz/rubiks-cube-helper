import { app, BrowserWindow, globalShortcut } from 'electron'
import * as path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    const ret = globalShortcut.register('Escape', () => {
        app.quit();
    })

    if (!ret)
        console.log('reg failed');

    console.log(globalShortcut.isRegistered('Escape'))
})