
import React, { useEffect, useState } from 'react'
import { onDelete, onFindAll, onFindById, onInsert, onUpdate } from '../apiDB/apiEstudiante';
import { onFindAll as onFindAllCursos } from '../apiDB/apiCursos';

export const AppEstudiante = () => {
 
    /* GENERAL */   
    const initialValues = {
        cedula:"",
        nombre:"",
        edad:"",
        canton:"",
        provincia:"",
        distrito:"",
        direccion:""
    }

    /* AREA STATES */
    const [values, setValues] = useState(initialValues);
    const [currentId, setCurrentId] = useState('');
    const [estudiante, setEstudiante] = useState(null);
    const [cursos, setCursos] = useState(null);

    /* AREA EFFECTS */
    useEffect(() => {
        onGetEstudiante();
        onGetCursos();
   }, [])

    /* AREA METODOS CRUD */
    const onGetEstudiante = async ()=>{
        const lstEstudiante = await onFindAll('estudiante');
        setEstudiante(lstEstudiante.docs);
    }

    const onGetCursos = async ()=>{
        const lstCursos = await onFindAllCursos('cursos');
        setCursos(lstCursos.docs);
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
                    <div className="form-group"><input type="text" name="cedula" value={ values.cedula } className="form-control mb-1" placeholder='Cédula' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="nombre" value={ values.nombre } className="form-control mb-1" placeholder='Nombre' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="edad" value={ values.edad } className="form-control mb-1" placeholder='Edad' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="canton" value={ values.canton } className="form-control mb-1" placeholder='Cantón' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="provincia" value={ values.provincia } className="form-control mb-1" placeholder='Provincia' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="distrito" value={ values.distrito } className="form-control mb-1" placeholder='Distrito' onChange={ handleInpuntChage } required/></div>
                    <div className="form-group"><input type="text" name="direccion" value={ values.direccion } className="form-control mb-1" placeholder='Dirección' onChange={ handleInpuntChage } required/></div>

                        {/* <div className="form-group">
                        <label for="idCurso">Elegir curso</label>
                            <select class="form-control" name="idCurso" id="curso" onChange={ handleInpuntChage }>
                                {cursos && cursos.map( cursos => 
                                (
                                    <option value={ cursos.data().nombre }>{ cursos.data().nombre } - { cursos.data().dia } - { cursos.data().horario }</option>
                                ))
                            }
                            </select><br></br>
                        </div> */}
                        <button className='btn btn-primary'>{ currentId === ''?'Guardar' : 'Modificar' }</button>
                    </form>
                </div>

                {/* TABLA / ESTUDIANTE */}
                <div className="col-8">
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Cantón</th>
                                <th>Provincia</th>
                                <th>Distrito</th>
                                <th>Dirección</th>
                                {/* <th>Curso</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiante && estudiante.map( estudiante => (
                                    <tr key={ estudiante.id }>
                                        <td>{ estudiante.data().cedula }</td>
                                        <td>{ estudiante.data().nombre }</td>
                                        <td>{ estudiante.data().edad }</td>
                                        <td>{ estudiante.data().canton }</td>
                                        <td>{ estudiante.data().provincia }</td>
                                        <td>{ estudiante.data().distrito }</td>
                                        <td>{ estudiante.data().direccion }</td>
                                        {/* <td>{ estudiante.data().idCurso }</td> */}
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
