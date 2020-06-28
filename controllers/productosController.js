const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,__dirname+'../../uploads/');
        },
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato no Valido'));
        }
    }
}

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// sube un arvhivbo
exports.subirArchivo = (req,res,next) => {
    upload(req,res,function(error){
        if(error) {
            res.json({
                mensaje: error
            });
        }
        return next();
    })
}

// Agrega nuevos productos
exports.nuevoProducto = async (req,res,next) => {
    const producto = new Productos(req.body);

    try{
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        });
    }catch(e){
        console.log(e);
        next();
    }

}

// Muestra todos los prodcutos
exports.mostrarProductos = async (req,res,next) => {
    try{
        const productos = await Productos.find({});
        res.json(productos);
    }catch(e){
        console.log(e);
        next();
    }
}

//Muestra un producto en especifico por suy id
exports.mostrarProducto = async (req,res,next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto){        
        res.json({
            mensaje: 'Ese Producto no existe'
        });
        return next();
    }

    res.json(producto);
}

// Actualiza un producto
exports.actualizarProducto = async (req,res,next) => {
    try{        

        // consturir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay una imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto},
            nuevoProducto,{
                new: true,
            });

        res.json(producto);
    }catch(e) {
        console.log(e);
        next();
    }
}

// Elimina un producto via id
exports.eliminarProducto = async (req,res,next) => {
    try{
        await Productos.findOneAndDelete({_id:req.params.idProducto});
        res.json({
            mensaje: 'producto eliminado'
        });
    }catch(e) {
        console.log(e);
        next();
    }
}

exports.buscarProducto = async (req,res,next) => {
    try{
        // obtener el q uery
        const { query } = req.params;
        const producto = await Productos.find({nombre:new RegExp(query,'i')});
        res.json(producto);
    }catch(error){
        console.log(error);
        next();
    }
}