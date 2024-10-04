import Button from '../components/Button';
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';
import gitLogo from '../assets/github.png'
import { useState } from 'react';

function App() {

    const [currentRepo, setCurrentRepo] = useState('');
    const [repos, setRepos] = useState([]);


    const handleSearchRepo = async() => {

        const { data } = await api.get(`repos/${currentRepo}`)

        if (data.id) {

            const isExist = repos.find(repo => repo.id === data.id);

            if (!isExist) {
                setRepos(prev => [...prev, data]);
                setCurrentRepo('')
                return
            }

        }
        alert('Repositório não encontrado')

    }

    const handleRemoveRepo = (id) => {
        console.log('Removendo registro', id);
        var n_data = repos.filter((f) => f.id !== id);
        setRepos(n_data);
    }


    return (
        <Container>
		  <img src={gitLogo} width={72} height={72} alt="github logo"/>
	      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
	      <Button onClick={handleSearchRepo}/>
	      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
	   </Container>
	);
            
    };
export default App;
