import createLeaderboard from '../../components/leaderboard.js'

export default async function loadHome() {
    let content = document.createElement('main');

    let title = document.createElement('h1');
    title.innerText = 'TYPING HERO';

    let leaderboard = await createLeaderboard();

    let playButton = document.createElement('button');
    playButton.innerText = 'Play';

    content.append(
        title,
        leaderboard,
        playButton,
    );

    return content;
}

await loadHome();
