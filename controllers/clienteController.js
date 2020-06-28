const Clientes = require('../models/Clientes');

exports.nuevoCliente = async(req,res,next) => {
    const cliente = new Clientes(req.body);    

    try{
        await cliente.save();
        res.json({
            mensaje: 'Se agrego un nuevo cliente'
        });
    }catch(error){
        res.send(error);
        next();
    }
}

// muestra todos los cleintes
exports.mostrarClientes = async (req,res) => {
    try{
        const clientes = await Clientes.find({});
        res.json(clientes);
    }catch(e){
        console.log(e);
        next();
    }
} 

// muestra un cliente por su id
exports.mostrarCliente = async(req,res,next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        next();
    }

    // Mostrar el cliente
    res.json(cliente);
}

// actualizar cliente con su id
exports.actualizarCliente = async(req,res,next) => {
    try{
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
        req.body,{
            new:true
        });
        res.json(cliente);        
    }catch(error){
        res.send(error);
        next();
    }
}

// eliminar cliente por su id
exports.eliminarCliente = async (req,res,next) => {
    try{
        await Clientes.findOneAndDelete({_id:req.params.idCliente});
        res.json({
            mensaje: 'Cliente eliminado'
        });
    }catch(error){
        console.log(error);
        next();
    }
}