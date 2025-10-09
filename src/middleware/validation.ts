import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validarTicket = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    plato: Joi.string().required().messages({
      'string.empty': 'El plato es requerido',
      'any.required': 'El plato es requerido'
    }),
    categoria: Joi.string().required().messages({
      'string.empty': 'La categoría es requerida',
      'any.required': 'La categoría es requerida'
    }),
    cantidad: Joi.number().integer().min(1).required().messages({
      'number.base': 'La cantidad debe ser un número',
      'number.min': 'La cantidad debe ser al menos 1',
      'any.required': 'La cantidad es requerida'
    }),
    refresco: Joi.string().default('Sin refresco'),
    descripcion: Joi.string().optional().allow(''),
    metodoPago: Joi.string().valid('Efectivo', 'QR', 'Tarjeta').required().messages({
      'any.only': 'Método de pago inválido',
      'any.required': 'El método de pago es requerido'
    }),
    total: Joi.number().min(0).required().messages({
      'number.min': 'El total no puede ser negativo',
      'any.required': 'El total es requerido'
    }),
    fecha: Joi.string().required(),
    hora: Joi.string().required(),
    estado: Joi.string().valid('En Preparación', 'Listo', 'Entregado').default('En Preparación')
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      message: 'Datos inválidos', 
      errors: error.details.map(d => d.message)
    });
  }
  
  next();
};

export const validarRegistro = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'any.required': 'El nombre es requerido'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido',
      'any.required': 'El email es requerido'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es requerida'
    }),
    rol: Joi.string().valid('admin', 'cajero').default('cajero')
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      message: 'Datos inválidos', 
      errors: error.details.map(d => d.message)
    });
  }
  
  next();
};

export const validarLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      message: 'Credenciales inválidas'
    });
  }
  
  next();
};