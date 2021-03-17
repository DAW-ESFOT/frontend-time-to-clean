export default (message) => {
    const messages = {
        'invalid_credentials': 'La combinacion de usuario y clave es incorrecta',
        '{"email":["validation.unique"]}': 'Ya existe un conductor registrado con ese correo',
        'passwords.token':'El correo ingresado no coincide con el de la petición',
    }
    return messages[message] || message;
}

