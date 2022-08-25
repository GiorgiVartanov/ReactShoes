export const calculatePrice = (price, discount) => {
    return Math.floor((price - (price * discount) / 100) * 100) / 100;
};
