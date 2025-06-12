export function setStore(key, value) {
    const valor = JSON.stringify(value);
    localStorage.setItem(key, btoa(valor))
    console.log("Elemento añadido");
}

export function getStore(key) {
    const element = localStorage.getItem(key);
    if(element){
        const valor = atob(element);
        return valor ? JSON.parse(valor) : null;
    }
    console.log("Elemento no encontrado")
    return null;
}

export function deleteStore(key) {
    localStorage.removeItem(key);
}

export function clearStore() {
    localStorage.clear();
}