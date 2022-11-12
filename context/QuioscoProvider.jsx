import { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ producto, setProducto ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ pedido, setPedido ] = useState([]);

    const router = useRouter();
    
    useEffect(() => {
        const obtenerCategorias = async () => {
            const { data } = await axios('/api/categorias');

            setCategorias(data);
        };

        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);

        router.push('/');
    };

    const handleSetProducto = producto => {
        setProducto(producto);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    //Lo que hace este código es aplicando destructuring y sacar categoriaId e imagen del objeto producto
    //y toma una copia con un objeto nuevo sin esas dos propiedades del objeto
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(p => p.id === producto.id)) {
            //El producto ya existe, por lo tanto actualizamos la cantidad
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p);
            setPedido(pedidoActualizado);

            toast.success('Guardado Correctamente');
        } else {
            //El producto no existe
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido');
        }
        
        setModal(false);
    };

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(p => p.id === id);

        setProducto(productoActualizar[0]);
        setModal(!modal);
    };

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(p => p.id !== id);

        setPedido(pedidoActualizado);
    };

    return (
        <QuioscoContext.Provider value={{ categorias, categoriaActual, handleClickCategoria, producto, handleSetProducto, modal, handleChangeModal, handleAgregarPedido, pedido, handleEditarCantidades, handleEliminarProducto }}>
            {children}
        </QuioscoContext.Provider>
    );
};

export {
    QuioscoProvider
}

export default QuioscoContext;