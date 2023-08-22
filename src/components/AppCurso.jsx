import React, { useEffect, useState } from 'react'
import { onDelete, onFindAll, onFindById, onInsert, onUpdate } from '../apiDB/apiCursos';

export const AppCurso = () => {
 
    /* GENERAL */   
    const initialValues = {
        nombre:"",
        idProfesor:"",
        dia:"",
        codigo:"",
        horario:""
    }

    /* AREA STATES */
    const [values, setValues] = useState(initialValues);
    const [currentId, setCurrentId] = useState('');
    const [cursos, setCursos] = useState(null);

    /* AREA EFFECTS */
    useEffect(() => {
        onGetCursos();
   }, [])
   

    /* AREA METODOS CRUD */
    const onGetCursos = async ()=>{
        const lstCursos = await onFindAll('cursos');
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
        onGetCursos();
    };

    const handleInpuntChage = ( { target } )=>{
        const { name, value } = target;
        setValues({...values, [name]:value});
        console.log(values);
    };  
    
    const onDeleteCursos = async( { target } )=>{
        if (window.confirm("Desea eliminar el curso?")){
            //console.log(target.dataset.id);
            const id = target.dataset.id;
            await onDelete(id);
            onGetCursos();
        }
    }
    const onUpdateCursos = async( { target } )=>{
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
                    <h1 style={{color: "white", fontFamily: "Lucida Handwriting", fontSize: 60}}>Cursos<hr /></h1>
                    <form onSubmit={ onSubmit }>
                        <div className="form-group"><input type="text" name="nombre"   value={ values.nombre } className="form-control mb-1" placeholder='Nombre' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="dia" value={ values.dia } className="form-control mb-1" placeholder='Día' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="codigo"   value={ values.codigo } className="form-control mb-1" placeholder='Código' onChange={ handleInpuntChage } required/></div>
                        <div className="form-group"><input type="text" name="horario"   value={ values.horario } className="form-control mb-1" placeholder='Horario' onChange={ handleInpuntChage } required/></div>
                        <button className='btn btn-primary'>{ currentId === ''?'Guardar' : 'Modificar' }</button>

                    </form>
                </div>

                {/* TABLA / CURSO */}
                <div className="col-8">
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Día</th>
                                <th>Código</th>
                                <th>Horario</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos && cursos.map( cursos => (
                                    <tr key={ cursos.id }>
                                        <td>{ cursos.data().nombre }</td>
                                        <td>{ cursos.data().dia }</td>
                                        <td>{ cursos.data().codigo }</td>
                                        <td>{ cursos.data().horario }</td>
                                        <td>
                                            <button className='btn btn-warning mx-1' data-id={ cursos.id } onClick={ onUpdateCursos }>Editar</button>
                                            <button className='btn btn-danger' data-id={ cursos.id } onClick={ onDeleteCursos }>Borrar</button>
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
