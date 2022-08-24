import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    orderBy,
    deleteDoc,
} from "firebase/firestore";

const config = {
    apiKey: "AIzaSyCUl1XB9hK1pKcMnLQrUjgxhafHlJDJzrM",
    authDomain: "react-cloathes.firebaseapp.com",
    projectId: "react-cloathes",
    storageBucket: "react-cloathes.appspot.com",
    messagingSenderId: "931355672682",
    appId: "1:931355672682:web:1c55792d815d92f699ca13",
    measurementId: "G-ERYDF4RSVY",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                status: "user",
                cart: [],
                liked: [],
                viewed: [],
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        alert(err.message);
    }
};
export const registerWithEmailAndPassword = async (
    email,
    username,
    password
) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: username,
                authProvider: "local",
                status: "user",
                email: email,
                cart: [],
                liked: [],
                viewed: [],
            });
        }

        // await updateDoc(doc(db, "users", id), {
        //     uid: "id",
        // });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
export const logout = () => {
    signOut(auth);
};

export const getShopPageContent = async (type, color, price) => {
    const result = [];

    let q = query(collection(db, "products"));

    if (type !== "Any") q = query(q, where("type", "==", type));
    if (color !== "Any") q = query(q, where("color", "==", color));
    if (price !== "Any") q = query(q, where("price", "<", parseInt(price)));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
};

export const getItem = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
};

export const getComments = async (productId) => {
    const result = [];

    const q = query(
        collection(db, "comments"),
        orderBy("date"),
        where("productId", "==", productId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });

    return result;
};

export const getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().name;
    }
    return null;
};

export const getCart = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const result = await Promise.all(
            docSnap.data().cart.map((item) => getItem(item.id))
        );
        // if something from cart was deleted by admin
        return result.filter((item) => item !== null);
    }

    return null;
};
export const getCartIds = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data().cart;
    return null;
};

export const getLikes = async (productId) => {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().likes;
    }
    return null;
};
export const getViews = async (productId) => {
    // check later

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().views;
    }
    return null;
};

export const addComment = async (text, productId, user) => {
    await addDoc(collection(db, "comments"), {
        productId: productId,
        text: text,
        userId: user.uid,
        date: new Date().getTime(),
    });
};

export const addToCart = async (product, user) => {
    const cart = await getCartIds(user);
    // const newCart = [];

    // console.log(cart);

    // if (cart.length > 0)
    //     cart.map((item) => {
    //         if (item.id === product.id) newCart.push(product);
    //         else newCart.push(item);
    //         console.log(item);
    //     });
    // else newCart.push(product);

    const newCart = cart.filter((item) => item.id !== product.id);
    newCart.push(product);

    // console.log(
    //     `adding item : ${product.id}; amount : ${product.amount} to user with id ${user.uid}`
    // );
    await updateDoc(doc(db, "users", user.uid), {
        cart: newCart,
    });
};

export const addView = async (productId, user) => {
    const views = getViews(productId);

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.data().viewed.includes(productId)) {
        updateDoc(doc(db, "users", user.uid), {
            viewed: arrayUnion(productId),
        });

        views.then((res) => {
            updateDoc(doc(db, "products", productId), {
                views: res + 1,
            });
        });
    }
};

export const addLike = async (productId, user) => {
    const likes = getLikes(productId);

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.data().liked.includes(productId)) {
        updateDoc(doc(db, "users", user.uid), {
            liked: arrayUnion(productId),
        });

        likes.then((res) => {
            updateDoc(doc(db, "products", productId), {
                likes: res + 1,
            });
        });
    }
};

export const removeLike = async (productId, user) => {
    const likes = getLikes(productId);

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.data().liked.includes(productId)) {
        const newArr = docSnap.data().liked;
        newArr.splice(newArr.indexOf(productId), 1);

        updateDoc(doc(db, "users", user.uid), {
            liked: newArr,
        });

        likes.then((res) => {
            updateDoc(doc(db, "products", productId), {
                likes: res - 1,
            });
        });
    }
};

export const checkIfUserHasLiked = async (productId, user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data().liked.includes(productId);
};

export const checkIfUserHasThisItem = async (productId, user) => {
    const cart = await getCart(user);
    let result = false;
    cart.map((item) => {
        if (item.id === productId) result = true;
    });
    return result;

    // const q = query(
    //     collection(db, "users"),
    //     where("cart", "array-contains", productId),
    //     where("uid", "==", user.uid)
    // );

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     if (doc.data()) result = true;
    // });
    // return result;
};

export const checkStatus = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().status;
};

export const removeFromCart = async (productId, user) => {
    const oldCart = await getCart(user);
    const newCart = oldCart.filter((item) => item.id !== productId);

    await updateDoc(doc(db, "users", user.uid), {
        cart: newCart,
        // cart: arrayRemove(productId),
    });
};

export const getAllUsers = async () => {
    const result = [];
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });

    return result;
};

export const getAllProducts = async () => {
    const result = [];
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });

    return result;
};

export const editUser = async (uid, name, email, status) => {
    await updateDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        status: status,
    });
};

export const banUser = async (uid) => {
    console.log(`banning user with id ${uid}`);
    // add later
};
export const editProduct = async (id, name, price, discount) => {
    if ((discount >= 0) & (discount < 100) && price >= 0)
        await updateDoc(doc(db, "products", id), {
            name: name,
            price: parseFloat(price),
            discount: parseFloat(discount),
        });
};

export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
};
