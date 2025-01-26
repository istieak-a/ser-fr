import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [nid, setNid] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState(null);

        const handleFetchData = async () => {
        try {
            const response = await axios.get('https://server-backend-nhs9.onrender.com/fetch-data', {
                params: { nid, dob },
            });
    
            // Open a new window and write the response data to it
            const newWindow = window.open();
            newWindow.document.write(response.data);
            newWindow.document.close();
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Error fetching data: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="App">
            <h1>Fetch Data</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFetchData();
                }}
            >
                <label>
                    NID:
                    <input
                        type="text"
                        value={nid}
                        onChange={(e) => setNid(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Date of Birth (YYYY-MM-DD):
                    <input
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Get Data</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default App;