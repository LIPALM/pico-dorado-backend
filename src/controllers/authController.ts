import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambialo-en-produccion';
const JWT_EXPIRES_IN = '7d';

// Registrar nuevo usuario
export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const usuario = new User({
      nombre,
      email,
      password,
      rol: rol || 'cajero'
    });

    await usuario.save();

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email }).select('+password');
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ message: 'Usuario desactivado' });
    }

    const passwordValido = await usuario.comparePassword(password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en login', error });
  }
};

// Obtener perfil
export const obtenerPerfil = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findById((req as any).user.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil', error });
  }
};

// Obtener todos los usuarios (solo para desarrollo/admin)
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};