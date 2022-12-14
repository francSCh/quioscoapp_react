import { PrismaClient } from '@prisma/client';
import { formatearFechaUS } from '../../helpers';

export default async function handler(req, res) {
    const prisma = new PrismaClient();


    if(req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                //fecha: `${req.body.fecha}`
                fecha: formatearFechaUS()
            }
        });

        res.json(orden);
    }
}