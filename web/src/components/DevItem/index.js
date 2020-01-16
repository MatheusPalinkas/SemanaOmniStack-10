import React from 'react';
import Swal from 'sweetalert2'

import thanos from './thanos.gif';

import './styles.css';

function DevItem({ dev, DelDev }) {
    async function destroyDev() {
        Swal.fire({
            title: `Deseja excluir ?`,
            text: `Deseja excluir ${dev.name}, este registro será apagado. `,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: 'rgb(83, 84, 95)',
            confirmButtonColor: '#8E4DFF',
            cancelButtonAriaLabel:  'Hoboto',
            confirmButtonAriaLabel:  'Hoboto',
            confirmButtonText: 'Simm',
            cancelButtonText: 'Cancela',
            backdrop: `rgba(229,230,240, 0.85)`
        }).then(async (result) => {
            if (result.value) {
                await DelDev(dev._id);

                return Swal.fire({
                    title: 'Eu sou inevitavel!',
                    imageUrl: thanos,
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: `rgba(229,230,240, 0.98)`

                })
            }
        })
    }
    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={`Foto do perfil do git do(a) ${dev.name}`} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <button
                    className="btn-destroy"
                    alt="Icone de uma lixeira"
                    onClick={destroyDev}>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>

            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.gitHub_username}`}>Acessar perfil no github</a>
        </li>
    );
}

export default DevItem;