
// CR IndexdDB
export function DBusuarios(usuario) {
    //request.deleteDatabase("Users");
    let request = indexedDB.open("Users", 1)

    request.onerror = function (event) {
        if (event.target.error.name === 'VersionError') {
            console.error("Error de versión:", event.target.error);
            } 
        else {
            console.error("Error al abrir la base de datos:", event.target.error);
        }
    }
    request.onsuccess = function (event) {
        const db = event.target.result
        insertarUsuario(usuario, db)
    }
    request.onupgradeneeded = (event) => {
          // la versión de la base existente es menor que 1 (o ni siquiera existe)
        let db = event.target.result;
        if(event.oldVersion !== 0) { // versión de db existente
            // version 0 significa que el cliente no tiene base de datos
            db.deleteObjectStore("User")
        }
        const store = db.createObjectStore('User', { keyPath: 'email' })
        store.createIndex('email', 'email', { unique: true })
    }
}

// CREATE
function insertarUsuario(usuario, db) {
    const txn = db.transaction('User', 'readwrite') // 1
    const store = txn.objectStore('User') // 2
    let query = store.put(usuario) // 3

    query.onsuccess = function (event) { // 4

        db.onversionchange = function() {
            db.close();
            alert("La base de datos está desactualizada, por favor recargue la página.")
          }
          console.log(event)
    }
    query.onerror = function (event) {
        console.log(event.target.errorCode)
    }
    txn.oncomplete = function () {
        db.close()
    }
}

// READ
export const validaUsuario = (email, password) => {
    return new Promise((result) => {
        let request = indexedDB.open("Users", 3)

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
                    if(password === event.target.result.password)
                        result({nombre: event.target.result.nombre,
                                email: event.target.result.email})
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


