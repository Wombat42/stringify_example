# Stringify Example

JSON.stringify has a second parameter, _replacer_, that lets you filter out keys during the covnersion from a JS to JSON objects.

```javascript
const hostExample = {
  name: "myhost.example.com",
  ipAddr: ["192.168.0.44", "192.168.0.45"],
  sshPort: 26, // hide this
  credentials: {
    // hide these too
    user: "root",
    password: "password",
  },
};
```

We may need to use JSON.stringify to convert the object prior to serialization. We may want to remove the credentials or the sshPort information prior to saving.

```javascript
function removeSecretProps(obj) {
  const keysToBlind = ["sshPort", "credentials"];

  function removeCredentials(key, value) {
    // return undefined and stringify removes the key
    return keysToBlind.indexOf(key) !== -1 ? undefined : value;
  }
  return JSON.stringify(obj, removeCredentials, 2);
}
const saveReadyHost = JSON.stringify(hostExample, remoteCredentials, 2);
console.log(saveReadyHost);

/* produces
 {
  "name": "myhost.example.com",
  "ipAddr": [
    "192.168.0.44",
    "192.168.0.45"
  ]
}
*/
```

The JSON.stringify _replacer_ parameter is convenient to use if you are calling stringify anyway.
