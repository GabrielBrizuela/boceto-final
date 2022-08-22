//VALIDACION DE CAMPOS
const validarCampos = () => {
    let nombre = document.getElementById("nombre").value;
    let nombreError = document.getElementById("nombreError");
    let telefono = document.getElementById("telefono").value;
    let telefonoError = document.getElementById("telefonoError");
    let domicilio = document.getElementById("domicilio").value;
    let domicilioError = document.getElementById("domicilioError");
    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
   

//CONDICIONANDO LA CARGA DE DATOS
    if (nombre.trim() == "") {
        nombreError.innerText = "Falta completar campo";
        nombreError.className = "text-danger";
        return false;

    } else {
        nombreError.innerText = "";
    }

    if (telefono.trim() == "") {
        telefonoError.innerText = "Falta completar campo";
        telefonoError.className = "text-danger";
        return false;

    } else {
        telefonoError.innerText = "";
    }

    if (domicilio.trim() == "") {
        domicilioError.innerText = "Falta completar campo";
        domicilioError.className = "text-danger";
        return false;

    } else {
        domicilioError.innerText = "";
    }

    if (email.trim() == "") {
        emailError.innerText = "Falta completar campo";
        emailError.className = "text-danger";
        return false;

    } else {
        emailError.innerText = "";
    }

    guardarDatos(nombre, telefono, domicilio, email);
    const datosUsuario = recuperarDatos();
    document.getElementById("resultado").innerHTML = `<p>Nombre: <b>${datosUsuario.nombreUsuario}</b> <br>Telefono: <b>${datosUsuario.telefonoUsuario}</b> <br>Domicilio: <b>${datosUsuario.domicilioUsuario}</b> <br>Email: <b>${datosUsuario.emailUsuario}</b></p>`;
}
//LOCALSTORAGE DEL FORMULARIO
const guardarDatos = (nombre, telefono, domicilio, email) => {
    const datos = {
        nombreUsuario: nombre, telefonoUsuario: telefono, domicilioUsuario: domicilio, emailUsuario: email
    };
    localStorage.setItem("datosUsuario", JSON.stringify(datos));

}

const recuperarDatos = () => {
    return JSON.parse(localStorage.getItem("datosUsuario"));
}

document.getElementById("btnEnviar").onclick = validarCampos;