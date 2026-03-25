fetch('https://little-angle-school.vercel.app/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', email: 'test@test.com', message: 'Test message' })
})
.then(async r => console.log(r.status, await r.text()))
.catch(console.error);
