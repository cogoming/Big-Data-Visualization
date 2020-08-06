
const rem=(res)=>{
    let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 10 * (clientWidth / 1080);
    return res*fontSize;
}

export default rem
