import type { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from './jwt';
import { storage } from '../storage';

/**
 * Middleware para verificar autenticación JWT
 * Agrega req.user con la información del usuario autenticado
 */
export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({ error: 'No se proporcionó token de autenticación' });
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).json({ error: 'Token inválido o expirado' });
      return;
    }

    // Verificar que el usuario aún existe en la base de datos
    const user = await storage.getAdminUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Agregar información del usuario al request
    (req as any).user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Error de autenticación' });
  }
}

/**
 * Middleware opcional: verifica autenticación pero no falla si no hay token
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
export async function optionalAuthenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const user = await storage.getAdminUserById(payload.userId);
        if (user) {
          (req as any).user = {
            id: user.id,
            username: user.username,
            role: user.role,
          };
        }
      }
    }

    next();
  } catch (error) {
    // En caso de error, continuar sin autenticación
    next();
  }
}

