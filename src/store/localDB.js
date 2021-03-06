//创建、检索indexedDB数据库
/*jshint esversion: 6*/
var db;
const dbName = 'Lists';

const request = window.indexedDB.open(dbName);

function waitDB() {
  return new Promise(resolve => {
    request.onerror = function (event) {
      console.log('open database failed');
    };
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (db.version == 1) {
        createTab('favorites');
        createTab('currentPlayingList');
      }
    };
    request.onsuccess = function (event) {
      db = request.result;
      resolve(db);
    };
  });
}

function createTab(tabName) {
  let tab;
  if (!db.objectStoreNames.contains(tabName)) {
    tab = db.createObjectStore(tabName, {
      keyPath: 'MUSICRID'
    });
    tab.createIndex('SONGNAME', 'SONGNAME', {
      unique: false
    });
    tab.createIndex('ARTIST', 'ARTIST', {
      unique: false
    });
  }
}

function add(item, table) {
  db.transaction([table], 'readwrite').objectStore(table).add(item);
}

function remove(item, table) {
  db.transaction([table], 'readwrite').objectStore(table).delete(item.MUSICRID);
}
function put(item,table) {
  db.transaction([table], 'readwrite').objectStore(table).put(item);
}
async function getTable(state, table) {
  if (db === undefined) {
    await waitDB();
  }

  let req=db.transaction([table], 'readonly')
    .objectStore(table)
    .getAll();

    req.onsuccess = function (event) {
      state[table] = (event.target.result);
    };
    req.onerror=function(event){
      console.log(event);
    };

}
export default {
  add,
  remove,
  put,
  getTable
};
