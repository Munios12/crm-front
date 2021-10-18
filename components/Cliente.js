import React from 'react'
import Swal from 'sweetalert2';
import {gql, useMutation} from '@apollo/client'



const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id:$id) 
    }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;



export default function Cliente({cliente}) {

    //Mutation -> Eliminar Cliente
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            //obtener copia objeto de cache
            const {obtenerClientesVendedor} = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});


            //Reescribir el cache  
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id != id)
                }
            })
        }
    });


    const {nombre, apellido, empresa, email, id} = cliente;

    const confirmarEliminarCliente = () => {
        Swal.fire({
            title: '¿Deseas eliminar este cliente?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar'
          }).then( (result) => {
            if (result.isConfirmed) {
                try {
                    //Eliminar por id
                    const {data} = eliminarCliente({
                        variables: {
                            id: id
                        }
                    });

                    //Mostrar alerta
                    Swal.fire(
                        'Eliminado!',
                        'texto de prueba',
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
                  
            }
          })
    }

    return (
            <tr>
                <td className='border px-4 py-2'>{nombre} {apellido} </td>
                <td className='border px-4 py-2'>{empresa} </td>
                <td className='border px-4 py-2'>{email} </td>
                <td className='border px-4 py-2'>
                    <button
                        type='button'
                        className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-600'
                        onClick={() => confirmarEliminarCliente()}
                    >Eliminar

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>    
                </td>

                <td className='border px-4 py-2'>
                    <button
                        type='button'
                        className='flex justify-center items-center bg-green-700 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-green-600'
                        onClick={() => editarCliente()}
                    >Editar

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    </button>    
                </td>
            </tr>
    )
}
