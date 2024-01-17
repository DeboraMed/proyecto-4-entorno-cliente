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

export const validaUsuario = (email, password) => {
    return new Promise((result) => {
        let request = indexedDB.open("Users", 1)

        request.onerror = function () {
            console.error("Error", openRequest.error)
        }
        request.onsuccess = function (event) {

            const db = event.target.result
            const txn = db.transaction('User', 'readonly')
            const store = txn.objectStore('User')

            const user = store.get(email)
            user.onsuccess = function (event) {
                try {
                    result(password === event.target.result.password)
                } catch {
                    result(false)
                }
            }
            user.onerror = function () {
                result(false)
            }
            txn.oncomplete = () => {
                db.close()
            }
        }
    })
}


