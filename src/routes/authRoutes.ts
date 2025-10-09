import express from 'express';
import { registrarUsuario, login, obtenerPerfil, obtenerUsuarios } from '../controllers/authController';  // ← Agregar obtenerUsuarios
import { verificarToken } from '../middleware/auth';
import { validarRegistro, validarLogin } from '../middleware/validation';

const router = express.Router();

router.post('/registro', validarRegistro, registrarUsuario);
router.post('/login', validarLogin, login);
router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/usuarios', obtenerUsuarios);  // ← AGREGAR ESTA LÍNEA

export default router;