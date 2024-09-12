// const r1 = new XMLHttpRequest();

// r1.addEventListener('load', () => {
//     console.log (r1.response);
// });

// r1.open ('GET', 'https://supersimplebackend.dev');
// r1.send();

function createRequest (command, url){
    const name = new XMLHttpRequest();

    name.addEventListener('load', () => {
        console.log(name.response);
    })

    name.open(`${command}`, `${url}`);
    name.send();
}

createRequest ('GET', 'https://supersimplebackend.dev/hello');
createRequest ('GET', 'https://supersimplebackend.dev/products/first');
createRequest ('GET', 'https://supersimplebackend.dev');
createRequest ('GET', 'https://supersimplebackend.dev/images/apple.jpg');