
export default function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", `application/jrd+json`);
  res.end(`{  
    "subject": "acct:chris@chrisyates.dev",
    "links": [
      {
        "rel": "self",
        "type": "application/activity+json",
        "href": "https://chrisyates.dev/i"
      }
    ]
  }`);
}