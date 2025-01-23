function render() {
    const app = document.getElementById('root');
    app.innerHTML = `
        <h1>HMR Working from scratch rock yo!!!!!  </h1>
        <p>Current Time: ${new Date().toLocaleTimeString()}</p>
    `;
}



render();

// if (window.__HMR__) {
//     window.__HMR__.accept(() => {
//         console.log('updating app.js....');
//         render();
//     })
// }

