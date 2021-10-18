import {ApolloClient, concat, HttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from 'apollo-link-context'  

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
});

const authLink = setContext((_,{headers}) =>{

    //Leer Storage
    const token = localStorage.getItem('token')


    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    connectToDevTools:true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});




export default client;