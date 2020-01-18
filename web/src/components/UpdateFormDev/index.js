import React from 'react';

import './styles.css';
import cloud from './cloud.png';

function UpdateFormDev() {
    return (
        <div>
            <strong>Atualizar</strong>
            <form >
                <div className="input-group-tablet">
                    <div className="input-block">
                        <label htmlFor="nameDev">Nome</label>
                        <input
                            name="nameDev"
                            id="nameDev"
                            required
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input
                            name="techs"
                            id="techs"
                            required
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
                            required
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="log">Longitude</label>
                        <input
                            type="number"
                            name="log"
                            id="log"
                            required
                        />
                    </div>
                </div>

                <div className="input-group-tablet">

                    <div className="input-block">
                        <label htmlFor="bioDev">bio</label>
                        <textarea
                            name="bioDev"
                            id="bioDev"
                            required
                        ></textarea>
                    </div>
                    <div className="input-block">
                        <label htmlFor="avatarDev">Avatar</label>
                        <div className="file">
                            <input
                                name="avatarDev"
                                id="avatarDev"
                                required
                                type="file"
                            />
                            <img className="up" src={cloud} alt="icone de uma nuvem para upload" />
                        </div>
                    </div>
                </div>

                <button
                    type="submit">
                    Salvar</button>
            </form>
        </div>);
}

export default UpdateFormDev;