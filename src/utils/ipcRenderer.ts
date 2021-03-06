import { ipcRenderer, remote } from 'electron';
const { Menu, MenuItem } = remote;

const graphqlServerURL = 'http://localhost:4000/graphql';
const storyBookServerURL = 'http://localhost:6006/';

/**
 * Menut template
 */
const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall',
      },
    ],
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
    ],
  },
];

ipcRenderer.on('async-open-dev', (event, arg) => {
  console.log('async-open-dev reply event: ', event);
  console.log('Devtool status: ', arg.devtoolsOpend);
});

ipcRenderer.on('async-show-menu', (event, arg) => {
  console.log('async-show-menu reply event: ', event);
  console.log('Menu status: ', arg.menuOpened);
});

ipcRenderer.on('async-show-graphql', (event, arg) => {
  console.log('async-show-graphql reply event: ', event);
  console.log('Menu status: ', arg.graphqlServerOpened);
});

ipcRenderer.on('async-show-storybook', (event, arg) => {
  console.log('async-show-storybook reply event: ', event);
  console.log('Menu status: ', arg.storyBookServerOpened);
});

/**
 * Menu Setting
 */
const menu = new Menu();
menu.append(new MenuItem({
  label: 'Inspect',
  click() {
    ipcRenderer.send('async-open-dev', { openDevTools: true });
  },
}));

menu.append(new MenuItem({
  label: 'Graphql',
  click() {
    ipcRenderer.send('async-open-graphql', { graphqlServerURL });
  },
}));

menu.append(new MenuItem({
  label: 'Storybook',
  click() {
    ipcRenderer.send('async-open-storybook', { storyBookServerURL });
  },
}));

menu.append(new MenuItem({
  label: 'Show Menu',
  click() {
    ipcRenderer.send('async-show-menu', { showMenu: true, template });
  },
}));

menu.append(new MenuItem({
  label: 'Print',
  click() {
    ipcRenderer.send('print-pdf', { fileType: 'pdf' });
  },
}));

// add contextmenu to right click
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup({
    window: remote.getCurrentWindow(),
  });
}, false);
