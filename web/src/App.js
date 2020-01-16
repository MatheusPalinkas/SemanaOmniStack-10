import React, { useEffect, useState } from 'react';

//Node
import api from './services/api';

//Styles
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import Swal from 'sweetalert2'

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
      const response = await api.get(`/devs`);
      setDevs(response.data);
    }
    loadDevs();
  }, [devs]);

  async function handAddDev(data) {
    const namesDevs = devs.map(dev => dev.gitHub_username);
    if (namesDevs.indexOf(data.gitHub_username) !== -1) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      return Toast.fire({
        icon: 'success',
        title: 'Dev já foi cadastrado.',
      });
    }

    const response = await api.post(`/devs`, data);
    setDevs([...devs, response.data]);
  };

  async function DelDev(id) {
    const IsDestroy = await api.delete(`/devs/${id}`);
    setDevs(devs.filter(dev => dev._id !== id));

    return IsDestroy;
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
          {
            devs.map(dev => <DevItem dev={dev} key={dev._id} DelDev={DelDev} />)
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
