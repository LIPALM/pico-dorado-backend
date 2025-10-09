import express from 'express';
import {
  crearTicket,
  obtenerTicketsActivos,
  obtenerTodosTickets,
  obtenerTicketPorNumero,
  actualizarEstadoTicket,
  anularTicket,
  obtenerReporteDiario
} from '../controllers/ticketController';
import { validarTicket } from '../middleware/validation';  // ← NUEVO

const router = express.Router();

router.post('/', validarTicket, crearTicket);  // ← AGREGADO validarTicket
router.get('/activos', obtenerTicketsActivos);
router.get('/todos', obtenerTodosTickets);
router.get('/reporte-diario', obtenerReporteDiario);
router.get('/:numero', obtenerTicketPorNumero);
router.patch('/:numero/estado', actualizarEstadoTicket);
router.patch('/:numero/anular', anularTicket);

export default router;