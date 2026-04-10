// Tarea Variables - Simulador de acceso a sistema

// Crear un programa en JavaScript que simule el acceso a un sistema.

// Al iniciar, el programa debe pedir al usuario mediante prompt:
// Nombre
// Edad
// Contraseña (pueden inventar una lógica simple, por ejemplo que tenga cierto largo mínimo)
// Con esa información, el sistema debe validar lo siguiente usando if / else:
// Si el nombre está vacío -> mostrar error
// Si la edad es menor a 18 -> acceso denegado
// Si la contraseña tiene menos de 6 caracteres -> contraseña inválida
// Si todo es correcto, mostrar un mensaje de bienvenida en consola con los datos del usuario.
//  Luego del acceso, el programa debe:
// Calcular y mostrar cuántos años tendrá en 10 años, modificando la variable original
// Mostrar una frase completa con todos sus datos

const nombre = prompt("Ingresa tu nombre:")
const edad = parseInt(prompt("Ingresa tu edad:"))
const contraseña = prompt("Ingresa una contraseña:")

if (nombre == ""){ 
    alert('El nombre esta vacio')
}if (edad < 18){
    alert('Acceso Denegado')
}
if (contraseña.length < 6){
    alert('Contraseña invalida')
}else{
    alert(`Hola! ${nombre} bienvenido al sistema `)
    alert(`Tus datos:
        nombre:${nombre}
        Tu edad dentro de 10 años es :${edad + 10}
        password:${contraseña}`)
}
