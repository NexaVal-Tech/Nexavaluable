// lib/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, getAuthUser, logout } from './auth';

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const token = getAuthToken();
        
        if (!token) {
          router.push('/admin/login');
          return;
        }

        try {
          // Optional: Verify token with backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Token is invalid, logout and redirect
            logout();
            router.push('/admin/login');
          }
        } catch (error) {
          // Network error or API down - allow access if we have token
          console.warn('Could not verify token with backend:', error);
          setIsAuthenticated(true);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-[Geist]">Verifying access...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // Router will redirect
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;