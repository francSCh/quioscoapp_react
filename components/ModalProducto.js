import { useState, useEffect } from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const ModalProducto = () => {
    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [ edicion, setEdicion ] = useState(false);

    useEffect(() => {
        //Comprobamos si el modal actual está en el pedido
        if (pedido.some(p => p.id === producto.id)) {
            const productoEdicion = pedido.find(p => p.id === producto.id);

            setEdicion(true);
            setCantidad(productoEdicion.cantidad);
        }
    }, [producto, pedido]);



    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image width={300} height={400} alt={`Imagen producto ${producto.imagen}`} src={`/assets/img/${producto.imagen}.jpg`} />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModal}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>

                <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>

                <div className="flex gap-4 mt-5">
                    <button type="button"
                        onClick={() => {
                            if (cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}>
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>

                    <p className="text-3xl">{cantidad}</p>

                    <button type="button"
                        onClick={() => {
                            if (cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                </div>

                <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded" onClick={() => handleAgregarPedido({ ...producto, cantidad })}>
                    {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
                </button>
            </div>
        </div>
    )
}

export default ModalProducto
