import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // Estado para manejar errores
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado para manejar la autenticación

  const llamaApi = () => {
        // Realizar la solicitud POST solo cuando se haga clic en el botón de login
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => {
          const user = users.find((user) => user.email === email && user.username === password);
          if (user) {
            setIsAuthenticated(true); // Se inicio sesion correctamente
            setError(null); 
          } else {
            setError('Usuario o contraseña incorrectos');
            setIsAuthenticated(false); // No se inicio sesion
          }
        });
    };

  const handleLogin = () => {
    // Reiniciar el error en cada intento
    setError(null);
    llamaApi();
  };

  return (
    <div>
      <title>Iniciar Sesión</title>
      <h1>Iniciar Sesión</h1>
      
      {isAuthenticated ? (
        <p style={{ color: 'green' }}>¡Inicio de sesión exitoso!</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
        </>
      )}
    </div>
  );
};

export default Login;
