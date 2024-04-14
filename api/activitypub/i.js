export default function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", `application/activity+json`);
    res.json({
      "@context": ["https://www.w3.org/ns/activitystreams", { "@language": "en-US" }],
      "type": "Person",
      "id": "https://chrisyates.dev/i",
      "outbox": "https://chrisyates.dev/outbox",
      "following": "https://chrisyates.dev/following",
      "followers": "https://chrisyates.dev/followers",
      "inbox": "https://chrisyates.dev/inbox",
      "preferredUsername": "chrisyates",
      "name": "Chris Yates",
      "summary": "I am a web developer working at Lake Trust Credit Union in Michigan",
      "icon": [
        "https://chrisyates.dev/images/me.jpeg"
      ],
      "publicKey": {
        "@context": "https://w3id.org/security/v1",
        "@type": "Key",
        "id": "https://chrisyates.dev/i#main-key",
        "owner": "https://chrisyates.dev/i",
        "publicKeyPem": process.env.ACTIVITYPUB_IKEY
      }
    });
  }