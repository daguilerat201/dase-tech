import React, { useEffect, useState } from 'react'
import { onDelete, onFindAll, onFindById, onInsert, onUpdate } from '../apiDB/apiMatricula';

export const AppMatricula = () => {
 
    /* GENERAL */   
    const initialValues = {
        idEstudiante:"",
        idCurso:"",
    }

    /* AREA STATES */
    const [values, setValues] = useState(initialValues);
    const [currentId, setCurrentId] = useState('');
    const [matricula, setMatricula] = useState(null);

    /* AREA EFFECTS */
    useEffect(() => {
        onGetMatricula();
   }, [])

    /* AREA METODOS CRUD */
    const onGetMatricula = async ()=>{
        const lstMatricula = await onFindAll('matricula');
        setMatricula(lstMatricula.docs);
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
        onGetMatricula();
    };

    const handleInpuntChage = ( { target } )=>{
        const { name, value } = target;
        setValues({...values, [name]:value});
        console.log(values);
    };  
    
    const onDeleteMatricula = async( { target } )=>{
        if (window.confirm("Desea eliminar la matricula?")){
            //console.log(target.dataset.id);
            const id = target.dataset.id;
            await onDelete(id);
            onGetMatricula();
        }
    }
    const onUpdateMatricula = async( { target } )=>{
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
                    <h1 style={{color: "white", fontFamily: "Lucida Handwriting", fontSize: 60}}>Matrícula<hr /></h1>
                    <form onSubmit={ onSubmit }>
                        <div className="form-group"><input type="text" name="idestudiante"   value={ values.idEstudiante } className="form-control mb-1" placeholder='Estudiante' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="idcurso" value={ values.idCurso } className="form-control mb-1" placeholder='Curso' onChange={ handleInpuntChage } required/></div>
                        <button className='btn btn-primary'>{ currentId === ''?'Guardar' : 'Modificar' }</button>
                    </form>
                </div>

                {/* TABLA / MATRICULA */}
                <div className="col-8">
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Curso</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matricula && matricula.map( matricula => (
                                    <tr key={ matricula.id }>
                                        <td>{ matricula.data().idEstudiante }</td>
                                        <td>{ matricula.data().idCurso }</td>
                                        <td>
                                            <button className='btn btn-warning mx-1' data-id={ matricula.id } onClick={ onUpdateMatricula }>Editar</button>
                                            <button className='btn btn-danger' data-id={ matricula.id } onClick={ onDeleteMatricula}>Borrar</button>
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
