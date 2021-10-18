import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

function Sidebar() {
    //routing de next

    const router = useRouter();

    

    return (
        <>
            <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
                <div>
                    <p className='text-white text-2xl font-bold ml-3'>CRM Clientes</p>
                </div>

                <nav className='mt-20 list-none text-xl' id='navigation'>
                    <li className={router.pathname === '/' ? 'bg-white rounded-lg' : ''}>

                        <Link href='/'>
                            <a className={router.pathname === '/' ? 'text-black block p-4 font-medium' : 'text-white block p-4'}>
                                Clientes
                            </a>
                        </Link>
                    </li>
                    <li className={router.pathname === '/pedidos' ? 'bg-white rounded-lg font-medium' : ''}>

                        <Link href='/pedidos'>
                            <a className={router.pathname === '/pedidos' ? 'text-black block p-4' : 'text-white block p-4'}>
                                Pedidos
                            </a>
                        </Link>
                    </li>
                    <li className={router.pathname === '/productos' ? 'bg-white rounded-lg font-medium' : ''}>
                        <Link href='/productos'>
                            <a className={router.pathname === '/productos' ? 'text-black block p-4' : 'text-white block p-4'}>
                                Productos
                            </a>
                        </Link>
                    </li>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar
