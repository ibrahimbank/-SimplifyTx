import React from 'react';
import { useRouter } from 'next/router';
import {useAuth} from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                                  children,
                                                                  redirectTo = '/auth/login'
                                                              }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, redirectTo, router]);

    return isAuthenticated ? <>{children}</> : null;
};