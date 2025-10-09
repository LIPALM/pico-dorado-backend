import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  numero: number;
  plato: string;
  categoria: string;
  cantidad: number;
  refresco: string;
  descripcion?: string;
  metodoPago: string;
  total: number;
  fecha: string;
  hora: string;
  estado: 'En Preparación' | 'Listo' | 'Entregado';
  activo: boolean;
  createdAt: Date;
}

const TicketSchema: Schema = new Schema({
  numero: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  plato: { 
    type: String, 
    required: true 
  },
  categoria: { 
    type: String, 
    required: true 
  },
  cantidad: { 
    type: Number, 
    required: true,
    min: 1
  },
  refresco: { 
    type: String, 
    default: 'Sin refresco' 
  },
  descripcion: { 
    type: String 
  },
  metodoPago: { 
    type: String, 
    required: true 
  },
  total: { 
    type: Number, 
    required: true 
  },
  fecha: { 
    type: String, 
    required: true 
  },
  hora: { 
    type: String, 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['En Preparación', 'Listo', 'Entregado'],
    default: 'En Preparación'
  },
  activo: { 
    type: Boolean, 
    default: true 
  },
  archivado: { 
  type: Boolean, 
  default: false 
  }
}, {
  timestamps: true
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);