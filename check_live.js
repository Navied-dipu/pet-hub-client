const https = require('https');
https.get('https://pet-hub-client-three.vercel.app/allpets/12345', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = [...data.matchAll(/src=\"(\/_next\/static\/chunks\/[^\"]+)\"/g)].map(m => m[1]);
    scripts.forEach(script => {
      https.get('https://pet-hub-client-three.vercel.app' + script, (r) => {
        let js = '';
        r.on('data', chunk => js += chunk);
        r.on('end', () => {
          if (js.includes('React.use(params)') || js.includes('.use(params)')) {
             console.log('Found React.use(params) in', script);
          }
          if (js.includes('useParams()')) {
             console.log('Found useParams() in', script);
          }
        });
      });
    });
  });
});
