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
        console.log(res);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
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
export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const { id } = await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
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

export const addToReadingList = async (user, section, itemId) => {
    await updateDoc(doc(db, "users", user.uid), {
        readingList: arrayUnion(itemId),
    });
};

export const getShopPageContent = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);

    return querySnapshot;

    // const allItems = await getDocs(collection(db, "products"));

    // return allItems;
};

export const getCartItems = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
};

// export const getCartItems = async (user) => {
//     const docRef = doc(db, "users", user.uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         return docSnap.data().readingList;
//     }
//     return null;
// };

export const removeFromReadingList = async (user, itemId) => {
    await updateDoc(doc(db, "users", user.uid), {
        readingList: arrayRemove(itemId),
    });
};
