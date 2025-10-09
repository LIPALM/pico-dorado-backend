import express from 'express';
import { registrarUsuario, login, obtenerPerfil } from '../controllers/authController';
import { verificarToken } from '../middleware/auth';
import { validarRegistro, validarLogin } from '../middleware/validation';

const router = express.Router();

router.post('/registro', validarRegistro, registrarUsuario);
router.post('/login', validarLogin, login);
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;