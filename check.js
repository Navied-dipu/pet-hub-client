const https = require('https');
const url = 'https://pet-hub-client-three.vercel.app/allpets';
https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = [...data.matchAll(/src=\"(\/_next\/static\/chunks\/[^\"]+)\"/g)].map(m => m[1]);
    let total = scripts.length;
    let checked = 0;
    scripts.forEach(script => {
      https.get('https://pet-hub-client-three.vercel.app' + script, (r) => {
        let js = '';
        r.on('data', chunk => js += chunk);
        r.on('end', () => {
          checked++;
          if (js.includes('localhost') || js.includes('process.env')) {
             console.log('Found interesting text in', script);
             const match = js.match(/https?:\/\/[^\"\'\`]+/g);
             if (match) console.log(match.filter(m => m.includes('localhost') || m.includes('api') || m.includes('pet-hub')));
          }
          if (checked === total) console.log('Done checking JS bundles');
        });
      });
    });
  });
});
