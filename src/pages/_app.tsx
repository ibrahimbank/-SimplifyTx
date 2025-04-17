import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {AuthProvider} from "@/context/AuthContext";
import {useEffect, useState} from "react";

export default function App({Component, pageProps}: AppProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <AuthProvider>
                <Component {...pageProps} />
        </AuthProvider>
    )}
