import React from "react";
import { Link } from "react-router-dom";

export default class List extends React.Component<IListProps, IListState> {
    constructor(props: IListProps) {
        super(props);
        this.state = {
            chirps: []
        };
    }

    async componentDidMount() {
        try {
            let res = await fetch('/api/chirps');
            let data = await res.json();
            let chirps: any = Object['keys'](data).map(key => {
                return {
                    id: key,
                    user: data[key].user,
                    text: data[key].text
                }
            });
            this.setState({ chirps });
        } catch (e) {
            console.log(e);
        }
    }

    renderChirps() {
        return this.state.chirps.map(chirp => {
            return (
                <div className="chirp border media-body border-primary" key={chirp.id}>
                    <h4 className="media-heading name">{chirp.user}</h4>
                    <p>{chirp.text}</p>
                    <button className="btn btn-outline-success" onClick={() => this.editChirp()}>Edit</button>
                    <button className="btn btn-outline-danger" onClick={() => this.deleteChirp()}>X<span className="deletetooltip">Delete</span></button>
                </div>
            );
        })
    }

    deleteChirp() {
        //delete logic
    }

    editChirp() {
        //edit logic
    }

    submitChirp() {
        //submit logic
    }

    render() {
        return (
            <>
                <form className="form-group">
                    <label>Name:</label>
                    <input
                        className="form-control"
                        id="create-name"
                        type="text"
                        placeholder="Your Name Here"
                    />
                    <label>Chirp:</label>
                    <input
                        className="form-control"
                        id="create-chirp"
                        type="text"
                        placeholder="Send a new chirp!"
                    />
                    <input
                        id="submit-chirp"
                        type="button"
                        onClick={this.submitChirp}
                        className="btn btn-secondary"
                        value="Submit"
                    />
                </form>
                <div className="chirping-container">{this.renderChirps()}</div>
            </>
        );
    }
}

interface IListProps { }

interface IListState {
    chirps: {
        id: number,
        user: string,
        text: string
    }[]
}
