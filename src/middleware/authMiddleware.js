const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Obtener el token JWT de las cabeceras de la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, 'tu_clave_secreta', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Agregar el ID del usuario decodificado al objeto de solicitud
    req.userId = decodedToken.userId;
    next();
  });
};

exports.checkRole = (role) => {
    return (req, res, next) => {
        // Verificar el rol del usuario
        if (req.userRole !== role) {
          return res.status(403).json({ message: 'Acceso no autorizado' });
        }
        next();
    };
};
