const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Verificar si el correo electrónico ya está en uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }
    
        // Cifrar la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Crear un nuevo usuario
        const newUser = new User({
          username,
          email,
          password: hashedPassword, // Almacenamos la contraseña cifrada
        });
    
        // Guardar el usuario en la base de datos
        await newUser.save();
    
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      } catch (error) {
        console.error('Error en el registro de usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });
    
        // Verificar si el usuario existe
        if (!user) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    
        // Generar un token JWT si el inicio de sesión es exitoso
        const token = jwt.sign({ userId: user._id }, 'tu_clave_secreta', {
          expiresIn: '1h', // se la duración del token según criterio
        });
    
        res.status(200).json({ token });
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
};

// Otras funciones CRUD para usuarios
// Implementa estas funciones de acuerdo a tus necesidades
