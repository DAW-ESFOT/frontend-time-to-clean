const message=() => {
    const messages = {
        'invalid_credentials': 'La combinacion de usuario y clave es incorrecta',
        '{"email":["validation.unique"]}': 'El email tiene que ser unico',
        'passwords.token':'El correo no coincide',
    }
    return messages[message] || message;
}
export default message;
