exports.handler = async function () {
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      avatar: 'https://source.unsplash.com/c_GmwfHBDzk/200x200',
    }),
  }
}
