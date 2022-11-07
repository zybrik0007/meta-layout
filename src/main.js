import './styles/main.scss';
import './fonts/font.scss';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./layout', true, /\.js$/));

document.addEventListener('submit', (e) => {
  e.preventDefault();
});
