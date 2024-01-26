import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
const EditPlayer = () => {
    const { player } = useParams()
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [height, setHeight] = useState("");
    const [position, setPosition] = useState("");
    const [photoPlayer, setPhotoPlayer] = useState(null);
    const [validationError, setValidationError] = useState({});
    const [clubs, setClubs] = useState([]);
    const [clubId, setClubId] = useState("");
    const fetchClubs = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/clubs");
            setClubs(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPlayer();
        fetchClubs();
    }, []);
    const getPlayer = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/players/${player}`)
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setHeight(res.data.height)
                setPosition(res.data.position)
                setPhotoPlayer(res.data.photoPlayer)
                setClubId(res.data.club_id);
            })
            .catch(error => {
                console.log(error)
            })
    }
    const changeHandler = (event) => {
        setPhotoPlayer(event.target.files[0]);
    };
    const updatePlayer = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("height", height);
        formData.append("position", position);
        formData.append("club_id", clubId);
        if (photoPlayer !== null) {
            formData.append("photoPlayer", photoPlayer)
        }
        await axios
            .post(`http://127.0.0.1:8000/api/players/${player}`, formData)
            .then(() => {
                navigate("/players");
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                }
            });
    };
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Player</h4>
                                <hr />
                                <div className="form-wrapper">
                                    {Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {Object.entries(validationError).map(
                                                            ([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Form onSubmit={updatePlayer}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Player name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(event) => {
                                                            setFirstName(event.target.value);
                                                        }}
                                                    />
                                                    <Form.Label>Player lastname</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(event) => {
                                                            setLastName(event.target.value);
                                                        }}
                                                    />
                                                    <Form.Label>Player height</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={height}
                                                        onChange={(event) => {
                                                            setHeight(event.target.value);
                                                        }}
                                                    />
                                                    <Form.Label>Player position</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={position}
                                                        onChange={(event) => {
                                                            setPosition(event.target.value);
                                                        }}
                                                    />
                                                    <Form.Label>Club</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={clubId}
                                                        onChange={(event) => {
                                                            setClubId(event.target.value);
                                                        }}
                                                    >
                                                        {clubs.map((club) => (
                                                            <option key={club.id} value={club.id}>
                                                                {club.nameClub}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="photoPlayer" className="mb-3">
                                                    <Form.Label>player's Photo</Form.Label>
                                                    <Form.Control type="file" onChange={changeHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            variant="primary"
                                            className="mt-2"
                                            size="lg"
                                            block="block"
                                            type="submit"
                                        >
                                            Créer
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditPlayer;