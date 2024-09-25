const GIT_API_URL = 'https://api.github.com/users/alexandreg67/repos';

console.log('Hello World!');

async function fetchRepos() {
	const response = await fetch(GIT_API_URL);
	const data = await response.json();
	console.log(data);

	return data;
}

fetchRepos();
