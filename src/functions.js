export const calculatePrice = (price, discount) => {
    return Math.floor((price - (price * discount) / 100) * 100) / 100;
};

export const encodeImageFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file[0]);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
