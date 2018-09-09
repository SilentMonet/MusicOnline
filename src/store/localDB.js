

//创建、检索indexedDB数据库
/*jshint esversion: 6*/
var db,ar;
const dbName = 'Lists';

const request = window.indexedDB.open(dbName);
function waitDB () {
  return new Promise(resolve =>{

  
request.onerror = function (event) {
  console.log('open database failed');
};
request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (db.version == 1) {
    createTab('favorites');
  }
};
request.onsuccess = function (event) {
  db = request.result;
  console.log('execute');
  resolve(db);
};
console.log('execu');
});
}

function createTab (tabName) {
  let tab;
  if (!db.objectStoreNames.contains(tabName)) {
    tab = db.createObjectStore(tabName,{
      keyPath: 'MUSICRID'
    });
    tab.createIndex('NAME', 'NAME', {
      unique: false
    });
    tab.createIndex('ARTIST', 'ARTIST', {
      unique: false
    });
  }
}

function add (item,table) {
  db.transaction([table],'readwrite').objectStore(table).add(item);
}

function remove (item,table) {
  db.transaction([table],'readwrite').objectStore(table).delete(item.MUSICRID);
}
async function getTable(state,table) {
  if (db === undefined) {
    await waitDB();
    console.log(db);
  } 
    
    db.transaction([table], 'readonly')
      .objectStore(table)
      .getAll()
      .onsuccess =function (event) {
        state[table]=(event.target.result);
        //console.log(event.target.result);
      };
  
}
export default {
  add,
  remove,
  getTable
};
