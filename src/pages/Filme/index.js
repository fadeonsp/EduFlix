import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css' 
import { toast } from 'react-toastify'   

function Filme() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "12bf3d6b84310de06271df895025beed",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate("/", { replace: true })
                return
            })
        }
        loadFilme()

        return() => {
            console.log("desmontou")
        }

    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@movieflix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)
        
        if(hasFilme) {
            toast.warn("O filme já está na lista")
            return
        }
        filmesSalvos.push(filme)
        localStorage.setItem("@movieflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo!!!")

    }

    if(loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}/> 
            <h3>Sinopse</h3> 
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme