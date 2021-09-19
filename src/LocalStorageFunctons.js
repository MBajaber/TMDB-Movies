export const saveDataToLocalStorage = (data) => {
    try {
        localStorage.setItem('favoriteList', JSON.stringify(data));
    } catch(error) {
        alert(error);
    }
}

export const bringDataFromLocalStorageFunc = () => {
    try {
        const getData = localStorage.getItem('favoriteList');
        if(!getData) return [];
        else return JSON.parse(getData);
    } catch(error) {
        alert(error);
    }
}