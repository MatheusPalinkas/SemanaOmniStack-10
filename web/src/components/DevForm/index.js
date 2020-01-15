import React, { useState, useEffect } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [gitHubUser, setGitHubUser] = useState("");
    const [techs, setTechs] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            }, (error) => {
                console.log('Erro posição: ', error);
            },
            {
                timeout: 30000,
            });
    }, []);

    async function handSubmit(e) {
        e.preventDefault();
        await onSubmit({
            gitHub_username: gitHubUser,
            techs,
            latitude,
            longitude
        });

        setGitHubUser('');
        setTechs('');
    }

    return (
        <form onSubmit={handSubmit}>
            <div className="input-block">
                <label htmlFor="gitUserName">Usuário do GitHub</label>
                <input
                    name="gitUserName"
                    id="gitUserName"
                    required
                    onChange={e => setGitHubUser(e.target.value)} />
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">

                    <label htmlFor="lat">Latitude</label>
                    <input
                        type="number"
                        name="lat"
                        id="lat"
                        required value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>

                <div className="input-block">
                    <label htmlFor="log">Longitude</label>
                    <input
                        type="number"
                        name="log"
                        id="log"
                        required value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>

            <button
                type="submit">
                Salvar</button>
        </form>
    );
}

export default DevForm;