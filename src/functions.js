export const calculatePrice = (price, discount) => {
    return Math.floor((price - (price * discount) / 100) * 100) / 100;
};

// converts image file to base64
export const encodeImageFile = (file) => {
    // checking if file size is too big
    if (file[0].size > 100000) {
        alert(`File size too big ${file[0].size}`);
        return new Promise(() => false);
    }
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
