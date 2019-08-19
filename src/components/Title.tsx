import React, {Component} from "react";

export class Title extends Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#FF5722',
                fontSize: '48px', textAlign: 'center',
                padding: '8%',
                fontWeight: 'bold',
                color: '#fff',
                width: '100vw'
            }}>
                PetPal
            </div>
        );
    }
}

