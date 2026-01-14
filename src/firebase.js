import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDiGzPBYuVT5kxQGaUK-UL46H8039u7Gg",
  authDomain: "planningpoker-cd487.firebaseapp.com",
  projectId: "planningpoker-cd487",
  storageBucket: "planningpoker-cd487.firebasestorage.app",
  messagingSenderId: "430445405549",
  appId: "1:430445405549:web:883185219a26163ff3e664",
  measurementId: "G-8LQGQCGV3L"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);

// Función para autenticación anónima
export const signInAnonymous = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log('Usuario autenticado anónimamente:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('Error en autenticación anónima:', error);
    throw error;
  }
};

// Función para generar ID de sala aleatorio (4 caracteres)
export const generateRoomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
