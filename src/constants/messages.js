export default (message) => {
    const messages = {
        'invalid_credentials': 'La combinacion de usuario y clave es incorrecta'
    }
    return messages[message] || message;
}