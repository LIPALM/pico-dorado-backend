import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import ticketRoutes from './routes/ticketRoutes';
import authRoutes from './routes/authRoutes';  // ← NUEVO
import { verificarToken } from './middleware/auth';  // ← NUEVO
import { iniciarLimpiezaAutomatica } from './utils/cleanupScheduler';  // ← NUEVO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas
app.get('/', (req, res) => {
  res.json({ 
    message: '🍗 API Pico Dorado funcionando',
    status: 'OK' 
  });
});

app.use('/api/auth', authRoutes);  // ← NUEVO: Rutas de autenticación (públicas)

// Rutas protegidas (requieren autenticación)
app.use('/api/tickets', verificarToken, ticketRoutes);  // ← PROTEGIDO

// Conectar a MongoDB y arrancar servidor
const startServer = async () => {
  try {
    await connectDB();
    iniciarLimpiezaAutomatica();  // ← NUEVO: Iniciar limpieza automática
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
      console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();