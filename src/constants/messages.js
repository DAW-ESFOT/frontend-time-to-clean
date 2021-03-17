export default (message) => {
    const messages = {
        'invalid_credentials': 'La combinacion de usuario y clave es incorrecta',
        '{"email":["validation.unique"]}': 'El email tiene que ser unico'
    }
    return messages[message] || message;
}