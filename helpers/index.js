const formatearDinero = cantidad => cantidad.toLocaleString('en-US', { style: 'currency', currency:'USD' });

const formatearFechaUS = () => new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;

export {
    formatearDinero,
    formatearFechaUS
}