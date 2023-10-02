const Admin = require('../models/admin');

// Obtener todos los administradores
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener un administrador por ID
exports.getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error al obtener el administrador por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Crear un nuevo administrador
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error al crear un nuevo administrador:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar un administrador por ID
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { username, email, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { username, email, password },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error al actualizar el administrador por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar un administrador por ID
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el administrador por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
