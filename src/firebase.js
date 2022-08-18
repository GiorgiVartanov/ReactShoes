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
    setData,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    orderBy,
    Query,
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

let currentUserId;

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        // console.log(res);
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
        console.error(err);
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
            docSnap.data().cart.map((id) => getItem(id))
        );
        return result;
    }
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
        //new Date(1660573873833).toUTCString()
    });
};

export const addToCart = async (productId, user) => {
    // it will only add unique products to array
    await updateDoc(doc(db, "users", user.uid), {
        cart: arrayUnion(productId),
    });

    // const cart = await getCart(user);
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
    let result = false;

    const q = query(
        collection(db, "users"),
        where("cart", "array-contains", productId),
        where("uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data()) result = true;
    });
    return result;
};

export const checkStatus = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().status;
};

export const removeFromCart = async (productId, user) => {
    await updateDoc(doc(db, "users", user.uid), {
        cart: arrayRemove(productId),
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

// export const getCartItems = async (user) => {
//     const docRef = doc(db, "users", user.uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         return docSnap.data().readingList;
//     }
//     return null;
// };
