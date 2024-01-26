import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/players");
            setPlayers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePlayer = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/players/${id}`).then(fetchPlayers);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name Player</th>
                            <th>Lastname Player</th>
                            <th>Height</th>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Picture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{player.height}</td>
                                <td>{player.position}</td>
                                <td>{player.club.nameClub}</td>
                                <td>
                                    {player.photoPlayer && (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/uploads/${player.photoPlayer}`}
                                            alt={`${player.firstName} ${player.lastName}`}
                                            width="75px"
                                        />
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deletePlayer(player.id);
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                    <Link to={`/players/edit/${player.id}`} className='btn btn-success me-2'>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Players;
