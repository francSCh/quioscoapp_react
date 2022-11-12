const formatearDinero = cantidad => cantidad.toLocaleString('en-US', { style: 'currency', currency:'USD' });

export {
    formatearDinero
}