import { useEffect, useState } from "react"
import { CastI, CrewI, MovieCCI, getMovieCasts } from "../../../api/moviesRequest"
import styled from "styled-components"

function CastsList({ id }: { id: string }) {

    const [casts, setCasts] = useState([] as CastI[])
    const [crew, setCrew] = useState([] as CrewI[])

    useEffect(() => {
        getMovieCasts(id).then((res: MovieCCI) => {
            const castRemastered = res.cast.map((cast) => {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                return {
                    ...cast,
                    profile_path: cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : `https://ui-avatars.com/api/?name=${cast.name}&background=${randomColor}&color=fff`
                }
            })
            setCasts(castRemastered)


            const crewRemastered = res.crew.map((crew) => {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                return {
                    ...crew,
                    profile_path: crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : `https://ui-avatars.com/api/?name=${crew.name}&background=${randomColor}&color=fff`
                }
            })
            setCrew(crewRemastered)
        })
    }, [])

    return (
        <CastsListStyled>
            <h2>Casts</h2>
            <ul>
                {casts?.map((cast, index) => (
                    <li key={index}>
                        <div>
                            <div className="cover" style={{ backgroundImage: `url("${cast.profile_path}")` }}></div>
                            <div className="info">

                                <h3>{cast.name}</h3>
                                <br />
                                <h4>Character</h4>
                                <p>{cast.character}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <h2>Crews</h2>
            <ul>
                {crew?.map((crew, index) => (
                    <li key={index}>
                        <div>
                            <div className="cover" style={{ backgroundImage: `url("${crew.profile_path}")` }}></div>
                            <div className="info">

                                <h3>{crew.name}</h3>
                                <br />
                                <h4>Job</h4>
                                <p>{crew.job}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </CastsListStyled>
    )
}

export default CastsList

const CastsListStyled = styled.div`
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(4, 1fr);

        li {
            background: rgba(255,255,255, 0.1);
            border-radius: 10px;

            div {
                display: flex;
                .cover {
                    width: 100px;
                    height: 150px;
                    background-size: cover;
                    background-position: center;
                    border-radius: 10px;
                }
                .info {
                    display: flex;
                    flex-direction: column;

                    padding: 20px 10px;
                    h2 {
                        margin: 0;
                        font-size: 1.2em;
                    }

                    h4 {
                        font-size: 1em;
                        margin: 0;
                        opacity: .2;
                        font-weight: 400;
                    }

                    p {
                        margin: 0;
                        font-size: 1em;
                    }
                }
            }
        }
    }
`