import "./styles.css";

// You may have to do something with an object like this.
// Like you may need to reply to an API request or write it to a log.
// Probably shouldn't include info like the credentials to login.

const hostExample = {
  name: "myhost.example.com",
  ipAddr: ["192.168.0.44", "192.168.0.45"],
  sshPort: 26, // hide this
  credentials: {
    // hide these too
    user: "root",
    password: "password"
  }
};

function removeSecretProps(obj) {
  const keysToBlind = ["sshPort", "credentials"];

  function removeCredentials(key, value) {
    // return undefined and stringify removes the key
    return keysToBlind.indexOf(key) !== -1 ? undefined : value;
  }
  return JSON.stringify(obj, removeCredentials, 2);
}
document.getElementById("app").innerHTML = `

<div class="figure">
<h2 class='heading'>Object to blind</h2>
<pre class='code'> ${JSON.stringify(hostExample, null, 2)}
</pre>
</div>

<div class='figure'>
<h2 class='heading'>Blinding function</h2>
<pre class='code'> ${removeSecretProps.toString()}
</pre>
</div>

<div class='figure'>
<h2 class='heading'>Object after blinding</h2>
<pre class='code'> ${removeSecretProps(hostExample)}
</pre>
</div>
`;
