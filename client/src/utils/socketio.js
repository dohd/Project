import socketIOClient from 'socket.io-client';
import { fetchAud, fetchToken } from 'api';

// Initialize socket
export const socket = socketIOClient('http://localhost:3001', {
    withCredentials: true,
    query: { token: fetchToken() }
});

export const clientSocket = {
    emit: (event, data) => socket.emit(event, {
        aud: fetchAud(), data
    }),
    on: (event, dispatch, action) => {
        socket.on(event, data => dispatch({
            type: action, payload: data
        }))
    },
    init: () => socket.emit('init', fetchAud()),
}