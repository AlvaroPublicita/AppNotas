import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers['x-access-token'];

    // Verificar si no hay token
    if (!token) {
        return res
            .status(403)
            .send({ message: 'Se requiere un token para autenticación' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Guardar el ID del usuario en el objeto de solicitud para su uso en otras rutas
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        // Si ocurre un error (token inválido, por ejemplo)
        return res.status(401).send({ message: 'No autorizado' });
    }
};
