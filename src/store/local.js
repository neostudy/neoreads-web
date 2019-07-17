function saveLocal(name, item) {
  if (!name) return
  if (typeof content !== 'string') {
    item = JSON.stringify(item)
  }
  console.log("into local:", item)
  window.localStorage.setItem(name, item)
}

function getLocal(name) {
  if (!name) return
  return window.localStorage.getItem(name)
}

function removeLocal(name) {
  if (!name) return
  window.localStorage.removeItem(name)
}

class LocalStore {
  constructor(name) {
    this.get = function () {
      let n = getLocal(name);
      if (!n)
        return;
      else
        return JSON.parse(n);
    };
    this.save = function (obj) {
      saveLocal(name, obj);
    };
    this.clear = function () {
      removeLocal(name);
    };
  }
}

export const DefaultLocalStore = new LocalStore('DEFAULT_LOCAL_STORE')
