document.getElementById('fetch-button').addEventListener('click', fetchUserRandom);
document.getElementById('fetch-cat-fact-button').addEventListener('click', fetchCatFact);

document.getElementById('form-anime').addEventListener('submit', function (event) {
	event.preventDefault();
	const limit = document.querySelector('input[name="limit-number"]').value;
	const query = document.querySelector('input[name="query"]').value;
	const type = document.querySelector('select[name="lista-despegable"]').value;
	fetchAnimeData(limit, query, type);
});

document.getElementById('clear-button').addEventListener('click', function () {
	document.getElementById('data-anime').innerHTML = '';
});

async function fetchUserRandom() {
	renderLoadingState('data-container');
	try {
		const response = await fetch('https://randomuser.me/api/');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderUserData(data);
	} catch (error) {
		renderErrorState('data-container');
	}
}

async function fetchCatFact() {
	renderLoadingState('data-cats-container');
	try {
		const response = await fetch('https://catfact.ninja/fact');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderCatFactData(data);
	} catch (error) {
		renderErrorState('data-cats-containerr');
	}
}

async function fetchAnimeData(limit, query, type) {
	renderLoadingState('data-anime');
	try {
		const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}&limit=${limit}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderAnimeData(data);
	} catch (error) {
		renderErrorState('data-anime');
	}
}

function renderLoadingState(containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '<p>Loading...</p>';
}

function renderErrorState(containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '<p>Ups, Error</p>';
}

function renderUserData(data) {
	const container = document.getElementById('data-container');
	const user = data.results[0];
	container.innerHTML = `
		<div class="card">
			<img src="${user.picture.large}" alt="User Image">
			<h2>${user.name.first} ${user.name.last}</h2>
			<p>Gender: ${user.gender}</p>
			<p>Country: ${user.location.country}</p>
			<p>City: ${user.location.city}</p>
			<p>Age: ${user.dob.age}</p>
			<p>Phone: ${user.phone}</p>
			<p>Email: ${user.email}</p>
		</div>
	`;
}

function renderCatFactData(data) {
	const container = document.getElementById('data-cats-container');
	container.innerHTML = `
		<div class="card">
			<h2>Cat Fact</h2>
			<p>${data.fact}</p>
		</div>
	`;
}

function renderAnimeData({ data }) {
	const container = document.getElementById('data-anime');
	container.innerHTML = '';
	data.forEach((anime) => {
		const year = anime.aired.from ? new Date(anime.aired.from).getFullYear() : 'N/A';
		const div = document.createElement('div');
		div.className = 'card';
		div.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h2>${anime.title}</h2>
			<p>Year: ${year}</p>
            <p>Episodes: ${anime.episodes}</p>
            <p>Synopsis: ${anime.synopsis}</p>
        `;
		container.appendChild(div);
	});
}
