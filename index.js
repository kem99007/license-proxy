const https = require('https');
const http = require('http');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQ7Dne6GJEONzPtVOufjU2qst30hA-qAKKS5QmAN_kZg5T1CjcZMzLQD0Kt.../exec';

const server = http.createServer((req, res) => {
    const id = req.url.replace('/?id=', '').replace('/check?id=', '');
    if (!id || id === '/') {
        res.end('ERROR:missing_id');
        return;
    }
    https.get(SCRIPT_URL + '?id=' + encodeURIComponent(id), (r) => {
        let data = '';
        r.on('data', chunk => data += chunk);
        r.on('end', () => res.end(data.trim()));
    }).on('error', () => res.end('ERROR'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Running on port ' + PORT));
