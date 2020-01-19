import React, { useState } from 'react';

import './styles.css';


function UpdateFormDev({ onSubmit, dev }) {
    const [latitude, setLatitude] = useState(dev.location.coordinates[1]);
    const [longitude, setLongitude] = useState(dev.location.coordinates[0]);
    const [name, setName] = useState(dev.name);
    const [avatarUrl, setAvatarUrl] = useState(dev.avatar_url);
    const [bio, setBio] = useState(dev.bio);
    const [techs, setTechs] = useState(dev.techs);

    async function handSubmit(e) {
        e.preventDefault();

        await onSubmit({
            name, 
            bio,
            avatar_url: avatarUrl,
            latitude,
            longitude,
            techs: techs.join(', ')
        }, dev._id);

    }
    function parseStringAsArray(arrayAsString){
        return arrayAsString.split(',').map(itenString => itenString.trim());
    }
    return (
        <div>
            <strong>Atualizar</strong>
            <form onSubmit={handSubmit}>
                <div >
                    <div className="input-block">
                        <label htmlFor="nameDev">Nome</label>
                        <input
                            name="nameDev"
                            id="nameDev"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input
                            name="techs"
                            id="techs"
                            value={techs}
                            onChange={e => setTechs(parseStringAsArray(e.target.value))}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-block">

                        <label htmlFor="lat">Latitude</label>
                        <input
                            type="number"
                            name="lat"
                            id="lat"
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="log">Longitude</label>
                        <input
                            type="number"
                            name="log"
                            id="log"
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </div>
                </div>

                <div >
                    <div className="input-block">
                        <label htmlFor="avatarDev">Link Avatar</label>
                        <input
                            name="avatarDev"
                            id="avatarDev"
                            value={avatarUrl}
                            onChange={e => setAvatarUrl(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="bioDev">bio</label>
                        <textarea
                            name="bioDev"
                            id="bioDev"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit">
                    Salvar</button>
            </form>
        </div>);
}

export default UpdateFormDev;