import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "secreto123";
// para usuarios registrados
export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Acceso denegado. No hay token." });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado." });
    }
};
// verificar admin
export const verificarAdmin = (req, res, next) => {
    if (req.user.rol !== "admin") {
        return res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador." });
    }
    next();
};

