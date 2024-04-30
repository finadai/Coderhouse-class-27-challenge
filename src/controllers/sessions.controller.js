const userDao = require('../daos/user.dao');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userDao.findByEmail(email);
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        req.session.user = user;

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.logout = async (req, res) => {
    try {
        delete req.session.user;
        
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};




