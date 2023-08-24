
import React, { useEffect, useState } from 'react'
import { onDelete, onFindAll, onFindById, onInsert, onUpdate } from '../apiDB/apiEstudiante';

export const AppEstudiante = () => {
 
    /* GENERAL */   
    const initialValues = {
        nombre:"",
        edad:"",
        idCurso:"",
    }

    /* AREA STATES */
    const [values, setValues] = useState(initialValues);
    const [currentId, setCurrentId] = useState('');
    const [estudiante, setEstudiante] = useState(null);

    /* AREA EFFECTS */
    useEffect(() => {
        onGetEstudiante();
   }, [])

    /* AREA METODOS CRUD */
    const onGetEstudiante = async ()=>{
        const lstEstudiante = await onFindAll('estudiante');
        setEstudiante(lstEstudiante.docs);
    }

    const onSubmit = async ev =>{
        ev.preventDefault();

        if(currentId === ''){
            await onInsert(values)
        }else{
            await onUpdate(currentId, values)
        }

        setValues({...initialValues });
        setCurrentId('');
        onGetEstudiante();
    };

    const handleInpuntChage = ( { target } )=>{
        const { name, value } = target;
        setValues({...values, [name]:value});
        console.log(values);
    };  
    
    const onDeleteEstudiante = async( { target } )=>{
        if (window.confirm("Desea eliminar el estudiante?")){
            //console.log(target.dataset.id);
            const id = target.dataset.id;
            await onDelete(id);
            onGetEstudiante();
        }
    }
    const onUpdateEstudiante = async( { target } )=>{
        const docSeleccionado = await onFindById(target.dataset.id);
        setValues({ ...docSeleccionado });
        setCurrentId(target.dataset.id);
    }    
  return (
    <>
        <div className="container">
            <div className="row">
                {/* FORMULARIO / DETALLE */}
                <div className="col-4">
                    <h1 style={{color: "white", fontFamily: "Lucida Handwriting", fontSize: 60}}>Estudiante<hr /></h1>
                    <form onSubmit={ onSubmit }>
                        <div className="form-group"><input type="text" name="nombre"   value={ values.nombre } className="form-control mb-1" placeholder='Nombre' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="edad" value={ values.edad } className="form-control mb-1" placeholder='Edad' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="idCurso"   value={ values.idCurso } className="form-control mb-1" placeholder='Curso' onChange={ handleInpuntChage } required/></div>
                        
                       {/*  <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown button
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                            </div> */}
                        
                        <button className='btn btn-primary'>{ currentId === ''?'Guardar' : 'Modificar' }</button>
                    </form>
                </div>

                {/* TABLA / ESTUDIANTE */}
                <div className="col-8">
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Curso</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiante && estudiante.map( estudiante => (
                                    <tr key={ estudiante.id }>
                                        <td>{ estudiante.data().nombre }</td>
                                        <td>{ estudiante.data().edad }</td>
                                        <td>{ estudiante.data().idCurso }</td>
                                        <td>
                                            <button className='btn btn-warning mx-1' data-id={ estudiante.id } onClick={ onUpdateEstudiante }>Editar</button>
                                            <button className='btn btn-danger' data-id={ estudiante.id } onClick={ onDeleteEstudiante }>Borrar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}
