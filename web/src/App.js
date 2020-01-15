import React, { useEffect, useState } from 'react';

//Node
import api from './services/api';

//Styles
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//Componentes
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


// Componente: bloco isolado de Html, CSS e js, o qual não interfere no restante da aplicação
// Propriedade: informações que o componente pai passa pra o componente filho
// Estado: informações mantidas pelo componente (Lembrar: imutabilidade)


function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get(`devs`);

      setDevs(response.data);
    }
    loadDevs();
  }, [devs]);

  async function handAddDev(data) {
    const response = await api.post(`/devs`, data);
    setDevs([...devs, response.data]);
  };
  return (
    //JSX (JavaScript + HTML)
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => <DevItem dev={dev} key={dev._id} />)}
        </ul>
      </main>
    </div>
  );
}

export default App;
