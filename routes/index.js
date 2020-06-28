const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// middleware
const auth = require('../middleware/auth');

module.exports = function(){
    // Agregar clientes
    router.post('/clientes',auth,clienteController.nuevoCliente);    

    // Obtener todos los clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    );

    // muestra un cliente en especifico
    router.get('/clientes/:idCliente',auth,clienteController.mostrarCliente);

    // actualizar cliente
    router.put('/clientes/:idCliente',auth,clienteController.actualizarCliente);

    //eliminar cliente
    router.delete('/clientes/:idCliente',auth,clienteController.eliminarCliente);

    /**
     * PRODUCTOS
     */

     router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Mostrar productos
    router.get('/productos',auth, productosController.mostrarProductos);

    // Muestra producto por id
    router.get('/productos/:idProducto',auth, productosController.mostrarProducto);

    // Actualizar productos 
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar productos 
    router.delete('/productos/:idProducto', auth,productosController.eliminarProducto);

    // Busqeuda de productos
    router.post('/productos/busqueda/:query',auth,productosController.buscarProducto);

    /**
     * PEDIDOS
     */
    // agregar pedidos
    router.post('/pedidos/nuevo/:idUsuario',auth,pedidosController.nuevoPedido);

    // mostrar pedidos
    router.get('/pedidos',auth,pedidosController.mostrarPedidos);

    // pedido por id
    router.get('/pedidos/:idPedido',auth,pedidosController.mostrarPedido);

    // actualizar pedidos
    router.put('/pedidos/:idPedido',auth,pedidosController.actualizarPedido);

    // eliminar pedidos
    router.delete('/pedidos/:idPedido',auth,pedidosController.eliminarPedido);

    /**
     * Usuarios
     */
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    return router;
}