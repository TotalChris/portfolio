export function GET(request) {
    return new Response(
        JSON.stringify(
        {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://w3id.org/security/v1"
            ],
        
            "id": "https://chrisyates.dev/actor",
            "type": "Person",
            "preferredUsername": "chrisyates",
            "inbox": "https://chrisyates.dev/inbox",
        
            "publicKey": {
                "id": "https://chrisyates.dev/actor#main-key",
                "owner": "https://chrisyates.dev/actor",
                "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArfOfGcnqxplzr9NvEhbX\nIHM9xfRpjBa1maxWR9/pdD8GyceeFVKygLtcXh7scInllIsHKz4n656GXHwP9E/F\nNM/GV7rUHykBh8tkFIMRiMcdyG4L0vmI0N/qNIRIakZjoN+rFU+WSWG1yVn8zYVU\n1CAQBGyRgiJ+Shgqp0XJ/EOJE0Qs5H9bGaGBa5zsJCzzzzN54ktVSbH6e2F5BsK6\nuUlznYjAaSHKbR2tsTFyeLaSZRmVDnyqHPT7ZHDe3Pfo1QTsOp+KOrsDl4sTpbkc\nkkSIlXX5BeDap6XUgFCRfnEngcBA1eg0PcyZ6pwA+rHmuTCDqqadwKjeWZmOTW/B\n+QIDAQAB\n-----END PUBLIC KEY-----\n"
            }
        }
        )
    )
}