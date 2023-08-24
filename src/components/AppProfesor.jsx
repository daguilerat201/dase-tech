import React, { useEffect, useState } from 'react'
import { onDelete, onFindAll, onFindById, onInsert, onUpdate } from '../apiDB/apiProfesor';
import { onFindAll as onFindAllCursos } from '../apiDB/apiCursos';

export const AppProfesor = () => {
 
    /* GENERAL */   
    const initialValues = {
        nombre:"",
        edad:"",
        idCurso:"",
        canton:"",
        provincia:"",
        distrito:"",
        direccion:""
    }

    /* AREA STATES */
    const [values, setValues] = useState(initialValues);
    const [currentId, setCurrentId] = useState('');
    const [profesor, setProfesor] = useState(null);
    const [cursos, setCursos] = useState(null);

    /* AREA EFFECTS */
    useEffect(() => {
        onGetProfesor();
        onGetCursos();
   }, [])

    /* AREA METODOS CRUD */
    const onGetProfesor = async ()=>{
        const lstProfesor = await onFindAll('profesor');
        setProfesor(lstProfesor.docs);
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
        onGetProfesor();
    };

    const handleInpuntChage = ( { target } )=>{
        const { name, value } = target;
        setValues({...values, [name]:value});
        console.log(values);
    };  
    
    const onDeleteProfesor = async( { target } )=>{
        if (window.confirm("Desea eliminar el profesor?")){
            //console.log(target.dataset.id);
            const id = target.dataset.id;
            await onDelete(id);
            onGetProfesor();
        }
    }
    const onUpdateProfesor = async( { target } )=>{
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
                    <h1 style={{color: "white", fontFamily: "Lucida Handwriting", fontSize: 60}}>Profesor<hr /></h1>
                    <form onSubmit={ onSubmit }>
                        <div className="form-group"><input type="text" name="nombre"   value={ values.nombre } className="form-control mb-1" placeholder='Nombre' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="edad" value={ values.edad } className="form-control mb-1" placeholder='Edad' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="canton" value={ values.canton } className="form-control mb-1" placeholder='Cantón' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="provincia" value={ values.provincia } className="form-control mb-1" placeholder='Provincia' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="distrito" value={ values.distrito } className="form-control mb-1" placeholder='Distrito' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="direccion" value={ values.direccion } className="form-control mb-1" placeholder='Dirección' onChange={ handleInpuntChage } required/></div>

                        <div className="form-group">
                        <label for="idCurso">Elegir curso</label>
                            <select class="form-control" name="idCurso" id="curso" onChange={ handleInpuntChage }>
                                {cursos && cursos.map( cursos => 
                                (
                                    <option value={ cursos.data().nombre }>{ cursos.data().nombre } - { cursos.data().dia } - { cursos.data().horario }</option>
                                ))
                            }
                            </select><br></br>
                        </div>

                        <button className='btn btn-primary'>{ currentId === ''?'Guardar' : 'Modificar' }</button>
                    </form>
                </div>

                {/* TABLA / PROFESOR */}
                <div className="col-8">
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Curso</th>
                                <th>Cantón</th>
                                <th>Provincia</th>
                                <th>Distrito</th>
                                <th>Dirección</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profesor && profesor.map( profesor => (
                                    <tr key={ profesor.id }>
                                        <td>{ profesor.data().nombre }</td>
                                        <td>{ profesor.data().edad }</td>
                                        <td>{ profesor.data().idCurso }</td>
                                        <td>{ profesor.data().canton }</td>
                                        <td>{ profesor.data().provincia }</td>
                                        <td>{ profesor.data().distrito }</td>
                                        <td>{ profesor.data().direccion }</td>
                                        <td>
                                            <button className='btn btn-warning mx-1' data-id={ profesor.id } onClick={ onUpdateProfesor }>Editar</button>
                                            <button className='btn btn-danger' data-id={ profesor.id } onClick={ onDeleteProfesor }>Borrar</button>
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
