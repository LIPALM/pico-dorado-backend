import { Request, Response } from 'express';
import Ticket from '../models/Ticket';

// Crear un nuevo ticket
export const crearTicket = async (req: Request, res: Response) => {
  try {
    // Obtener el último número de ticket
    const ultimoTicket = await Ticket.findOne().sort({ numero: -1 });
    const nuevoNumero = ultimoTicket ? ultimoTicket.numero + 1 : 1;

    const ticket = new Ticket({
      ...req.body,
      numero: nuevoNumero
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ticket', error });
  }
};

// Obtener todos los tickets activos
export const obtenerTicketsActivos = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({ 
      activo: true,
      estado: { $ne: 'Entregado' }
    }).sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tickets', error });
  }
};

// Obtener todos los tickets (incluyendo históricos)
export const obtenerTodosTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tickets', error });
  }
};

// Obtener un ticket por número
export const obtenerTicketPorNumero = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ numero: parseInt(req.params.numero) });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ticket', error });
  }
};

// Actualizar estado del ticket
export const actualizarEstadoTicket = async (req: Request, res: Response) => {
  try {
    const { estado } = req.body;
    const ticket = await Ticket.findOneAndUpdate(
      { numero: parseInt(req.params.numero) },
      { estado },
      { new: true }
    );
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ticket', error });
  }
};

// Anular ticket
export const anularTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { numero: parseInt(req.params.numero) },
      { activo: false },
      { new: true }
    );
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    
    res.json({ message: 'Ticket anulado correctamente', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error al anular ticket', error });
  }
};

// Obtener reporte diario
export const obtenerReporteDiario = async (req: Request, res: Response) => {
  try {
    const hoy = new Date().toLocaleDateString();
    const tickets = await Ticket.find({ 
      fecha: hoy,
      activo: true 
    });
    
    const totalVentas = tickets.reduce((sum, ticket) => sum + ticket.total, 0);
    const ticketsEntregados = tickets.filter(t => t.estado === 'Entregado').length;
    
    res.json({
      fecha: hoy,
      totalTickets: tickets.length,
      ticketsEntregados,
      totalVentas,
      tickets
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reporte', error });
  }
};