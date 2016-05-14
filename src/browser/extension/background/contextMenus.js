import { popWindow, showTab } from '../utils/windows';

const menus = [
  ['Mapofa Test', ['all'], () => showTab('test')], // 'test' - is the html page name
  ['Mapofa', ['all'], () => popWindow('window')], // 'window' - is the html page name
];

function addToMenu(title, contexts, onclick, moreOptions) {
  chrome.contextMenus.create({
    title,
    contexts,
    onclick,
    ...moreOptions
  });
}

export default function createMenu() {
  menus.forEach(menu => { addToMenu(...menu); });
}
