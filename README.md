# Pico Dorado - Sistema POS (Punto de Venta)

> Sistema completo de gestión de pedidos para restaurante de comida rápida especializado en pollo broaster

**Proyecto de Tecnologías en Internet**  
**Autores:** 
- Lucas Lipa Matta
- Jose Enrique Martinez Rojas
- Jorge Chipana Flores

**Fecha:** 17/10/2025

----------------------------------------------------------------------------------------------------

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Usuario de Prueba](#usuario-de-prueba)
- [Endpoints de la API y Pruebas](#endpoints-de-la-api-y-pruebas)
- [Características Implementadas](#características-implementadas)
- [Estructura de Base de Datos](#estructura-de-base-de-datos)
- [Solución de Problemas](#solución-de-problemas)
- [Autor](#autor)

----------------------------------------------------------------------------------------------------

## 📖 Descripción

Pico Dorado es un sistema POS (Punto de Venta) completo desarrollado para gestionar pedidos en restaurantes de comida rápida.

### Características principales:
- ✅ Registro y autenticación de usuarios con JWT 
- ✅ Gestión completa de pedidos (CRUD) 
- ✅ Control de estados de pedidos (En Preparación, Listo, Entregado) 
- ✅ Anulación de pedidos con registro de motivo  
- ✅ Reportes diarios de ventas 
- ✅ Limpieza automática de datos antiguos 
- ✅ Validación de datos con Joi 
- ✅ Encriptación de contraseñas con bcrypt

----------------------------------------------------------------------------------------------------

## 🚀 Tecnologías Utilizadas 

### Backend

- **Node.js** v18+ - Entorno de ejecución
- **TypeScript** - Tipado estático
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Joi** - Validación de esquemas
- **dotenv** - Variables de entorno
- **node-cron** - Tareas programadas

### Frontend

- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **React Router** - Navegación
- **Axios** - Cliente HTTP

### Herramientas de desarrollo

- **Thunder Client** - Pruebas de API
- **VS Code** - Editor de código
- **Git** - Control de versiones

----------------------------------------------------------------------------------------------------

## 📁 Estructura del Proyecto

### Backend (`pico-dorado-backend/`)
```
pico-dorado-backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de MongoDB
│   ├── controllers/
│   │   ├── authController.ts    # Lógica de autenticación
│   │   └── ticketController.ts  # Lógica de tickets
│   ├── middleware/
│   │   ├── auth.ts              # Middleware de autenticación JWT
│   │   └── validation.ts        # Validaciones con Joi
│   ├── models/
│   │   ├── User.ts              # Modelo de usuario
│   │   └── Ticket.ts            # Modelo de ticket
│   ├── routes/
│   │   ├── authRoutes.ts        # Rutas de autenticación
│   │   └── ticketRoutes.ts      # Rutas de tickets
│   ├── utils/
│   │   └── cleanupScheduler.ts  # Limpieza automática
│   └── server.ts                # Punto de entrada
├── .env                         # Variables de entorno (no incluido)
├── .env.example                 # Ejemplo de variables
├── .gitignore
├── package.json
└── tsconfig.json
```

### Frontend (`pico-dorado/`)
```
pico-dorado/
├── src/
│   ├── components/              # Componentes reutilizables
│   ├── pages/                   # Páginas de la aplicación
│   ├── services/                # Servicios API
│   └── assets/                  # Recursos estáticos
├── package.json
└── vite.config.ts
```
----------------------------------------------------------------------------------------------------

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** v9+ (incluido con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))
- **Cuenta en MongoDB Atlas** (gratuita) ([Crear cuenta](https://www.mongodb.com/cloud/atlas/register))

### Verificar instalación:
```bash
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar v9.x.x o superior
git --version    # Debe mostrar la versión instalada
```
----------------------------------------------------------------------------------------------------

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/pico-dorado.git
cd pico-dorado
```

### 2. Instalar dependencias del Backend
```bash
cd pico-dorado-backend
npm install
```

### 3. Instalar dependencias del Frontend
```bash
cd ../pico-dorado
npm install
```
----------------------------------------------------------------------------------------------------

## 🔐 Variables de Entorno

### Backend

Crea un archivo `.env` en la carpeta `pico-dorado-backend/` con el siguiente contenido:

```env
# Puerto del servidor
PORT=5000

# MongoDB Atlas - Reemplaza con tu URI
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/picodoradorestaurant?retryWrites=true&w=majority

# JWT Secret - Cambia esto en producción
JWT_SECRET=pico-dorado-secreto-super-seguro-2025-cambiar-en-produccion

# Entorno
NODE_ENV=development
```

### Obtener URI de MongoDB Atlas:

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. Crea un cluster gratuito (M0)
3. Ve a "Database Access" → Crea un usuario
4. Ve a "Network Access" → Agrega IP (0.0.0.0/0 para desarrollo)
5. Clic en "Connect" → "Connect your application"
6. Copia la URI y reemplaza `<password>` con tu contraseña

----------------------------------------------------------------------------------------------------

## ▶️ Ejecución

### Opción 1: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
cd pico-dorado-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd pico-dorado
npm run dev
```

### Verificar que funciona:

- **Backend:** http://localhost:5000
![alt text](screenshots/image-backend.png)
- **Frontend:** http://localhost:5173
![alt text](screenshots/image-frinted.png)

Deberías ver:

```json
{
  "message": "🍗 API Pico Dorado funcionando",
  "status": "OK"
}
```

----------------------------------------------------------------------------------------------------

## 👤 Usuario de Prueba

Para facilitar las pruebas, puedes crear un usuario con estos datos:
```json
{
  "nombre": "Leonardo Limachi",
  "email": "leo40lipa@gmail.com",
  "password": "123456",
  "rol": "admin"
}
```
O usa el endpoint de registro para crear tu propio usuario.

----------------------------------------------------------------------------------------------------

## 📡 Endpoints de la API y Pruebas

### Base URL

```
http://localhost:5000/api
```

### Autenticación

#### 1. Registro de usuario

![alt text](screenshots/image-1.png)

#### 2. Login

![alt text](screenshots/image-2.png)

#### 3. Obtener perfil (protegido)

![alt text](screenshots/image-3.png)

#### 4. Listar usuarios (protegido)

![alt text](screenshots/image-4.png)

### Tickets (Todos requieren autenticación)

#### 1. Crear ticket

![alt text](screenshots/image-5.png)

#### 3. Listar tickets activos

![alt text](screenshots/image-6.png)

#### 4. Obtener ticket por número

![alt text](screenshots/image-7.png)

#### 5. Cambiar estado de ticket

![alt text](screenshots/image-8.png)

Estados válidos: `"En Preparación"`, `"Listo"`, `"Entregado"`

#### 6. Anular ticket

![alt text](screenshots/image-9.png)

#### 7. Reporte diario

![alt text](screenshots/image-10.png)

----------------------------------------------------------------------------------------------------
## ✨ Características Implementadas

### Seguridad
- ✅ Autenticación JWT (JSON Web Tokens)
- ✅ Encriptación de contraseñas con bcrypt (salt rounds: 10)
- ✅ Rutas protegidas con middleware de autenticación
- ✅ Tokens con expiración (7 días)
- ✅ Validación de datos con Joi
- ✅ Protección contra inyecciones NoSQL (Mongoose)

### Funcionalidades del Backend
- ✅ CRUD completo de tickets
- ✅ Gestión de usuarios (registro, login, perfil)
- ✅ Control de estados de pedidos
- ✅ Anulación de pedidos con registro
- ✅ Reportes diarios de ventas
- ✅ Limpieza automática de datos (30 días)
- ✅ Manejo de errores centralizado

### Funcionalidades del Frontend
- ✅ Interfaz moderna y responsive
- ✅ Sistema de login/registro
- ✅ Dashboard con 5 secciones
- ✅ Gestión visual de pedidos
- ✅ Cambio de estados en tiempo real
- ✅ Reportes visuales
- ✅ Perfil de usuario

### Buenas Prácticas
- ✅ Arquitectura modular y escalable
- ✅ TypeScript en todo el proyecto
- ✅ Variables de entorno para configuración
- ✅ Código documentado con comentarios
- ✅ Manejo de errores robusto
- ✅ Validaciones en cliente y servidor

----------------------------------------------------------------------------------------------------
## 🗄️ Estructura de Base de Datos

### Colección: `users`
```typescript
{
  _id: ObjectId,
  nombre: String,
  email: String (único),
  password: String (hasheado),
  rol: "admin" | "cajero",
  activo: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Colección: `tickets`
```typescript
{
  _id: ObjectId,
  numero: Number (único, autoincremental),
  plato: String,
  categoria: String,
  cantidad: Number,
  refresco: String,
  descripcion: String,
  metodoPago: String,
  total: Number,
  fecha: String,
  hora: String,
  estado: "En Preparación" | "Listo" | "Entregado",
  activo: Boolean,
  archivado: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```
----------------------------------------------------------------------------------------------------
## ⚠️ Solución de Problemas Comunes

### Error: "Cannot connect to MongoDB"
**Causa:** URI de MongoDB incorrecta o red bloqueada  
**Solución:**
- Verifica que la URI en `.env` sea correcta
- Asegúrate de haber permitido IP 0.0.0.0/0 en MongoDB Atlas

### Error: "401 Unauthorized"
**Causa:** Token no enviado o inválido  
**Solución:**
- Haz login primero para obtener un token
- Agrega el header: `Authorization: Bearer {token}`

### Error: "Port 5000 already in use"
**Causa:** Otro proceso usando el puerto  
**Solución:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID {numero} /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Error: "Module not found"
**Causa:** Dependencias no instaladas  
**Solución:**
```bash
npm install
```
----------------------------------------------------------------------------------------------------
## 🚀 Mejoras Futuras (Opcional)

- [ ] Implementar paginación en listados
- [ ] Agregar búsqueda y filtros avanzados
- [ ] Implementar WebSockets para actualizaciones en tiempo real
- [ ] Agregar sistema de roles y permisos más granular
- [ ] Implementar caché con Redis
- [ ] Agregar tests unitarios y de integración
- [ ] Dockerizar la aplicación
- [ ] Implementar CI/CD
- [ ] Agregar logs con Winston o Morgan
- [ ] Implementar rate limiting

---

## 📄 Licencia

Este proyecto es de uso académico para la asignatura de Tecnologías en Internet.

---

## 👨‍💻 Autores

- **Lucas Lipa Matta** - Backend & Database
- **Jose Enrique Martinez Rojas** - Frontend
- **Jorge Chipana Flores** - Full Stack

Proyecto de fin de semestre - Tecnologías en Internet  
Octubre 2025

---

## 📞 Contacto

- Email: lucas.lima@uab.edu.bo
- GitHub: [LIPALM](https://github.com/LIPALM)

- Email: jose.martinez@uab.edu.bo
- GitHub: [jhosep091](https://github.com/jhosep091)

- Email: jorge.chipana@uab.edu.bo
- GitHub: [chipans](https://github.com/chipans)

---

## 🙏 Agradecimientos

- Profesor de la asignatura
- Compañeros de clase
- Documentación oficial de Node.js, Express, MongoDB

---

**¡Gracias por revisar este proyecto! 🍗**