import React from 'react';
import Swal from 'sweetalert2'

import UpdateFormDev from '../UpdateFormDev';

import swal from '@sweetalert/with-react';
import './styles.css';

import thanos from './thanos.gif';
import userEdit from './userEdit.png';


function DevItem({ dev, DelDev }) {
    async function destroyDev() {
        Swal.fire({
            title: `Deseja excluir ?`,
            text: `Deseja excluir ${dev.name}, este registro será apagado. `,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: 'rgb(83, 84, 95)',
            confirmButtonColor: '#8E4DFF',
            cancelButtonAriaLabel: 'Hoboto',
            confirmButtonAriaLabel: 'Hoboto',
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


    function updateDev() {
        swal({
            buttons: false,
            content: (
                <UpdateFormDev />
            )
        }
        )
    }
    return (
        <li className="dev-item">
            <section>
                <header>
                    <img src={dev.avatar_url} alt={`Foto do perfil do git do(a) ${dev.name}`} />
                    <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span>{dev.techs.join(', ')}</span>
                    </div>


                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.gitHub_username}`}>Acessar perfil no github</a>
            </section>
            <aside>
                <button
                    className="btn destroy"
                    alt="Icone de uma lixeira"
                    onClick={destroyDev}>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>

                <img
                    className="btn"
                    onClick={updateDev}
                    alt="Icone para editar um dev"
                    src={userEdit} />
            </aside>
        </li>
    );
}

export default DevItem;