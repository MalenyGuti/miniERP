const usuarioService = require('../services/usuarioService');

async function getUsuarios(req, res) {
    try { 
        const data = await usuarioService.obtenerUsuarios(); 
        res.json({ success: true, data }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
}

async function createUsuario(req, res) {
    try { 
        const id = await usuarioService.crearUsuario(req.body); 
        res.status(201).json({ success: true, id }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
}

async function updateUsuario(req, res) {
    try { 
        await usuarioService.actualizarUsuario(req.params.id, req.body); 
        res.json({ success: true }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
}

async function deleteUsuario(req, res) {
    try { 
        await usuarioService.eliminarUsuario(req.params.id); 
        res.json({ success: true }); 
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
}

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };