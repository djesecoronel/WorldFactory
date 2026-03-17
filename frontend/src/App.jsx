import GamePage from './pages/GamePage';
import './index.css'; // Asegúrate de tener este archivo para los estilos globales

function App() {
  return (
    <div className="app-container">
      {/* Aquí podrías añadir un Header o Footer global si quisieras, 
         pero por ahora renderizamos directamente la página del juego.
      */}
      <main>
        <GamePage />
      </main>
    </div>
  );
}

export default App;