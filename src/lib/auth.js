import React, { useState, useEffect, useContext, createContext } from "react";
import api from "./api";
import cookie from "js-cookie";
import translateMessage from '../constants/messages';
const authContext = createContext(null);

export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return useContext(authContext);
};

function useAuthProvider() {
    const [user, setUser] = useState(null);

    const handleUser = (user) => {
        if (user) {
            setUser(user);
            cookie.set("auth", true, {
                expires: 1, // dia
            });

            return user;
        } else {
            setUser(false);
            cookie.remove("auth");
            return false;
        }
    };

    async function register(data) {
        try {
            const response = await api.post("/register", data);
            console.log("rersponse", response);
            handleUser(response.data);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(translateMessage(error.response.data.error));
                console.log(error.response.data);
                return Promise.reject(error.response);
                // return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    async function login(data) {
        try {
            const response = await api.post("/login", data);
            handleUser(response.data.user);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(translateMessage(error.response.data.error));
                console.log('errorers', error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    async function logout() {
        try {
            const response = await api.post("/logout");
            handleUser(false);
            return response;
        } catch (error) {}
    }

     const sendPasswordResetEmail = async (email) => {
        await api.post("forgot-password",{email});
     };

    const confirmPasswordReset = async (
        email,
        password,
        password_confirmation,
        token
    ) => {
        // try {
        await api.post("/reset-password", {
            email,
            password,
            password_confirmation,
            token,
        });
    };

    async function getAuthenticatedUser() {
        try {
            const response = await api.get("/user");
            console.log("response user", response);
            handleUser(response.data);
            return response;
        } catch (error) {
            handleUser(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    useEffect(() => {
        console.log("RENDER AUTH");
        try {
            getAuthenticatedUser();
        } catch (error) {
            console.log("NO USER");
        }

        // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //     handleUser(user);
        //   } else {
        //     handleUser(false);
        //   }
        // });
        //
        // return () => unsubscribe();
    }, []);

    return {
        user,
        register,
        login,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}