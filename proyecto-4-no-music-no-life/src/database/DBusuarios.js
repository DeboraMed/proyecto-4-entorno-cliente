export function DBusuarios(usuario) {
    let request = indexedDB.open("Users", 1)

    request.onerror = function () {
        console.error("Error", openRequest.error)
    }
    request.onsuccess = function (event) {
        const db = event.target.result
        insertarUsuario(usuario, db)
    }
    request.onupgradeneeded = (event) => {
        let db = event.target.result
        const store = db.createObjectStore('User', { keyPath: 'email' })
        store.createIndex('email', 'email', { unique: true })
    }
}

function insertarUsuario(usuario, db) {
    const txn = db.transaction('User', 'readwrite')
    const store = txn.objectStore('User')
    let query = store.put(usuario)

    query.onsuccess = function (event) {
        console.log(event)
    }
    query.onerror = function (event) {
        console.log(event.target.errorCode)
    }
    txn.oncomplete = function () {
        db.close()
    }
}