const lib = require("./lib");
const sc = new lib.Soundcloud();

sc.getClientID().then(x => {
    sc.search("The eminence in shadow", "playlists")
    .then(console.log)
})