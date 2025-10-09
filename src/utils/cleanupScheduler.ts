import cron from 'node-cron';
import Ticket from '../models/Ticket';

// Archivar tickets antiguos (más de 30 días)
export const archivarTicketsAntiguos = async () => {
  try {
    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);

    const resultado = await Ticket.updateMany(
      {
        createdAt: { $lt: hace30Dias },
        archivado: { $ne: true }
      },
      {
        $set: { archivado: true }
      }
    );

    console.log(`📦 Tickets archivados: ${resultado.modifiedCount}`);
  } catch (error) {
    console.error('Error al archivar tickets:', error);
  }
};

// Eliminar tickets muy antiguos (más de 90 días)
export const eliminarTicketsMuyAntiguos = async () => {
  try {
    const hace90Dias = new Date();
    hace90Dias.setDate(hace90Dias.getDate() - 90);

    const resultado = await Ticket.deleteMany({
      createdAt: { $lt: hace90Dias }
    });

    console.log(`🗑️ Tickets eliminados: ${resultado.deletedCount}`);
  } catch (error) {
    console.error('Error al eliminar tickets:', error);
  }
};

// Ejecutar todos los días a las 2:00 AM
export const iniciarLimpiezaAutomatica = () => {
  cron.schedule('0 2 * * *', () => {
    console.log('🕐 Ejecutando limpieza automática...');
    archivarTicketsAntiguos();
    // eliminarTicketsMuyAntiguos(); // Descomentar si quieres eliminar después de 90 días
  });

  console.log('✅ Limpieza automática programada (2:00 AM diario)');
};