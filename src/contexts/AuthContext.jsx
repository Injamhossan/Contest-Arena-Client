// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    let isProcessing = false; // Prevent multiple simultaneous JWT requests
    let lastJWTRequestTime = 0;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Prevent rapid repeated calls
      const now = Date.now();
      if (isProcessing && (now - lastJWTRequestTime) < 2000) {
        return; // Skip if processing and less than 2 seconds since last request
      }

      // লগ আউট অবস্থা
      if (!firebaseUser) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('jwt_error_shown');
        setLoading(false);
        isProcessing = false;
        return;
      }

      setLoading(true); // Ensure loading is true while we fetch the JWT/User profile

      // Skip if already have valid token for this user
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email === firebaseUser.email) {
            // User already authenticated, just set state
            setUser(parsedUser);
            setToken(storedToken);
            setLoading(false);
            return;
          }
        } catch (e) {
          // Invalid stored user, continue to get new JWT
        }
      }

     isProcessing = true;
lastJWTRequestTime = now;

try {
    // Check for role stored during signup
    const signupRole = sessionStorage.getItem('signup_role');
    
    const response = await api.post('/auth/jwt', {
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
        photoURL: firebaseUser.photoURL || null,
        role: signupRole || undefined // Pass role if it exists
    });

        if (response.data?.success && response.data?.token && response.data?.user) {
          const { token: jwtToken, user: userData } = response.data;

          localStorage.setItem('token', jwtToken);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.removeItem('jwt_error_shown');
          sessionStorage.removeItem('signup_role'); // Clear the stored role

          setToken(jwtToken);
          setUser(userData);
        } else {
          // Invalid response - use fallback
          const fallbackUser = {
            _id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            photoURL: firebaseUser.photoURL || null,
            role: 'user',
          };
          setUser(fallbackUser);
          setToken(null);
        }
      } catch (error) {
        // Only log error details once
        if (!localStorage.getItem('jwt_error_shown')) {
          console.error('JWT Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
          });
        }

        // Use fallback user - don't show repeated toasts
        const fallbackUser = {
          _id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          photoURL: firebaseUser.photoURL || null,
          role: 'user',
        };
        setUser(fallbackUser);
        setToken(null);
        
        // Show error only once
        if (!localStorage.getItem('jwt_error_shown')) {
          if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            toast.error('Cannot connect to server. Please make sure the server is running.');
          } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          }
          localStorage.setItem('jwt_error_shown', 'true');
        }
      } finally {
        setLoading(false);
        isProcessing = false;
      }
    });

    return () => unsubscribe();
  }, []);

  // --------- Auth actions ---------
  const signIn = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user; // onAuthStateChanged নিজে থেকেই চলবে
  };

  const signUp = async (email, password, name, photoURL) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // profile update
    await cred.user.updateProfile({ 
      displayName: name,
      photoURL: photoURL || "https://ui-avatars.com/api/?name=" + name
    });
    return cred.user;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user; // onAuthStateChanged নিজে থেকেই চলবে
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Signed out successfully');
    } catch (err) {
      console.error('Error signing out:', err);
      toast.error('Failed to sign out');
    }
  };

  const updateUserRole = async (role) => {
    try {
      if (!user?._id) throw new Error('User not found');

      const response = await api.patch(`/users/${user._id}/role`, { role });
      if (response.data?.success && response.data?.user) {
        const updatedUser = { ...user, role: response.data.user.role };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Refresh Token to include new role
        const tokenResponse = await api.post('/auth/jwt', {
          email: user.email,
          name: user.displayName || user.name,
          photoURL: user.photoURL
        });

        if (tokenResponse.data?.success && tokenResponse.data?.token) {
             localStorage.setItem('token', tokenResponse.data.token);
             setToken(tokenResponse.data.token);
        }

        toast.success('Role updated successfully');
        return updatedUser;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update role');
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data?.success && response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUserRole,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
