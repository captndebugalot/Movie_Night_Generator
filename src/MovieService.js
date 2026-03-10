const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

class MovieService {
    static baseUrl() {
        return 'https://www.omdbapi.com/';
    }

    static buildSearchUrl(title, year) {
        const params = new URLSearchParams();
        params.set('apikey', API_KEY);
        params.set('s', title);
        if (year && year.trim() !== '') {
            params.set('y', year.trim());
        }
        return MovieService.baseUrl() + '?' + params.toString();
    }

    static search(title, year) {
        const url = MovieService.buildSearchUrl(title, year);
        console.log('Searching OMDB with URL:', url);
        return fetch(url).then(function(res) {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        });
    }
}

export default MovieService;
